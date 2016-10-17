import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../styles/common-styles';

export default class OnboardingView extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text style={Styles.welcome}>
                    Onboarding View
        </Text>
                <Text style={Styles.instructions}>
                    To get started, edit this js.
        </Text>
                <Text style={Styles.instructions}>
                    For Android: {'\n'}
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
        </Text>
                <Text style={Styles.instructions}>
                    For iOS: {'\n'}
                    Press Cmd + R on your keyboard to reload,{'\n'}
                    Shake or press Cmd + R for dev menu
        </Text>
            </View>
        );
    }
}
