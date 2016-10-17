import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Icon, Input, InputGroup } from 'native-base';

export default class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = {
    name: this.props.user.name
  };

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem>
            <InputGroup>
              <Icon name='ios-person' />
              <Input
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
                placeholder='Name'
              />
            </InputGroup>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}
