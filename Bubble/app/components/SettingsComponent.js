import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Switch, Text } from 'react-native';
import { List, ListItem } from 'native-base';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

export default class SettingsComponent extends Component {
  state = {
    isNotificationsOn: true
  }

  render() {
      return (
        <ScrollView>
            <View style={styles.customListItemRight}>
              <Text style={styles.customListItemText}>Notifications</Text>
              <Switch
                onValueChange={(value) => this.setState({isNotificationsOn: value})}
                value={this.state.isNotificationsOn} />
            </View>
        </ScrollView>
      );
  }
}

var styles = StyleSheet.create({
    customListItemRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    customListItemText: {
      fontSize: 16
    }

});
