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
  state = {
    user: {
      name: 'User John',
      imgSrc: 'https://www.dropbox.com/s/2fth5ceonfa3iww/group.png?raw=1',
      numThanks: 42,
      numCheers: 21,
    },
    selectedTab: 0
  }

  onChangeTab(tab) {
    console.log(tab);
    // Depending on tab, show different icons in header
  }

  _renderTabAction() {
    switch (this.state.selectedTab) {
      case 0:
        return (
          
        );
      case 1:
        return (

        );
      case 2:
        return (

        );
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Bubble</Title>
          {this._renderTabAction()}
        </Header>
        <View style={{flex: 1}}>
          <Tabs theme={light} onChangeTab={this.onChangeTab}>
            <ChatListComponent tabLabel='Chats' tabBgColor='#4883da' user={this.state.user}/>
            <ProfileComponent tabLabel='Profile' tabBgColor='#4883da' />
            <SettingsComponent tabLabel='Settings' tabBgColor='#4883da' />
          </Tabs>
        </View>
      </Container>
    );
  }
}
