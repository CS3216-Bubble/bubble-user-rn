import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { List, ListItem, Icon, Input, InputGroup, Text, Button } from 'native-base';
import MultipleChoice from 'react-native-multiple-choice';

import Globals from '../globals';

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
  }

  constructor(props) {
    super(props);
  }

  onNameChange = (name) => {
    this.setState({name: name});
    this.onFormChange();
  }

  onDescriptionChange = (description) => {
    this.setState({description: description});
    this.onFormChange();
  }

  onNumUsersChange = (number) => {
    console.log(number);
    // Remove non-numeric characters
    number = number.replace(/\D/g,'');

    var int = parseInt(number);

    // Enforce user limit
    if (int > Globals.MAX_USERS) {
      number = '' + Globals.MAX_USERS;
    } else if (int < Globals.MIN_USERS || number == '') {
      number = '' + Globals.MIN_USERS;
    }

    this.setState({numUsers: number});
    this.onFormChange();
  }

  onSelectCategory = (category) => {
    var categories = this.state.categories;
    var index = categories.indexOf(category);

    if (index > -1) { // Category has been selected
      // Remove the category
      categories.splice(index, 1);
    } else {
      // Add the category
      categories.push(category);
    }

    this.setState({categories: categories});
    this.onFormChange();
  }

  onFormChange = () => {
    this.props.onFormChange(this.state);
  }

  isNameValid = () => {
    return this.state.name != '';
  }

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem>
            <InputGroup iconRight={!this.isNameValid()} error={!this.isNameValid()}>
              <Input
                value={this.state.name}
                onChangeText={this.onNameChange}
                placeholder='Name'
              />
              { this.isNameValid() ? null :
                <Icon name='ios-close-circle' style={{color:'red'}}/>}
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup>
              <Input
                value={this.state.description}
                onChangeText={this.onDescriptionChange}
                placeholder='Description'
              />
            </InputGroup>
          </ListItem>

          <ListItem iconLeft>
            <InputGroup>
              <Icon name='ios-person' />
              <Input
                keyboardType='numeric'
                value={this.state.numUsers}
                onChangeText={this.onNumUsersChange}
                placeholder='No. of Users'
              />
            </InputGroup>
          </ListItem>

          <ListItem itemDivider>
            <Text>Categories</Text>
          </ListItem>
        </List>
        <View style={{paddingLeft: 20}}>
          <MultipleChoice
            options={Globals.CATEGORIES}
            onSelection={this.onSelectCategory}
            />
        </View>
      </ScrollView>
    );
  }
}
