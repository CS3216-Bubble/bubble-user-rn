import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Thumbnail, Text } from 'native-base';

export default class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    return (
      <View style={styles.profileContainer}>
          <Thumbnail square size={80} source={{ uri: this.props.user.imgSrc }} />
          <Text style={styles.profileContainerText}>{this.props.user.name}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    profileContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    profileContainerText: {
      fontSize: 20
    }

});
