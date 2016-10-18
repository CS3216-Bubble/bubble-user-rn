import React, { Component } from 'react';

import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import { Button } from 'native-base';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

import ChatService from '../services/ChatService';

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
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
