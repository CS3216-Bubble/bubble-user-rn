import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

export default class ChatComponent extends Component {
    render() {
        return (
          <View style={Styles.container}>
              <Text style={Styles.welcome}>
                  Chat View
              </Text>
              <Text style={Styles.instructions}>
                  To get started, edit this js.
              </Text>
              <Text style={Styles.instructions}>
                  {'\n'}This is chat #{this.props.roomId},{'\n'}
                  and I am user #{this.props.user}.{'\n'}
              </Text>
              <Text onPress={Actions.pop} style={Styles.instructions}>
                  {'\n'}Go Back{'\n'}
              </Text>
              <Text style={Styles.instructions}>
                  For Android: {'\n'}
                  Double tap R on your keyboard to reload,{'\n'}
                  Shake or press menu button for dev menu
              </Text>
              <Text style={Styles.instructions}>
                  For iOS: {'\n'}
                  Press Cmd + R on your keyboard to reload,{'\n'}
                  Shake or press Cmd + R for dev menu
              </Text>
          </View>
        );
    }
}
