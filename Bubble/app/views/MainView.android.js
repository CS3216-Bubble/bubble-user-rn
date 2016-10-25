import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Header, Title, Tabs } from 'native-base';
import ActionButton from 'react-native-action-button';
import CustomTheme from '../themes/bubble';
import { ThemeProvider, Toolbar, Button } from 'react-native-material-ui';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ChatListComponent from '../components/ChatListComponent';
import SettingsComponent from '../components/SettingsComponent';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

const uiTheme = {
    palette: {
        primaryColor: '#69D2E7',
    },
    toolbar: {
        container: {
            height: 56,
        },
    },
};

export default class MainView extends Component {
  state = {
    user: {
      name: 'User John',
      imgSrc: 'https://www.dropbox.com/s/2fth5ceonfa3iww/group.png?raw=1',
    },
    selectedTab: 0,
    searchTerm: ''
  }

  onChangeTab = (tab) => {
    this.setState({selectedTab: tab.i});
  }

  onSearchBarTextChange = (text) => {
    console.log(text);
    this.setState({searchTerm: text});
  }

  render() {

    var header;
    if (this.state.selectedTab === 0) {
      header = (
        <Toolbar
          centerElement="Bubble"
          searchable={{
              autoFocus: true,
              placeholder: 'Search',
              onChangeText: this.onSearchBarTextChange
          }}
        />
      );
    } else {
      header = (
        <Toolbar
          centerElement="Bubble"
        />
      );
    }

    return (
        <ThemeProvider uiTheme={uiTheme}>
          <View style={{ flex: 1 }}>
            { header }
            <View style={{ flex: 1 }}>
              <Tabs theme={CustomTheme} onChangeTab={this.onChangeTab}>
                <ChatListComponent tabLabel='All' showOpenChatsOnly={false} searchTerm={this.state.searchTerm} />
                <ChatListComponent tabLabel='Open' showOpenChatsOnly={true} />
                <SettingsComponent tabLabel='Settings' user={this.state.user} />
              </Tabs>
            </View>
            { this.state.selectedTab === 0 ?
              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={Actions.chatFormView}
              /> : null }
          </View>
        </ThemeProvider>
    );
  }
}
