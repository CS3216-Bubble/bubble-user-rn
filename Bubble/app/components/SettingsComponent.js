import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View, Switch } from 'react-native';
import { Picker, Text, Button } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';

import ProfileComponent from './ProfileComponent';

export default class SettingsComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = {
    isNotificationsOn: true,
    selectedGender: 'other'
  }

  onValueChange = (value) => {
    this.setState({selectedGender: value});
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
            <View style={styles.customListItemRight}>
              <Text style={styles.customListItemText}>Gender</Text>
              <Picker
                style={styles.picker}
                iosHeader="Select gender"
                mode="dropdown"
                selectedValue={this.state.selectedGender}
                onValueChange={this.onValueChange}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
             </Picker>
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
      height: 50,
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    customListItemText: {
      fontSize: 16
    },
    picker: {
      position: 'absolute',
      right: 5,
      bottom: -20,
      padding: 0
    },
});
