import React, { Component } from 'react';
import { Platform, StyleSheet, TabBarIOS, Text, View } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import ChatListView from './ChatListView';
import ProfileView from './ProfileView';
import SettingsView from './SettingsView';

export default class MainView extends Component {
  state = {
    selectedTab: 'chats',
  };

  _renderContent = () => {
    switch (this.state.selectedTab) {
      case 'chats':
        return (
          <ChatListView />
        );
        break;
      case 'profile':
        return (
          <ProfileView />
        );
        break;
      case 'settings':
        return (
          <SettingsView />
        );
        break;
    }
  };

  render() {
    return (
        <TabBarIOS>
          <Icon.TabBarItemIOS
            title="Chats"
            iconName="ios-chatboxes"
            selected={this.state.selectedTab === 'chats'}
            onPress={() => {
              this.setState({
                selectedTab: 'chats',
              });
            }}>
            {this._renderContent()}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            title="Profile"
            iconName="ios-person-outline"
            selected={this.state.selectedTab === 'profile'}
            onPress={() => {
              this.setState({
                selectedTab: 'profile',
              });
            }}>
            {this._renderContent()}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            title="Settings"
            iconName="ios-settings"
            selected={this.state.selectedTab === 'settings'}
            onPress={() => {
              this.setState({
                selectedTab: 'settings',
              });
            }}>
            {this._renderContent()}
          </Icon.TabBarItemIOS>
        </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
