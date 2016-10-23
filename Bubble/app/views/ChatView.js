import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ChatComponent from '../components/ChatComponent';
import { connect as connectRedux } from 'react-redux';

export class ChatView extends Component {

    constructor(props, context) {
        // Initialise
        super(props, context);
        this.state = {
            chat: null,
            messages: []
        };

        // Link functions
        this.onConnect = this.onConnect.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
        this.onError = this.onError.bind(this);
        this.onReceiveChat = this.onReceiveChat.bind(this);
        this.onReceiveMessage = this.onReceiveMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onExit = this.onExit.bind(this);
    }

    /* Overriding default listeners */
    onConnect(data) {
        console.log("Connected", data);
    }
    onDisconnect(data) {
        console.log("Disconnected", data);
    }
    onTimeout(data) {
        console.log("Connection timed out", data);
    }
    onError(error) {
        switch(error.code) {
            case 'room_closed':
                console.log("Room closed", error);
            break;
            default:
                console.log("Generic socket error", error);
            break;
        }
    }

    /* onReceiveChat is called when the chat is being loaded or refreshed.
       This will cause the whole chatroom to be reloaded. */
    onReceiveChat(data) {
        // Replaces the current chat state of the view
        this.setState({ chat: data, messages: data.messages });
    }

    /* onReceiveMessage is called when a message broadcast is received.
       This happens when a message is successfully received on the user-end. */
    onReceiveMessage(data) {
        // Appends to the current chat state of the view
        // (append messages || resolve optimistic messages) and resort by time here ...
    }

    /* onSend is called when the user attempts to send a message.
       This triggers an optimistic update on the user chat, and waits for acknowledgement. */
    onSend(message) {
        this.props.socket.emit("add_message", message);
        // optimistically update messages here ...
    }

    /* onExit is called when the user attempts to return to the previous page.
       This will prompt the dialog|alert that warns about exiting rooms and rooms expiring, 
       unless the option for the dialog is turned off otherwise. */
    onExit() {
        // prompt exit confirmation -> warn about unsent messages and 
        this.props.socket.emit("exit_room", { roomId: this.props.roomId, user: this.props.socket.id });
        this.componentWillDismount();
        Actions.pop();
    }

    componentDidMount() {
        // Overwrite default listeners
        this.props.socket.on('connect', this.onConnect);
        this.props.socket.on('disconnect', this.onDisconnect);
        this.props.socket.on('connect_timeout', this.onTimeout);
        this.props.socket.on('bubble_error', this.onError)

        // Set listeners
        this.props.socket.on('view_room', this.onReceiveChat);
        this.props.socket.on('add_message', this.onReceiveChat);

        // Checks for connection. If not connected, will attempt to connect.
        this.props.socket.connect();

        // Attempts to obtain permission to join the chat 
        // (Should this be done in the previous activity?)
        this.props.socket.emit("join_room", { roomId: this.props.roomId, user: this.props.socket.id });
        
        // Attempts to obtain chat information to populate the view
        // (Should this be done in the previous activity?)
        this.props.socket.emit("view_room", { user: this.props.socket.id, roomId: this.props.roomId });
    }

    componentWillDismount() {
        // Remove all listeners that depends on the mount state of the component
        this.props.socket.removeListener('view_room', this.onReceiveChat);
        this.props.socket.removeListener('add_message', this.onReceiveChat);
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
                            <Icon size={30}
                                name='ios-information-circle-outline'
                                color="#0E7AFE" />
                        </Button>
                    </Header>
                    <View style={{ flex: 1 }}>
                        <ChatComponent key={this.state.chat.roomId}
                            onSend={this.onSend}
                            chat={this.state.chat}
                            roomId={this.props.roomId}
                            user={this.props.socket.id}
                            style={{ flex: 1 }} />
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