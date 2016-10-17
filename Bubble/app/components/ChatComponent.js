import React, { Component } from 'react';

import { Text, View } from 'react-native';

import { Button } from 'native-base';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

import ChatService from '../services/ChatService';

export default class ChatComponent extends Component {

    constructor() {
        super();
    }

    render() {

        return (
            <View style={Styles.container}>
                <Text style={Styles.welcome}>
                    Chat View
              </Text>
                <Text style={Styles.instructions}>
                    To get started, edit this js.
              </Text>
                <Text style={Styles.instructions}>
                    {'\n'}This is chat #{this.props.roomId},{'\n'}
                    and I am user #{this.props.user}.{'\n'}
                </Text>

                <Text onPress={Actions.pop} style={Styles.instructions}>
                    {'\n'}Go Back{'\n'}
                </Text>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Button onPress={this.startChat}>
                        Add a Chat
                    </Button>

                </View>


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

    startChat() {

        var user = {
            user: "123"
        };

        var chat = {
            user: "123",
            roomName: "Hello Panda",
            roomDescription: "Goodbye Panda",
            userLimit: 10,
            categories: ["School", "Stress", "Work"]
        };

        var session = new ChatService();
        session.socket.connect();
        session.listRooms(user);
        // session.createRoom(chat);
        // session.listRooms(user);
    }
}

// OLD




// var chatSession = new ChatService(this.props);
// chatSession.listRooms(user);
// chatSession.addChat(chat);
// console.log(user);