import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, ScrollView, View, Switch } from 'react-native';
import { Picker, Text, Button } from 'native-base';
import Dropdown from 'react-native-dropdown-android';

import ProfileComponent from './ProfileComponent';

export default class SettingsComponent extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        var selectedIndex = this.props.genderStats == "Male" ? 0 : this.props.genderStats == "Female" ? 1 : 2;
        this.state = { selectedIndex: selectedIndex };
    }

    render() {

        return (
            <View style={styles.fillContainer}>
                <ProfileComponent user={this.props.user} style={styles.profileContainer} />
                <ScrollView style={styles.settingsContainer}>
                    <View style={styles.customListItemRight}>
                        <Text style={styles.customListItemText}>Notifications</Text>
                        <Switch
                            onValueChange={this.props.onChangeNotification}
                            value={this.props.notificationStats} />
                    </View>
                    {Platform.OS === 'ios' ?
                        <View style={styles.customListItemRight}>
                            <Text style={styles.customListItemText}>Gender</Text>
                            <Picker
                                style={styles.picker}
                                iosHeader="Select gender"
                                mode="dropdown"
                                selectedValue={this.props.genderStats}
                                onValueChange={(data) => { this.props.onChangeGender(data); } }>
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                        :
                        null
                    }
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    fillContainer: {
        flex: 1,
    },
    profileContainer: {
        flex: 0.3,
    },
    settingsContainer: {
        flex: 1
    },
    customListItemRight: {
        flex: 0.7,
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

// Temporarily remove support for gender for android
// <View style={styles.customListItemRight}>
//     <Text style={styles.customListItemText}>Gender</Text>
//     {Platform.OS === 'ios' ?
//         <Picker
//             style={styles.picker}
//             iosHeader="Select gender"
//             mode="dropdown"
//             selectedValue={this.props.genderStats}
//             onValueChange={(data) => { this.props.onChangeGender(data); } }>
//             <Picker.Item label="Male" value="Male" />
//             <Picker.Item label="Female" value="Female" />
//             <Picker.Item label="Other" value="Other" />
//         </Picker>
//         :
//         <Dropdown
//             style={{ height: 20, width: 200 }}
//             values={['Male', 'Female', 'Other']}
//             selected={this.state.selectedIndex}
//             onChange={(data) => {
//                 console.log(data.value);
//                 this.setState({ selectedIndex: data.selected });
//                 this.props.onChangeGender(data.value);
//             } }
//             />
//     }
// </View>