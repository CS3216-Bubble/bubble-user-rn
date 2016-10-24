import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Thumbnail, Text, Button, Icon } from 'native-base';

export default class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem>
            <Thumbnail square size={80} source={{ uri: this.props.user.imgSrc }} />
            <Text>{this.props.user.name}</Text>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}
