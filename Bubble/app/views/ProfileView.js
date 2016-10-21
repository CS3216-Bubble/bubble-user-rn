import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import ProfileComponent from '../components/ProfileComponent';

export default class ProfileView extends Component {
    state = {
        user: {
            name: 'User John',
            imgSrc: 'https://www.dropbox.com/s/2fth5ceonfa3iww/group.png?raw=1',
            numThanks: 42,
            numCheers: 21,
        }
    }

    render() {
        // console.log(this.state.user);
        return (
            <Container>

                <Header iconRight>
                    <Title>Profile</Title>
                    <Button transparent onPress={() => Actions.profileForm({ user: this.state.user })}>
                        <Icon size={30} name='ios-create-outline' color="#0E7AFE" />
                    </Button>
                </Header>

                <Content>
                    <ProfileComponent user={this.state.user} />
                </Content>

            </Container>
        );
    }
}
