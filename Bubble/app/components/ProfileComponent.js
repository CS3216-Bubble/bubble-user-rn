import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Thumbnail, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

export default class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    return (
      <View style={styles.profileContainer}>
        <Thumbnail size={80} source={{ uri: this.props.user.imgSrc }} style={styles.profileContainerImage}/>
        <View style={styles.profileContainerName}>
          <Text style={styles.profileContainerText}>{this.props.user.name}</Text>
          <Button transparent onPress={Actions.profileFormView}>
            <Icon size={20} name='edit' />
          </Button>
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
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileContainerText: {
      fontSize: 20
    },
    profileContainerImage: {
      backgroundColor: '#FFFFFF',
      marginBottom: 15
    }
});
