import React, { Component } from 'react';

import { Image, Text, View, TouchableHighlight, ScrollView } from 'react-native';

import {
    Card,
    CardItem,
    Title,
    Button
} from 'native-base';

import { Styles } from '../styles/Styles';

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

        // this.state.chatRooms = chatRooms;

        var listChats = [];
        for (var chatCount = 0; chatCount < chatRooms.length; ++chatCount) {
            var chat = chatRooms[chatCount];

            var listCategories = [];
            for (var catCount = 0; catCount < chat.categories.length; ++catCount) {
                var category = chat.categories[catCount];

                listCategories.push(
                    <Button key={category} transparent textStyle={{ color: '#87838B' }}>
                        {category}
                    </Button>
                );
            }



            listChats.push(
                <Card key={chat.roomId} style={Styles.card}>

                    <CardItem>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableHighlight style={Styles.imageContainer}>
                                <Image style={Styles.image} source={{ uri: 'https://lh3.googleusercontent.com/-dWk17lP4LYM/AAAAAAAAAAI/AAAAAAAAAAA/k2_ZU1cJ8lM/photo.jpg' }} />
                            </TouchableHighlight>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text>
                                    Snappy Koala
                                </Text>
                                <Text note>
                                    {chat.lastActive}
                                </Text>
                            </View>
                        </View>
                    </CardItem>

                    <CardItem cardBody>
                        <Title>
                            {chat.roomName}
                        </Title>
                        <Text>
                            {chat.roomDescription}
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {listCategories}
                        </View>
                    </CardItem>

                    <CardItem header>
                        <Text>{chat.numberOfUsers} of {chat.userLimit} participants</Text>
                    </CardItem>

                </Card>
            );
        }

        return (
            <ScrollView style={{ flex: 1 }}>
                {listChats}
            </ScrollView>
        );
    }
}
