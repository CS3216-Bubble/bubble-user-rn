import React, { Component } from 'react';
import { Container, Content, Header, Title, Tabs } from 'native-base';

import ChatListComponent from '../components/ChatListComponent';
import ProfileComponent from '../components/ProfileComponent';
import SettingsComponent from '../components/SettingsComponent';

export default class MainView extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Issues</Title>
        </Header>
        <Content>
          <Tabs>
            <ChatListComponent tabLabel='Chats' />
            <ProfileComponent tabLabel='Profile' />
            <SettingsComponent tabLabel='Settings' />
          </Tabs>
        </Content>
      </Container>
    );
  }
}
