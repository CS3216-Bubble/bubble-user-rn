import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class LandingView extends Component {
    render() {
        setTimeout(() => {
          Actions.main({type: ActionConst.REPLACE});
        }, 2000);
        return (
            <View style={styles.splashContainer}>
              <Image style={styles.splashImage} source={require('./img/logo_white.png')} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#69D2E7'
    },
    splashImage: {
      width: 180,
      resizeMode: 'contain'
    },
    splashText: {
      color: '#FFFFFF'
    }
});
