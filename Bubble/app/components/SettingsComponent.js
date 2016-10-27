import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View, Switch, Text } from 'react-native';

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
        <View style={styles.fillContainer}>
          <ProfileComponent user={this.props.user} style={styles.profileContainer}/>
          <ScrollView style={styles.settingsContainer}>
            <View style={styles.customListItemRight}>
              <Text style={styles.customListItemText}>Notifications</Text>
              <Switch
                onValueChange={(value) => this.setState({isNotificationsOn: value})}
                value={this.state.isNotificationsOn} />
            </View>
          </ScrollView>
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
