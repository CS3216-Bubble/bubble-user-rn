import React, { Component, PropTypes } from 'react';
import { Platform, Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import ChatInfoComponent from '../components/ChatInfoComponent';

export default class ChatInfoView extends Component {
    static propTypes = {
      chat: PropTypes.object.isRequired,
    }

    render() {
        const buttonColor = Platform.OS === 'ios' ? '#0E7AFE' : '#FFFFFF';
        
        return (
            <Container>

                <Header>
                    <Button transparent onPress={Actions.pop}>
                        <Icon size={30} name='ios-arrow-back' color={buttonColor}/>
                    </Button>
                    <Title>Chat Info</Title>
                </Header>
                <Content>
                    <ChatInfoComponent chat={this.props.chat} />
                </Content>
            </Container>
        );
    }
}
