import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, ScrollView, TouchableHighlight, View, Switch, TouchableWithoutFeedback } from 'react-native';
import { Picker, Text, Button } from 'native-base';
import Dropdown from 'react-native-dropdown-android';

import { Actions, ActionConst } from 'react-native-router-flux';

import ProfileComponent from './ProfileComponent';

export default class SettingsComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const selectedTab = Platform.OS === 'ios' ? 'settings' : 2;

    return (
      <View style={styles.fillContainer}>
        <ProfileComponent user={this.props.user} style={styles.profileContainer} />
        <ScrollView style={styles.settingsContainer}>
          <View style={styles.customListItemRight}>
            <Text style={styles.customListItemText}>Notifications</Text>
            <Switch onValueChange={this.props.onChangeNotification}
              value={this.props.notificationStats} />
          </View>
          <TouchableWithoutFeedback onPress={() => Actions.onboardingView({ navigateToNext: () => Actions.pop() })} underlayColor="#E5FEFF">
            <View style={styles.customListItemRight}>
              <Text style={styles.customListItemText}>View Tutorial</Text>
            </View>
          </TouchableWithoutFeedback>
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


// GENDER CURRENTLY NOT SUPPORTED 
// <View style={styles.customListItemRight}>
//   <Text style={styles.customListItemText}>Gender</Text>
//   { Platform.OS === 'ios' ?
//     <Picker
//       style={styles.picker}
//       iosHeader="Select gender"
//       mode="dropdown"
//       selectedValue={this.state.selectedGender}
//       onValueChange={this.onValueChange}>
//       <Picker.Item label="Male" value="male" />
//       <Picker.Item label="Female" value="female" />
//       <Picker.Item label="Other" value="other" />
//     </Picker>
//     :
//     <Dropdown
//     style={{ height: 20, width: 200}}
//     values={['Male', 'Female', 'Other']}
//     selected={this.state.selectedGenderIndex}
//     onChange={(data) => { this.setState({selectedGenderIndex: data.selected}) }}
//     />
//     }
// </View>