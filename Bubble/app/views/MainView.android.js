import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Header, Title, Tabs } from 'native-base';

import ChatListComponent from '../components/ChatListComponent';
import ProfileComponent from '../components/ProfileComponent';
import SettingsComponent from '../components/SettingsComponent';

import {Styles} from '../styles/Styles';

// Theme styling for native-base
import light from '../../Themes/light';


export default class MainView extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Issues</Title>
        </Header>
        <View style={{flex: 1}}>
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
