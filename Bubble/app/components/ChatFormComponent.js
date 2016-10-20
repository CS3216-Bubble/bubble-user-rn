import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Icon, Input, InputGroup, Text, Button, CheckBox } from 'native-base';
import Picker from 'react-native-picker';

export default class ChatFormComponent extends Component {

  static propTypes = {
    onFormChange: PropTypes.func.isRequired,
    categoryNames: PropTypes.array.isRequired,
  }

  state = {
    categoryNames: this.props.categoryNames,
    name: '',
    description: '',
    numUsers: '2',
    categories: [],
    isCheckboxSelected: [],
  }

  constructor(props) {
    super(props);

    // Init checkbox state array
    var isCheckboxSelected = new Array(this.state.categoryNames.length);
    isCheckboxSelected.fill(false);
    this.state.isCheckboxSelected = isCheckboxSelected;
  }

  onNameChange = (name) => {
    this.setState({name: name});
    this.onFormChange();
  }

  onDescriptionChange = (description) => {
    this.setState({description: description});
    this.onFormChange();
  }

  onNumUsersChange = (numUsers) => {
    this.setState({numUsers: numUsers});
    this.onFormChange();
  }

  onCategoriesChange = (categories) => {
    this.setState({categories: categories});
    this.onFormChange();
  }

  onFormChange = () => {
    this.props.onFormChange(this.state);
  }

  getSelectedCategories = (checkboxState) => {
    var result = [];
    for (var i = 0; i < checkboxState.length; i++) {
      if (checkboxState[i]) {
        result.push(this.state.categoryNames[i]);
      }
    }
    return result;
  }

  onCheckboxSelected = (index) => {
    var newState = this.state.isCheckboxSelected;
    newState[index] = !newState[index];

    var categories = this.getSelectedCategories(newState);

    this.setState({isCheckboxSelected: newState});
    this.setState({categories: categories});

    this.onFormChange();
  }

  callPicker = () => {
    const MIN_USERS = 2;
    const MAX_USERS = 10;

    let values = [];
    for (var i = MIN_USERS; i < MAX_USERS; i++) {
        values.push(i);
    }

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
    const categories = this.state.categoryNames.map(function(name, index) {
      return (
        <ListItem key={index} button onPress={() => this.onCheckboxSelected(index)}>
            <CheckBox checked={this.state.isCheckboxSelected[index]} />
            <Text>{name}</Text>
        </ListItem>
      );
    }, this);

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

          <ListItem divider>
            <Text>Categories</Text>
          </ListItem>
          { categories }
        </List>
      </ScrollView>
    );
  }
}
