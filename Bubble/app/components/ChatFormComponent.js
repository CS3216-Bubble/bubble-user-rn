import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { List, ListItem, Icon, Input, InputGroup, Text, Button } from 'native-base';
import MultipleChoice from 'react-native-multiple-choice';

import Globals from '../globals';

export default class ChatFormComponent extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onNumUsersChange: PropTypes.func.isRequired,
    onCategoriesChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState({categories: nextProps.form.categories});
  }

  state = {
    categories: this.props.form.categories
  }

  onSelectCategory = (category) => {
    this.props.onCategoriesChange(this.state.categories);
  }

  isNameValid = () => {
    return this.props.form.name != '';
  }

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem>
            <InputGroup iconRight={!this.isNameValid()} error={!this.isNameValid()}>
              <Input
                value={this.props.form.name}
                onChangeText={this.props.onNameChange}
                placeholder='Name'
              />
              { this.isNameValid() ? null :
                <Icon name='ios-close-circle' style={{color:'red'}}/>}
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup>
              <Input
                value={this.props.form.description}
                onChangeText={this.props.onDescriptionChange}
                placeholder='Description'
              />
            </InputGroup>
          </ListItem>

          <ListItem iconLeft>
            <InputGroup>
              <Icon name='ios-person' />
              <Input
                keyboardType='numeric'
                value={this.props.form.numUsers}
                onChangeText={this.props.onNumUsersChange}
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
            selectedOptions={this.state.categories}
            onSelection={this.onSelectCategory}
            />
        </View>
      </ScrollView>
    );
  }
}
