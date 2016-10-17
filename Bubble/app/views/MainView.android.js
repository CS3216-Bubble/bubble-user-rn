import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Header, Title, Tabs, Button } from 'native-base';

import ChatListComponent from '../components/ChatListComponent';
import ProfileComponent from '../components/ProfileComponent';
import SettingsComponent from '../components/SettingsComponent';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

// Theme styling for native-base
import light from '../../Themes/light';


export default class MainView extends Component {
    render() {

        // [Stub] Payload and Action to join room / enter a specific chat
        var roomId = "123";
        var userId = "00007";
        const joinRoom = () => Actions.chatView({ roomId: roomId, user: userId });

        return (
            <Container>
                <Header>
                    <Button transparent>
                        <Text></Text>
                    </Button>
                    <Title>Bubble</Title>
                    <Button transparent onPress={joinRoom}>
                        <Text>Join</Text>
                    </Button>
                </Header>
                <View style={{ flex: 1 }}>
                    <Tabs theme={light}>
                        <ChatListComponent tabLabel='Chats' tabBgColor='#4883da' />
                        <ProfileComponent tabLabel='Profile' tabBgColor='#4883da' />
                        <SettingsComponent tabLabel='Settings' tabBgColor='#4883da' />
                    </Tabs>
                </View>
            </Container>
        );
    }
}
