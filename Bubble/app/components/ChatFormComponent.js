import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Icon, Input, InputGroup, Text, Button } from 'native-base';
import Picker from 'react-native-picker';

export default class ChatFormComponent extends Component {

  static propTypes = {
    onFormChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.callPicker = this.callPicker.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  state = {
    name: '',
    description: '',
    numUsers: '2',
    categories: []
  }

  onNameChange(name) {
    this.setState({name: name});
    onFormChange();
  }

  onDescriptionChange(description) {
    this.setState({description: description});
    onFormChange();
  }

  onNumUsersChange(numUsers) {
    this.setState({numUsers: numUsers});
    this.onFormChange();
  }

  onCategoriesChange(categories) {
    this.setState({categories: categories});
    onFormChange();
  }

  onFormChange() {
    this.props.onFormChange(this.state);
  }

  callPicker() {
    const MIN_USERS = 2;
    const MAX_USERS = 10;

    let values = [];
    for (var i = MIN_USERS; i < MAX_USERS; i++) {
        values.push(i);
    }

    console.log(values);

    Picker.init({
        pickerData: values,
        selectedValue: [MIN_USERS],
        pickerConfirmBtnText: 'Confirm',
        pickerCancelBtnText: 'Cancel',
        pickerTitleText: 'Select number of users',
        onPickerConfirm: (data) => {
          this.onNumUsersChange(data.pop());
        }
    });
    Picker.show();
  }

  render() {

    return (
      <ScrollView>
        <List>
          <ListItem>
            <InputGroup>
              <Icon name='ios-person' />
              <Input
                value={this.state.name}
                onChangeText={this.onNameChange}
                placeholder='Name'
              />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup>
              <Icon name='ios-person' />
              <Input
                value={this.state.description}
                onChangeText={this.onDescriptionChange}
                placeholder='Description'
              />
            </InputGroup>
          </ListItem>

          <ListItem iconLeft button onPress={this.callPicker}>
            <Icon name='ios-person' />
            <Text>{this.state.numUsers}</Text>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}
