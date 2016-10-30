import React, { Component } from 'react';
import { Text, View, PanResponder, LayoutAnimation, Platform, UIManager, TextInput } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, Footer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import CustomTheme from '../themes/bubble';
import ChatComponent from '../components/ChatComponent';
import UserActionModalComponent from '../components/UserActionModalComponent';
import { Styles } from '../styles/Styles';
import { connect as connectRedux } from 'react-redux';
import dismissKeyboard from 'dismissKeyboard';
import { setPendingMessages, backupChatRoom, cacheUserId, reassignPendingMessages } from '../actions/Actions';

var _ = require('lodash');

export class ChatView extends Component {
    // Initialise
    constructor(props, context) {
        super(props, context);
        this.state = {
            chat: this.props.chat,
            queue: [],
            messages: this.props.chatCache,
            toggleModal: false,
            modalInfo: { userId: "userId", otherUserId: "otherUserId", roomId: "roomId", otherUserName: "otherUserName" }
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        // Link functions
        this.onConnect = this.onConnect.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
        this.onError = this.onError.bind(this);
        this.onReceiveChat = this.onReceiveChat.bind(this);
        this.onReceiveMessage = this.onReceiveMessage.bind(this);
        this.onReceiveReaction = this.onReceiveReaction.bind(this);
        this.onEmitThanks = this.onEmitThanks.bind(this);
        this.onEmitCheers = this.onEmitCheers.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onTriggerModal = this.onTriggerModal.bind(this);
        this.onExit = this.onExit.bind(this);
        this.onClaim = this.onClaim.bind(this);
    }

    onClaim(data) {
        console.log("SUCCESS IN CLAIMING ID: ", data, "WITH CURRENT ", this.props.socket.id);
        this.props.socket.emit("view_room", { user: this.props.socket.id, roomId: this.props.roomId });
        // Will proceed to send my unack messages again
        console.log("Will proceed to send my unack messages again");
        // this.props.socket.emit("join_room", { roomId: this.props.roomId, user: this.props.socket.id });
    }

    /* Overriding default listeners */
    onConnect(data) {
        var userId = this.props.socket.id;
        console.log("Connected", userId);
        // take over all unsent messages
        this.props.reassignOutbox();
        // Add new id to alias 
        this.props.memoId(userId);
        if (this.props.aliasId.length > 0 && this.props.aliasId[0] != this.props.socket.id) {
            // Claim using first (latestId, if not same)
            this.props.socket.emit("claim_id", { oldSocketId: this.props.aliasId[0], claimToken: this.props.claimToken });
            console.log("Trying to claim old id:", this.props.aliasId[0]);
        } else if (this.props.aliasId.length == 0) {
            // Add new id to alias
            this.props.memoId(this.props.socket.id);
            // // console.log("memorising id", this.props.socket.id);
        }
    }

    onDisconnect(data) {
        console.log("Disconnected", this.props.socket.id);
        // Assign all to last known socket id
        this.props.reassignOutbox();
        // // console.log("reassigning unsent messages...");
        // Write state to redux
        if (this.state.chat && this.state.chat != null) {
            const chatBackup = Object.assign({}, this.state.chat);
            // // console.log("NOW SAVING: ", chatBackup);
            this.props.saveChatSession(chatBackup);
            // // console.log("Saving chat!", chatBackup);
        }

    }
    onTimeout(data) {
        // // console.log("Connection timed out", data);
    }
    onError(error) {
        switch (error.code) {
            case 'room_closed':
                console.log("Room closed", error);
                break;
            case 'user_not_in_room':
                console.log("User has not joined this room", error);
                break;
            default:
                console.log("Generic socket error", error);
                break;
        }
    }

    /* onReceiveChat is called when the chat is being loaded or refreshed.
       This will cause the whole chatroom to be reloaded. */
    onReceiveChat(data) {
        // // console.log(data);
        // Replaces the current chat state of the view
        this.props.saveChatSession(data);
        var messages = mergeAndSort(this.props.outbox, data.messages);
        // // console.log("Chat received! Updating with these messages!", messages);

        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ chat: data, messages: messages });
    }

    /* onReceiveMessage is called when a message broadcast is received.
       This happens when a message is successfully received on the user-end. */
    // --> CONSIDER USING AsyncStorage FOR PERSISTING
    onReceiveMessage(data) {
        // // console.log("Received a message: ", data);
        // Acknowledgement
        if (_.indexOf(this.props.aliasId, data.userId) >= 0) {
            // Copy mutable version
            var tempQueue = this.props.outbox.slice();
            var tempMessages = this.state.messages.slice();
            // Pending queue object is the ticket to resolving unacknowledged messages
            for (var i = 0; i < tempQueue.length; ++i) {
                if (data.content == tempQueue[i].content) {
                    // Update queue by removing acknowledged pending message
                    var messageRef = tempQueue[i];
                    tempQueue.splice(i, 1);
                    // console.log("TO REPLACE QUEUE WITH THIS SHIT: ",tempQueue);
                    this.props.saveUnsentMsgs(tempQueue);
                    // Find and replace message in display messages (by comparing objects)
                    var j = 0;
                    for (j = 0; j < tempMessages.length; ++j) {
                        if (_.indexOf(this.props.aliasId, tempMessages[j].userId) >= 0 &&
                            tempMessages[j].messageType == "OPTIMISTIC-MESSAGE" &&
                            tempMessages[j].content == messageRef.content) {
                            tempMessages[j] = data;
                            break;
                        }
                    }
                    // Sort messages by date
                    sort(tempMessages);

                    // var updatedChat = Object.assign({}, this.state.chat, {
                    //     messages: this.state.chat.messages.concat([data])
                    // });

                    // Update state (remove message from queue, replace message in display messages)
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    this.setState({ messages: tempMessages });
                    // this.setState({ chat: updatedChat, messages: tempMessages, queue: tempQueue });
                    break;
                }
            }
        }

        // Not a self acknowledgement
        else {
            // Append message into message list
            var tempMessages = this.state.messages.slice();
            tempMessages.unshift(data);
            // Sort messages by date
            sort(tempMessages);

            // var updatedChat = Object.assign({}, this.state.chat, {
            //     messages: this.state.chat.messages.concat([data])
            // });

            // Update state
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({ messages: tempMessages });
            // this.setState({ chat: updatedChat, messages: tempMessages, queue: this.state.queue });
        }
        // // console.log(data);
    }

    /* onReceiveReaction is called when a message broadcast is received.
   This happens when a reaction is successfully received on the user-end. */
    // --> CONSIDER USING AsyncStorage FOR PERSISTING
    onReceiveReaction(data) {
        // // console.log("Received a reaction: ", data);

        // // console.log("REACTION RECEIVED", data);

        // Append message into message list
        var tempMessages = this.state.messages.slice();
        tempMessages.unshift(data);
        // Sort messages by date
        sort(tempMessages);
        // Update state
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ messages: tempMessages });

    }

    /* onSend is called when the user attempts to send a message.
       This triggers an optimistic update on the user chat, and waits for acknowledgement. */
    onSend(message) {
        // Optimistically update messages and enqueue for acknowledgement
        message.user = this.props.aliasId[0];
        var tempMessages = this.state.messages.slice();
        var tempQueue = this.props.outbox.slice();
        var tempMessage = {
            id: new Date().toISOString(),
            userId: message.user,
            messageType: 'OPTIMISTIC-MESSAGE',
            content: message.message,
            targetUser: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            roomRoomId: message.roomId
        };

        // // console.log("Enqueued for acknowledgement", tempMessage);

        // Send message
        this.props.socket.emit("add_message", message);
        // // console.log("Sent a message! ", message);

        tempMessages.unshift(tempMessage);
        tempQueue.unshift(tempMessage);
        this.props.saveUnsentMsgs(tempQueue);

        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ messages: tempMessages, queue: tempQueue });
    }

    onEmitThanks(context) {
        // // console.log("I AM GOING TO THANK ...", context);
        var request = {
            user: context.userId,
            roomId: context.roomId,
            reaction: "THANK",
            targetUser: context.otherUserId
        };
        this.props.socket.emit("add_reaction", request);
        // // console.log("Sent a reaction! ", request);
    }

    onEmitCheers(context) {
        // // console.log("I AM GOING TO CHEER ...", context);
        var request = {
            user: context.userId,
            roomId: context.roomId,
            reaction: "CHEER",
            targetUser: context.otherUserId
        };
        this.props.socket.emit("add_reaction", request);
        // // console.log("Sent a reaction! ", request);
    }

    /* onTriggeModal will activate contextual options on the specific user.
       These options are presented in the form of a modal. */
    onTriggerModal(userId, otherUserId, roomId, otherUserName) {

        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        dismissKeyboard();

        this.setState({
            toggleModal: !this.state.toggleModal,
            modalInfo: { userId: userId, otherUserId: otherUserId, roomId: roomId, otherUserName: otherUserName }
        });
    }

    /* onExit is called when the user attempts to return to the previous page.
       This will not make the user leave the room */
    onExit() {
        Actions.pop();
    }

    componentWillReceiveProps(props) {
        // // console.log("Received props!");
        // // console.log("MY IDS", props.aliasId, "VERSUS", this.props.aliasId);
        // // console.log("INCOMING OUTBOX: \n", props.outbox, "\nCURRENT OUTBOX: \n", this.props.outbox, "\nCURRENT QUEUE: \n", this.state.queue);
        // console.log("INCOMING OUTBOX: \n", props.aliasId, "\nCURRENT OUTBOX: \n", this.props.aliasId);

        if (props.chat != null) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({ chat: props.chat, queue: props.outbox });
        }
    }

    componentDidMount() {
        console.log(this.props.claimToken);
        // // console.log("Mounted!");
        // Overwrite default listeners
        this.props.socket.on('connect', this.onConnect);
        this.props.socket.on('disconnect', this.onDisconnect);
        this.props.socket.on('connect_timeout', this.onTimeout);
        this.props.socket.on('bubble_error', this.onError)

        // Set listeners
        this.props.socket.on('view_room', this.onReceiveChat);
        this.props.socket.on('add_message', this.onReceiveMessage);
        this.props.socket.on('add_reaction', this.onReceiveReaction);
        this.props.socket.on("claim_id", this.onClaim);

        // Checks for connection. If not connected, will attempt to connect.
        this.props.socket.connect();

        if (this.props.aliasId.length > 0 && this.props.aliasId[0] != this.props.socket.id) {
            // Claim using first (latestId, if not same)
            this.props.socket.emit("claim_id", { oldSocketId: this.props.aliasId[0], claimToken: this.props.claimToken });
            // console.log("Trying to claim old id:", this.props.aliasId[0]);
        } else if (this.props.aliasId.length == 0) {
            // Add new id to alias
            this.props.memoId(this.props.socket.id);
            // // console.log("memorising id", this.props.socket.id);
        }

        // Attempts to obtain permission to join the chat
        // (Should this be done in the previous activity?)
        this.props.socket.emit("join_room", { roomId: this.props.roomId, user: this.props.socket.id });

        // Attempts to obtain chat information to populate the view
        // (Should this be done in the previous activity?)
        this.props.socket.emit("view_room", { user: this.props.socket.id, roomId: this.props.roomId });
    }

    componentWillUnmount() {
        // // console.log("Unmounting!");
        // Remove all listeners that depends on the mount state of the component
        this.props.socket.removeListener('view_room', this.onReceiveChat);
        this.props.socket.removeListener('add_message', this.onReceiveMessage);
        this.props.socket.removeListener('add_reaction', this.onReceiveReaction);
        this.props.socket.removeListener('connect', this.onConnect);
        this.props.socket.removeListener('disconnect', this.onDisconnect);
        this.props.socket.removeListener('connect_timeout', this.onTimeout);
        this.props.socket.removeListener('bubble_error', this.onError)
        this.props.socket.removeListener("claim_id", this.onClaim);

        // Write state to redux
        if (this.state.chat && this.state.chat != null) {
            const chatBackup = Object.assign({}, this.state.chat);
            // // console.log("NOW SAVING: ", chatBackup);
            this.props.saveChatSession(chatBackup);
            // // console.log("Saving chat!", chatBackup);
        }
        if (this.state.queue && this.state.queue != null) {
            const queueBackup = this.state.queue.slice();
            // // console.log("NOW SAVING: ", queueBackup);
            this.props.saveUnsentMsgs(queueBackup);
            // // console.log("Saving unsent!", queueBackup);
        }
    }

    render() {
        // // console.log("MY IDS", this.props.aliasId);
        // // console.log("MY OUTBOX", this.props.outbox);
        // // console.log("MY CHAT", this.props.chat);
        // // console.log("MY CHAT CACHE", this.props.chatCache);


        // // console.log("OUTBOX!!!", this.props.outbox);
        // When chat is not yet available, display placeholder and|or loader
        // if (this.state.chat == null) {
        //     return (<View />);
        // }

        // When chat is indeed available, display chat component
        if (this.state.chat == null) {
            return (<Container>
                <Header>
                    <Button transparent onPress={this.onExit}>
                        <Icon size={30}
                            name='ios-arrow-back'
                            color="#0E7AFE" />
                    </Button>
                    <Title ellipsizeMode='middle' numberOfLines={1}>
                        <Text style={Styles.titleContainer}> Not Available </Text>
                    </Title>
                    <Button transparent onPress={() => Actions.chatInfoView({ chat: this.state.chat })}>
                        <Icon size={32}
                            name='ios-information-circle-outline'
                            color="#0E7AFE" />
                    </Button>
                </Header>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text>You're offline! Come back later.</Text>
                </View>
            </Container>);
        }
        else if (Platform.OS === 'ios') {
            // // console.log("MESSAGES", this.state.messages);
            return (
                <Container>
                    <Header>
                        <Button transparent onPress={this.onExit}>
                            <Icon size={30}
                                name='ios-arrow-back'
                                color="#0E7AFE" />
                        </Button>
                        <Title ellipsizeMode='middle' numberOfLines={1}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 200, height: 28 }}>
                                <TextInput style={Styles.titleContainer} note maxLength={20} editable={false} value={this.state.chat.roomName} />
                                {this.state.chat != null && <Text note style={Styles.subtitle}> {this.state.chat.roomType.charAt(0).toUpperCase() + this.state.chat.roomType.toLowerCase().slice(1)}Chat </Text>}
                            </View>
                        </Title>
                        <Button transparent onPress={() => Actions.chatInfoView({ chat: this.state.chat })}>
                            <Icon size={32}
                                name='ios-information-circle-outline'
                                color="#0E7AFE" />
                        </Button>
                    </Header>
                    <View style={{ flex: 1 }}>
                        <ChatComponent key={this.state.chat.roomId}
                            onSend={this.onSend}
                            onTriggerModal={this.onTriggerModal}
                            messages={this.state.messages}
                            roomId={this.props.roomId}
                            user={this.props.socket.id}
                            myIds={this.props.aliasId}
                            style={{ flex: 1 }}
                            />
                        <UserActionModalComponent
                            toggle={this.state.toggleModal}
                            modalInfo={this.state.modalInfo}
                            onThanks={this.onEmitThanks}
                            onCheers={this.onEmitCheers} />
                    </View>
                </Container>
            );
        }

        else {
            return (
                <Container theme={CustomTheme}>
                    <Header>
                        <Button transparent onPress={this.onExit}>
                            <Icon size={30}
                                name='ios-arrow-back'
                                color="#0E7AFE" />
                        </Button>
                        <Title ellipsizeMode='middle' numberOfLines={1}>
                            {this.state.chat.roomName}
                        </Title>
                        <Button transparent onPress={() => Actions.chatInfoView({ chat: this.state.chat })}>
                            <Icon size={32}
                                name='ios-information-circle-outline'
                                color="#0E7AFE" />
                        </Button>
                    </Header>
                    <View style={{ flex: 1 }}>
                        <ChatComponent key={this.state.chat.roomId}
                            onSend={this.onSend}
                            onTriggerModal={this.onTriggerModal}
                            messages={this.state.messages}
                            roomId={this.props.roomId}
                            user={this.props.aliasId[0]}
                            style={{ flex: 1 }}
                            myIds={this.props.aliasId}
                            />
                        <UserActionModalComponent
                            toggle={this.state.toggleModal}
                            modalInfo={this.state.modalInfo}
                            onThanks={this.onEmitThanks}
                            onCheers={this.onEmitCheers} />
                    </View>
                </Container>
            );
        }
    }
}


/*** Using reducer socket ***/

function mergeAndSort(outbox, chatCache) {
    // // console.log("I AM MERGE SORTER", outbox, chatCache);
    var msgs = [];
    if (chatCache) {
        msgs = chatCache.concat(outbox);
    } else if (outbox) {
        msgs = outbox.splice();
    }
    sort(msgs);
    return msgs;
}

function sort(messages) {
    // Sort messages by date
    messages.sort(function (a, b) {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
}

const mapStateToProps = (state, ownProps) => {
    var outboxCached = [];
    var chatMsgsCached = [];
    var chatCached = null;
    if (state.chatRooms[ownProps.roomId]) {
        chatCached = state.chatRooms[ownProps.roomId];
        chatMsgsCached = state.chatRooms[ownProps.roomId].messages;
    }
    if (state.outbox[ownProps.roomId]) {
        outboxCached = state.outbox[ownProps.roomId];
    }

    return {
        socket: state.socket,
        aliasId: state.aliasId,
        outbox: outboxCached,
        chat: chatCached,
        chatCache: mergeAndSort(outboxCached, chatMsgsCached), 
        claimToken: state.claimToken
    }
        ;
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveUnsentMsgs: (messages) => { dispatch(setPendingMessages(messages, ownProps.roomId)) },
        saveChatSession: (chat) => { dispatch(backupChatRoom(ownProps.roomId, chat)) },
        memoId: (userId) => { dispatch(cacheUserId(userId)) },
        reassignOutbox: () => { dispatch(reassignPendingMessages()) }

    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatView);
