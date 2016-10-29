import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { Styles } from '../styles/Styles';
import { Actions } from 'react-native-router-flux';

export default class ChatPlaceholderComponent extends Component {
  static propTypes = {
      onCreateChatPressed: PropTypes.func.isRequired,
  }

  render() {
      return (
          <View style={Styles.placeholderContainer}>
              <Image style={Styles.placeholderImage} source={require('../img/chat.png')} />
              <Text style={Styles.placeholder}> No ongoing chats yet.</Text>
              <Button block info
                style={{margin: 15}}
                onPress={this.props.onCreateChatPressed}>
                  <Text style={{color: '#FFFFFF'}}>Create one now!</Text>
              </Button>
          </View>
      );
  }
}
