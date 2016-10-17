import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import SettingsComponent from '../components/SettingsComponent';

export default class SettingsView extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Title>Settings</Title>
                </Header>
                <Content>
                  <SettingsComponent />
                </Content>
            </Container>
        );
    }
}
