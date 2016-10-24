import React, { Component } from 'react';
import { Text, View, PanResponder, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ChatComponent from '../components/ChatComponent';
import { connect as connectRedux } from 'react-redux';
var _ = require('lodash');

export class ChatView extends Component {

    // Initialise
    constructor(props, context) {
        super(props, context);
        this.state = {
            chat: null,
            messages: [],
            queue: []
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
        this.onSend = this.onSend.bind(this);
        this.onTriggerModal = this.onTriggerModal.bind(this);
        this.onExit = this.onExit.bind(this);
    }

    /* Overriding default listeners */
    onConnect(data) {
        console.log("Connected", this.props.socket.id);
        // Attempt to join room
    }
    onDisconnect(data) {
        console.log("Disconnected", this.props.socket.id);
        // Auto reconnects (can we do this with the same socket id? if not need a persistent userid)
    }
    onTimeout(data) {
        console.log("Connection timed out", data);
    }
    onError(error) {
        switch(error.code) {
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
        console.log(data);
        // Replaces the current chat state of the view
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ chat: data, messages: data.messages, queue: this.state.queue });
    }

    /* onReceiveMessage is called when a message broadcast is received.
       This happens when a message is successfully received on the user-end. */
       // --> CONSIDER USING AsyncStorage FOR PERSISTING
    onReceiveMessage(data) {
        // Acknowledgement
        if (data.sentByMe) {
            // Copy mutable version
            var tempQueue = this.state.queue.slice();
            var tempMessages = this.state.messages.slice();
            // Pending queue object is the ticket to resolving unacknowledged messages
            for (var i = 0; i < tempQueue.length; ++i) {
                if (data.content == tempQueue[i].content) {
                    data.content = data.content;
                    // Update queue by removing acknowledged pending message
                    var messageRef = tempQueue[i];
                    tempQueue.splice(tempQueue, i);
                    // Find and replace message in display messages (by comparing objects)
                    var j = 0;
                    for (j = 0; j < tempMessages.length; ++j) {
                        if (_.isEqual(tempMessages[j], messageRef)) {
                            tempMessages[j] = data;
                            break;
                        }
                    }
                    // Sort messages by date
                    tempMessages.sort(function(a, b) {
                        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                    });
                    // Update state (remove message from queue, replace message in display messages)
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    this.setState({ chat: this.state.chat, messages: tempMessages, queue: tempQueue });
                    break;
                }
            }
        }
        
        // Not an acknowledgement
        else {
            // Append message into message list
            var tempMessages = this.state.messages.slice();
            tempMessages.unshift(data);
            // Sort messages by date
            tempMessages.sort(function(a, b) {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
            // Update state
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({ chat: this.state.chat, messages: tempMessages, queue: this.state.queue });
        }
        // console.log(data);
    }

    /* onSend is called when the user attempts to send a message.
       This triggers an optimistic update on the user chat, and waits for acknowledgement. */
    onSend(message) {
        // Optimistically update messages and enqueue for acknowledgement
        message.user = this.props.socket.id;
        var tempMessages = this.state.messages.slice();
        var tempQueue = this.state.queue.slice();
        var tempMessage = { id: new Date().toISOString(),
	       userId: message.user,
	       messageType: 'OPTIMISTIC-MESSAGE',
	       content: message.message,
	       targetUser: null,
	       createdAt: new Date().toISOString(),
	       updatedAt: new Date().toISOString(),
	       roomRoomId: message.roomId };

        console.log("Enqueued for acknowledgement", tempMessage);

        // Send message
        this.props.socket.emit("add_message", message);

        tempMessages.unshift(tempMessage);
        tempQueue.unshift(tempMessage);

        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({chat: this.state.chat, messages: tempMessages, queue: tempQueue});
    }

    /* onTriggeModal will activate contextual options on the specific user.
       These options are presented in the form of a modal. */
    onTriggerModal(userId, otherUserId, roomId) {
        console.log(userId, otherUserId, roomId);
    }

    /* onExit is called when the user attempts to return to the previous page.
       This will prompt the dialog|alert that warns about exiting rooms and rooms expiring, 
       unless the option for the dialog is turned off otherwise. */
    onExit() {
        // prompt exit confirmation -> warn about unsent messages and 
        this.props.socket.emit("exit_room", { roomId: this.props.roomId, user: this.props.socket.id });
        Actions.pop();
        setTimeout(() => {
            Actions.refresh({name: "Bubble"});
        }, 400);
    }

    componentDidMount() {
        // Overwrite default listeners
        this.props.socket.on('connect', this.onConnect);
        this.props.socket.on('disconnect', this.onDisconnect);
        this.props.socket.on('connect_timeout', this.onTimeout);
        this.props.socket.on('bubble_error', this.onError)

        // Set listeners
        this.props.socket.on('view_room', this.onReceiveChat);
        this.props.socket.on('add_message', this.onReceiveMessage);

        // Checks for connection. If not connected, will attempt to connect.
        this.props.socket.connect();

        // Attempts to obtain permission to join the chat 
        // (Should this be done in the previous activity?)
        this.props.socket.emit("join_room", { roomId: this.props.roomId, user: this.props.socket.id });
        
        // Attempts to obtain chat information to populate the view
        // (Should this be done in the previous activity?)
        this.props.socket.emit("view_room", { user: this.props.socket.id, roomId: this.props.roomId });
    }

    componentWillUnmount() {
        // Remove all listeners that depends on the mount state of the component
        this.props.socket.removeListener('view_room', this.onReceiveChat);
        this.props.socket.removeListener('add_message', this.onReceiveMessage);
        this.props.socket.removeListener('connect', this.onConnect);
        this.props.socket.removeListener('disconnect', this.onDisconnect);
        this.props.socket.removeListener('connect_timeout', this.onTimeout);
        this.props.socket.removeListener('bubble_error', this.onError)
    }

    render() {
        // When chat is not yet available, display placeholder and|or loader
        if (this.state.chat == null) {
            return (<View />);
        }

        // When chat is indeed available, display chat component
        else {
            return (
                <Container>
                    <Header>
                        <Button transparent onPress={this.onExit}>
                            <Icon size={30}
                                name='ios-arrow-back'
                                color="#0E7AFE" />
                        </Button>
                        <Title ellipsizeMode='middle' numberOfLines={1}>
                            {this.state.chat.roomName}
                        </Title>
                        <Button transparent>
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
                            style={{ flex: 1 }}
                            />
                    </View>
                </Container>
            );
        }
    }
}


/*** Using reducer socket ***/

function initChatView(state) {
    let socket = state.socketHandler.socket;
    return { socket: socket };
}

export default connectRedux(initChatView)(ChatView);