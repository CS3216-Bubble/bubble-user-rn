import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import ChatComponent from '../components/ChatComponent';

export default class ChatView extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={Actions.pop}>
                        <Text> Back </Text>
                    </Button>
                    <Title>{this.props.roomId}</Title>
                </Header>
                <Content>
                  <ChatComponent roomId={this.props.roomId} user={this.props.user}/>
                </Content>
            </Container>
        );
    }
}
