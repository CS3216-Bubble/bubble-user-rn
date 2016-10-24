import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import SettingsComponent from '../components/SettingsComponent';

export default class SettingsView extends Component {
  state = {
      user: {
          name: 'User John',
          imgSrc: 'https://www.dropbox.com/s/2fth5ceonfa3iww/group.png?raw=1',
      }
  }

    render() {
        return (
            <Container>
                <Header>
                    <Title>Settings</Title>
                </Header>
                <Content>
                    <SettingsComponent user={this.state.user}/>
                </Content>
            </Container>
        );
    }
}
