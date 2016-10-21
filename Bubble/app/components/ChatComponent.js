import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Button } from 'native-base';
import { Styles } from '../styles/Styles';
import { Actions } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';

export class ChatComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { messages: this.parseMessages(this.props.chat.messages) };
        this.onSend = this.onSend.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    parseMessages(messages) {
        parsed = [];
        for (var i = messages.length - 1; i >= 0; --i) {
            var messageOrg = messages[i];
            var avatar = 'http://flathash.com/' + messageOrg.userId;
            var messageParsed = {
                _id: messageOrg.id,
                text: messageOrg.content,
                createdAt: messageOrg.createdAt,
                user: {
                    _id: messageOrg.userId,
                    name: 'Anonymous',
                    avatar: avatar,
                },
            };

            parsed.push(messageParsed);
        }
        return parsed;
    }

    updateMessage(data) {
        // console.log(data);
        var avatar = 'http://flathash.com/' + data.userId;
        var messages = [
            {
                _id: new Date().toString + data.message,
                text: data.message,
                createdAt: new Date(),
                user: {
                    _id: data.userId,
                    name: 'Anonymous',
                    avatar: avatar,
                },
            },
        ];

        this.setState({
            messages: GiftedChat.append(this.state.messages, messages),
        });
    }

    componentWillDismount() {
        this.updateMessage = () => { };
        this.onSend = () => { };
    }

    componentDidMount() {
        // this.setState({ messages: this.parseMessages(this.props.chat.messages) });
        // UPDATE LISTENER TO BE PLACED IN COMPONENT
        this.props.socket.on('add_message', this.updateMessage);
    }

    onSend(messages = []) {
        if (messages.length > 0) {
            var message = messages[0];

            var parsedMessage = {
                roomId: this.props.roomId,
                user: this.props.user,
                message: message.text
            };

            this.props.sendFunc(parsedMessage);
            this.setState({
                messages: GiftedChat.append(this.state.messages, messages),
            });
        }
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: this.props.user,
                }}
                isAnimated={true}
                />
        );
    }
}

function getMessage(state) {
    let socket = state.socketHandler.socket;

    return {
        socket: socket
    }
}

export default connectRedux(getMessage)(ChatComponent);

// OLD STUFF

    // componentDidMount() {
    //     this.setState = { messages: this.parseMessages(this.props.chat.messages) };
    // }

    // [{
    //     id: 2,
    //     userId: 'QX490hIXtxQkd25oAAAZ',
    //     messageType: 'MESSAGE',
    //     content: 'hallo',
    //     createdAt: '2016-10-19T15:59:37.935Z',
    //     updatedAt: '2016-10-19T15:59:37.935Z',
    //     roomRoomId: '28f32dad-a71d-4d9c-aaff-dd65340f2ef9'
    // }]

    // componentWillMount() {
    //     console.log(this.props.chat.messages)
    //     this.setState = { messages: this.parseMessages(this.props.chat.messages) };
    // this.setState({
    //     messages: [
    //         {
    //             _id: 1,
    //             text: 'Hello developer',
    //             createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    //             user: {
    //                 _id: 2,
    //                 name: 'React Native',
    //                 avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //             },
    //         },
    //     ],
    // });
    // }
    // startChat() {

    //       var user = {
    //           user: "123"
    //       };

    //       var chat = {
    //           user: "123",
    //           roomName: "Hello Panda",
    //           roomDescription: "Goodbye Panda",
    //           userLimit: 10,
    //           categories: ["School", "Stress", "Work"]
    //       };

    //       var session = new ChatService();
    //       session.socket.connect();
    //       session.listRooms(user);
    //       // session.createRoom(chat);
    //       // session.listRooms(user);
    //   }
    // OLD
    // var chatSession = new ChatService(this.props);
    // chatSession.listRooms(user);
    // chatSession.addChat(chat);
    // console.log(user);
