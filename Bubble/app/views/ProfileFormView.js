import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Title, Button, Text, Icon } from 'native-base';

import ProfileFormComponent from '../components/ProfileFormComponent';

export default class ProfileFormView extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={Actions.pop}>
              <Icon size={30} name='ios-arrow-back' color="#0E7AFE"/>
          </Button>
          <Title>Edit Profile</Title>
          <Button transparent onPress={Actions.pop}>
              <Text>Save</Text>
          </Button>
        </Header>
        <Content>
          <ProfileFormComponent user={this.props.user}/>
        </Content>
      </Container>
    );
  }
}
