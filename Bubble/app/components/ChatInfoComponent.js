import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Text } from 'native-base';

export default class ChatInfoComponent extends Component {
  static propTypes = {
    chat: PropTypes.object.isRequired,
  }

  state = {

  }

  render() {
      return (
        <View>
          <List>
            <ListItem><Text>{this.props.chat.roomName}</Text></ListItem>
          </List>
        </View>
      );
  }
}

var styles = StyleSheet.create({

});
