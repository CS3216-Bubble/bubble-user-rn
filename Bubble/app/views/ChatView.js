import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import ChatComponent from '../components/ChatComponent';

export default class ChatView extends Component {
    render() {
      // Passed from ChatListComponent via Actions
      console.log(this.props.chat);
        return (
            <Container>
              <Header>
                <Button transparent onPress={Actions.pop}>
                    <Icon size={30} name='ios-arrow-back' color="#0E7AFE"/>
                </Button>
                <Title>{this.props.chat.roomName}</Title>
                <Button transparent>
                    <Icon size={30} name='ios-information-circle-outline' color="#0E7AFE"/>
                </Button>
              </Header>
              <Content>
                <ChatComponent roomId={this.props.roomId} user={this.props.user} style={{flex: 1}}/>
              </Content>
            </Container>
        );
    }
}
