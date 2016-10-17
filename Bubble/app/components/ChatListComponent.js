import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Styles } from '../styles/common-styles';

import { Actions } from 'react-native-router-flux';

export default class ChatListComponent extends Component {
    render() {

        // [Stub] Payload and Action to join room / enter a specific chat
        var roomId = "123";
        var userId = "00007";
        const joinRoom = () => Actions.chatView({ roomId: roomId, user: userId });

        // [Stub] Payload for populating Chat List
        var chatRoom1 = {
            roomId: "01234",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        var chatRoom2 = {
            roomId: "26423",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        var chatRoom3 = {
            roomId: "12315",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        var chatRoom4 = {
            roomId: "02657",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        var chatRoom5 = {
            roomId: "02799",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        // [Stub] Chat List
        var chatRooms = [chatRoom1, chatRoom2, chatRoom3, chatRoom4, chatRoom5];

        return (
          <View style={Styles.container}>
              <Text style={Styles.welcome}>
                  Chat List View
              </Text>
              <Text style={Styles.instructions}>
                  To get started, edit this js.
              </Text>
              <Text onPress={joinRoom} style={Styles.instructions}>
                  ENTER A CHAT HERE.
              </Text>
              <Text style={Styles.instructions}>
                  For Android: {'\n'}
                  Double tap R on your keyboard to reload,{'\n'}
                  Shake or press menu button for dev menu
              </Text>
              <Text style={Styles.instructions}>
                  For iOS: {'\n'}
                  Press Cmd + R on your keyboard to reload,{'\n'}
                  Shake or press Cmd + R for dev menu
              </Text>
          </View>
        );
    }
}
