import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

import ChatFormComponent from '../components/ChatFormComponent';

export default class ChatFormView extends Component {
  constructor(props) {
    super(props);

    this.onFormChange = this.onFormChange.bind(this);
    this.createChat = this.createChat.bind(this);
  }

  state = {
    categoryNames: ['Rant', 'Funny', 'Nostalgia', 'Relationship', 'Advice', 'School'],
    form: {}
  }

  onFormChange(form) {
    console.log(form);
    this.setState({form: form});
  }

  createChat() {
    // Validate form first

    // Then create chat
    console.log(this.state.form);

    // Remove this ChatFormView from nav stack and replace with chat view
    // Enter chat view with chat id/object
    Actions.chatView({type: ActionConst.REPLACE});
  }

  render() {
      return (
          <Container>
              <Header>
                  <Title>Create Chat</Title>
                  <Button transparent onPress={Actions.pop}>
                      <Icon size={30} name='ios-arrow-back' color="#0E7AFE"/>
                  </Button>
                  <Button transparent onPress={this.createChat}>
                      <Text>Create</Text>
                  </Button>
              </Header>
              <Content>
                  <ChatFormComponent onFormChange={this.onFormChange} categoryNames={this.state.categoryNames}/>
              </Content>
          </Container>
      );
  }
}
