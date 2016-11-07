import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { List, ListItem } from 'native-base';

export default class InformationComponent extends Component {

  state = {
    isNotificationsOn: true
  }

  render() {
      return (
        <View style={{alignItems:'center', justifyContent:'center', marginTop: 100}}>
            <Image source={require('../img/coming.jpg')} style={{height: 300, width: 300}} />
        </View>
      );
  }
}

var styles = StyleSheet.create({
    fillContainer: {
      flex: 1,
      height: 500
    },
    profileContainer: {
      flex: 1,
      height: 200
    },
    settingsContainer: {
      flex: 2
    },
    customListItemRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    customListItemText: {
      fontSize: 16
    }
});
