import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, InputGroup, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

export default class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {

    return (
      <View style={styles.profileContainer}>
        <Image source={{ uri: this.props.user.imgSrc }} style={styles.profileContainerImage}/>
        <View style={styles.profileContainerName}>
              <Text style={styles.profileContainerText}>{this.props.user.name}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    profileContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
      backgroundColor: '#A7DBD8'
    },
    profileContainerName: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    profileContainerText: {
      fontSize: 20
    },
    profileContainerImage: {
      marginBottom: 15,
      height: 80,
      width: 80,
      borderRadius: 40
    }
});
