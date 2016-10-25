import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Header, Title, Tabs, Button } from 'native-base';
import ActionButton from 'react-native-action-button';
import CustomTheme from '../themes/bubble';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ChatListComponent from '../components/ChatListComponent';
import SettingsComponent from '../components/SettingsComponent';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

export default class MainView extends Component {
  state = {
    user: {
      name: 'User John',
      imgSrc: 'https://www.dropbox.com/s/2fth5ceonfa3iww/group.png?raw=1',
    },
    selectedTab: 0
  }

  onChangeTab = (tab) => {
    this.setState({selectedTab: tab.i});
  }

  onSearchButtonPress = () => {

  }

  render() {

    var header;
    if (this.state.selectedTab === 0) {
      header = (
        <Header>
          <Title>Bubble</Title>
          <Button transparent> </Button>
          <Button transparent onPress={this.onSearchButtonPress}>
            <Icon size={24} name="search" color="#fff" />
          </Button>
        </Header>
      );
    } else {
      header = (
        <Header>
          <Title>Bubble</Title>
          <Button transparent> </Button>
        </Header>
      );
    }

    return (
        <Container theme={CustomTheme}>
          { header }
          <View style={{ flex: 1 }}>
            <Tabs onChangeTab={this.onChangeTab}>
              <ChatListComponent tabLabel='All' showOpenChatsOnly={false}/>
              <ChatListComponent tabLabel='Open' showOpenChatsOnly={true} />
              <SettingsComponent tabLabel='Settings' user={this.state.user} />
            </Tabs>
            { this.state.selectedTab === 0 ?
              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={Actions.chatFormView}
              /> : null }
          </View>
        </Container>
    );
  }
}
