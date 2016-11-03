import React, { Component, PropTypes } from 'react';
import { Platform, Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

import CustomTheme from '../themes/bubble';

import ChatFormComponent from '../components/ChatFormComponent';

import Globals from '../globals';

const defaultForm = {
  name: '',
  description: '',
  numUsers: '7',
  categories: [],
}

export default class ChatFormView extends Component {
  static propTypes = {
    isBackButtonVisible: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    if (!this.props.isBackButtonVisible) {
      this.state = {
        isBackButtonVisible: false,
        form: defaultForm,
        isFormValid: false
      };
    } else {
      this.state = {
        isBackButtonVisible: this.props.isBackButtonVisible,
        form: defaultForm,
        isFormValid: false
      };
    }

    this.createChat = this.createChat.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isBackButtonVisible) {
      this.setState({isBackButtonVisible: nextProps.isBackButtonVisible});
    }
  }

  // Form logic
  onNameChange = (name) => {
    var form = this.state.form;
    form.name = name;

    this.setState({form: form, isFormValid: this.isFormValid(form)});
  }

  onDescriptionChange = (description) => {
    var form = this.state.form;
    form.description = description;

    this.setState({form: form});
  }

  onNumUsersChange = (number) => {
    // Remove non-numeric characters
    number = number.replace(/\D/g,'');

    var int = parseInt(number);

    // Enforce user limit
    if (int > Globals.MAX_USERS) {
      number = '' + Globals.MAX_USERS;
    } else if (int < Globals.MIN_USERS || number == '') {
      number = '' + Globals.MIN_USERS;
    }

    var form = this.state.form;
    form.numUsers = number;

    this.setState({form: form, isFormValid: this.isFormValid(form)});
  }

  onCategoriesChange = (categories) => {
    var form = this.state.form;
    form.categories = categories;
    categories.sort();

    this.setState({form: form});
  }

  isFormValid = (form) => {
    return form.name != '' && form.numUsers != '';
  }

  createChat = () => {
    const form = this.state.form;

    // Clear form
    this.setState({form: defaultForm});

    // Remove this ChatFormView from nav stack and replace with chat view
    // Enter chat loading view with chat id/object
    Actions.chatLoadingView({form: form});
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
                      { this.state.isBackButtonVisible ? <Icon size={30} name='ios-arrow-back' color="#0E7AFE"/> : <Text></Text> }
                  </Button>
                  <Button disabled={!this.state.isFormValid} transparent onPress={this.createChat}>
                      <Text style={fontStyle}>Create</Text>
                  </Button>
              </Header>
              <Content>
                  <ChatFormComponent
                    form={this.state.form}
                    onNameChange={this.onNameChange}
                    onDescriptionChange={this.onDescriptionChange}
                    onNumUsersChange={this.onNumUsersChange}
                    onCategoriesChange={this.onCategoriesChange}
                  />
              </Content>
          </Container>
      );
  }
}
