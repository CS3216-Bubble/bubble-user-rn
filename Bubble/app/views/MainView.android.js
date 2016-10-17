import React, { Component } from 'react';
import { Container, Content, Header, Title, Tabs } from 'native-base';

import ChatListComponent from '../components/ChatListComponent';
import ProfileComponent from '../components/ProfileComponent';
import SettingsComponent from '../components/SettingsComponent';

// Theme styling for native-base
import light from '../../Themes/light';


export default class MainView extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Issues</Title>
        </Header>
        <Content theme={light}>
          <Tabs>
            <ChatListComponent tabLabel='Chats' tabBgColor='#4883da' />
            <ProfileComponent tabLabel='Profile' tabBgColor='#4883da' />
            <SettingsComponent tabLabel='Settings' tabBgColor='#4883da' />
          </Tabs>
        </Content>
      </Container>
    );
  }
}
