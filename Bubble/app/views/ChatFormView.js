import React, { Component, PropTypes } from 'react';
import { Platform, Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

import CustomTheme from '../themes/bubble';

import ChatFormComponent from '../components/ChatFormComponent';

import Globals from '../globals';

export default class ChatFormView extends Component {
  static propTypes = {
    isBackButtonVisible: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    if (!this.props.isBackButtonVisible) {
      this.state = {isBackButtonVisible: false, form: {}, isFormValid: false};
    } else {
      this.state = {isBackButtonVisible: this.props.isBackButtonVisible, form: {}, isFormValid: false};
    }

    this.onFormChange = this.onFormChange.bind(this);
    this.createChat = this.createChat.bind(this);
  }

  onFormChange(form) {
    this.setState({form: form, isFormValid: this.isFormValid(form)});
  }

  isFormValid = (form) => {
    return form.name != '' && form.numUsers != '';
  }

  createChat = () => {
    // Validate form first

    // Remove this ChatFormView from nav stack and replace with chat view
    // Enter chat loading view with chat id/object
    Actions.chatLoadingView({type: ActionConst.REPLACE, form: this.state.form});
  }

  render() {
      const fontStyle = this.state.isFormValid ?
                    (Platform.OS === 'ios' ? {color:'#0E7AFE'} : {color:'#FFFFFF'})
                    : {color: '#999999'};

      return (
          <Container theme={CustomTheme}>
              <Header>
                  <Title>Create Chat</Title>
                  <Button transparent onPress={Actions.pop}>
                      { this.state.isBackButtonVisible ? <Icon size={30} name='ios-arrow-back' color="#0E7AFE"/> : <Text>Back</Text> }
                  </Button>
                  <Button disabled={!this.state.isFormValid} transparent onPress={this.createChat}>
                      <Text style={fontStyle}>Create</Text>
                  </Button>
              </Header>
              <Content>
                  <ChatFormComponent onFormChange={this.onFormChange} categoryNames={Globals.CATEGORIES}/>
              </Content>
          </Container>
      );
  }
}
