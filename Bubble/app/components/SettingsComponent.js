import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

export default class SettingsComponent extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text>Settings page</Text>
            </View>
        );
    }
}
