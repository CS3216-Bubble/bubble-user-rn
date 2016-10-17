import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import ChatListComponent from '../components/ChatListComponent';

export default class ChatListView extends Component {
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
            <Container>
              <Header>
                <Title>Chats</Title>
                <Button transparent>
                    <Text></Text>
                </Button>
                <Button transparent onPress={joinRoom}>
                    <Text>Join</Text>
                </Button>
              </Header>
              <Content>
                <ChatListComponent />
              </Content>
            </Container>
        );
    }
}
