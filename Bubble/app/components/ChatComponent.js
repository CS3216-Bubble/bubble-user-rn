import React, { Component } from 'react';

import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import { Button } from 'native-base';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

export default class ChatComponent extends Component {
    constructor(props, context) {
        super(props, context);
        console.log("THIS PROPS: ", this.props);
        this.state = { messages: this.parseMessages(this.props.chat.messages) };
        this.onSend = this.onSend.bind(this);
    }

    // http://flathash.com/YOUR-TEXT

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

    componentWillMount() {
        this.setState = { messages: this.parseMessages(this.props.chat.messages) };
    }

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

    onSend(messages = []) {
        if (messages.length > 0) {
            var message = messages[0];

            var parsedMessage = {
                roomId: this.props.roomId,
                user: this.props.user,
                message: message.text
            };

            this.props.sendFunc(parsedMessage);
        }
        // this.socket.emit('add_message', messages[0]);
        // this.setState((previousState) => {
        //     return {
        //         messages: GiftedChat.append(previousState.messages, messages),
        //     };
        // });
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: this.props.user,
                }}
                bottomOffset={0}
                />
        );
    }
}

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
