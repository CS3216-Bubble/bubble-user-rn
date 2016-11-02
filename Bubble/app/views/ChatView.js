import React, { Component } from 'react';
import { Text, View, PanResponder, LayoutAnimation, Platform, UIManager, TextInput } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, Footer } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import CustomTheme from '../themes/bubble';
import ChatComponent from '../components/ChatComponent';
import UserActionModalComponent from '../components/UserActionModalComponent';
import { Styles } from '../styles/Styles';
import { connect as connectRedux } from 'react-redux';
import dismissKeyboard from 'dismissKeyboard';
import { setPendingMessages, backupChatRoom, reassignPendingMessages } from '../actions/Actions';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

var _ = require('lodash');
var adjectives = require('../utils/adjectives');
var animals = require('../utils/animals');
var numAvatars = 160;

export class ChatView extends Component {
    // Initialise
    constructor(props, context) {
        super(props, context);
        this.state = {
            chat: this.props.chat,
            queue: [],
            messages: this.props.chatCache,
            toggleModal: false,
            modalInfo: { userId: "userId", otherUserId: "otherUserId", roomId: "roomId", otherUserName: "otherUserName" },
            someoneTyping: '',
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        // Link functions
        this.onDisconnect = this.onDisconnect.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
        this.onError = this.onError.bind(this);
        this.onReceiveChat = this.onReceiveChat.bind(this);
        this.onReceiveMessage = this.onReceiveMessage.bind(this);
        this.onReceiveReaction = this.onReceiveReaction.bind(this);
        this.onReceiveTyping = this.onReceiveTyping.bind(this);
        this.onReceiveTypingStop = this.onReceiveTypingStop.bind(this);
        this.onReceiveJoinRoom = this.onReceiveJoinRoom.bind(this);
        this.onReceiveExitRoom = this.onReceiveExitRoom.bind(this);
        this.onEmitThanks = this.onEmitThanks.bind(this);
        this.onEmitCheers = this.onEmitCheers.bind(this);
        this.onEmitTyping = this.onEmitTyping.bind(this);
        this.onEmitTypingStop = this.onEmitTypingStop.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onTriggerModal = this.onTriggerModal.bind(this);
        this.onExit = this.onExit.bind(this);
        this.hashID = this.hashID.bind(this);
        this.generateName = this.generateName.bind(this);
    }

    // Utility function for hashing
    hashID(userId) {
        var hash = 0;
        if (userId && userId.length != 0) {
            for (i = 0; i < userId.length; i++) {
                char = userId.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
        }
        return hash;
    }

    // Name generator
    generateName(userId) {
        var hashCode = this.hashID(userId);
        var adj = adjectives.adjectives;
        var ani = animals.animals;
        // Get adjective
        var adjective = adj[((hashCode % adj.length) + adj.length) % adj.length];
        // Get animal
        var animal = ani[((hashCode % ani.length) + ani.length) % ani.length];
        // Return result
        return adjective + " " + animal;
    }

    onDisconnect(data) {
        console.log("Disconnected with last known id: ", this.props.aliasId[0]);
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

    /*  onReceiveTyping is called when someone is typing */
    onReceiveTyping(data) {
        this.setState({ someoneTyping: this.generateName(data.userId) });
    }

    /*  onReceiveTypingStop is called when someone stopped typing */
    onReceiveTypingStop(data) {
        this.setState({ someoneTyping: '' });
    }

    /*  onReceiveJoinRoom is called when someone joins the room*/
    onReceiveJoinRoom(data) {
        // Add date property to join event for sorting
        data, updatedAt = new Date();
        data.userName = this.generateName(data.userId);
        data.messageType = 'JOIN_ROOM';
        data.id = (new Date()).toISOString();
        // Append message into message list
        var tempMessages = this.state.messages.slice();
        tempMessages.unshift(data);
        // Sort messages by date
        sort(tempMessages);
        // Update state
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ messages: tempMessages });
    }

    /*  onReceiveJoinRoom is called when someone joins the room*/
    onReceiveExitRoom(data) {
        // Add date property to join event for sorting
        data.updatedAt = new Date();
        data.userName = this.generateName(data.userId);
        data.messageType = 'EXIT_ROOM';
        data.id = (new Date()).toISOString();
        // Append message into message list
        var tempMessages = this.state.messages.slice();
        tempMessages.unshift(data);
        // Sort messages by date
        sort(tempMessages);
        // Update state
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

    onEmitTyping() {
        var request = {
            user: this.props.socket.id,
            roomId: this.props.roomId,
        }
        this.props.socket.emit('typing', request);
    }

    onEmitTypingStop() {
        var request = {
            user: this.props.socket.id,
            roomId: this.props.roomId,
        }
        this.props.socket.emit('stop_typing', request);
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
        Actions.main({ type: ActionConst.REPLACE, selectedTab: 'all' });
    }

    onQuit() {
        Actions.main({ type: ActionConst.REPLACE, selectedTab: 'all' });
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

        // // console.log("Mounted!");
        // Overwrite default listeners
        this.props.socket.on('disconnect', this.onDisconnect);
        this.props.socket.on('connect_timeout', this.onTimeout);
        this.props.socket.on('bubble_error', this.onError)

        // Set listeners
        this.props.socket.on('view_room', this.onReceiveChat);
        this.props.socket.on('add_message', this.onReceiveMessage);
        this.props.socket.on('add_reaction', this.onReceiveReaction);
        this.props.socket.on('typing', this.onReceiveTyping);
        this.props.socket.on('stop_typing', this.onReceiveTypingStop);
        this.props.socket.on('join_room', this.onReceiveJoinRoom);
        this.props.socket.on('exit_room', this.onReceiveExitRoom);

        // Checks for connection. If not connected, will attempt to connect.
        // this.props.socket.connect();

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
        this.props.socket.removeListener('disconnect', this.onDisconnect);
        this.props.socket.removeListener('connect_timeout', this.onTimeout);
        this.props.socket.removeListener('bubble_error', this.onError)
        this.props.socket.removeListener('typing', this.onReceiveTyping);
        this.props.socket.removeListener('stop_typing', this.onReceiveTypingStop);
        this.props.socket.removeListener('join_room', this.onReceiveJoinRoom);
        this.props.socket.removeListener('exit_room', this.onReceiveExitRoom);

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
        if (typeof this.props.socket.id == 'undefined') {
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
        } else if (this.state.chat == null) {
            // INSERT LOADER HERE
            return null;
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
                                {(this.state.someoneTyping !== '') ? <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "300" }}>
                                        {this.state.someoneTyping}is typing...
      </Text>
                                </View> : []}
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
                            someoneTyping=''
                            onTyping={this.onEmitTyping}
                            onTypingStop={this.onEmitTypingStop}
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
                            someoneTyping={this.state.someoneTyping}
                            onTyping={this.onEmitTyping}
                            onTypingStop={this.onEmitTypingStop}
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
    }
        ;
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveUnsentMsgs: (messages) => { dispatch(setPendingMessages(messages, ownProps.roomId)) },
        saveChatSession: (chat) => { dispatch(backupChatRoom(ownProps.roomId, chat)) },
        reassignOutbox: () => { dispatch(reassignPendingMessages()) }

    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatView);
