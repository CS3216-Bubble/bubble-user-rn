import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View, Switch, Text } from 'react-native';
import { List, ListItem } from 'native-base';

import ProfileComponent from './ProfileComponent';

export default class SettingsComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = {
    isNotificationsOn: true
  }

  render() {
      return (
        <ScrollView>
          <ProfileComponent user={this.props.user} style={styles.profileContainer}/>
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
    profileContainer: {
      height: 100
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
