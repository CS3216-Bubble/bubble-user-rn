import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
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
        <View style={styles.wrapperContainer}>
          <Image source={{ uri: this.props.user.imgSrc }} style={styles.profileContainerImage} />
        </View>
        <View style={styles.profileContainerName}>

          {Platform.OS == 'ios' &&
            <View style={styles.textWrapperIOS}>
              <Text style={styles.profileContainerText}>{this.props.user.name}</Text>
            </View>}

          {Platform.OS == 'android' &&
            <View style={styles.textWrapperAndroid}>
              <Text style={styles.profileContainerText}>{this.props.user.name}</Text>
            </View>}

        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  profileContainer: {
    flex: 0.65,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    // backgroundColor: '#A7DBD8'
    backgroundColor: '#E8E8E8'
  },
  profileContainerName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileContainerText: {
    fontSize: 18,
    // color: '#696969',
    color: 'white',
    fontWeight: '600'
  },
  profileContainerImage: {
    height: 120,
    width: 120
  },
  wrapperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    width: 160,
    borderRadius: 80,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    marginBottom: 0
  },
  textWrapperAndroid: {
    backgroundColor: '#69D2E7',
    padding: 6,
    borderRadius: 6,
    marginTop: -20
  },
  textWrapperIOS: {
    backgroundColor: '#69D2E7',
    padding: 6,
    borderRadius: 6,
    marginTop: -20
  }
});
