/**
 * Bubble Android
 * https://github.com/CS3216-Bubble
 */

import React, { Component } from 'react';

// React Native Components
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

// All Views
import { ChatListView } from './app/views/chat-list-view';
import { ChatView } from './app/views/chat-view.js';
import { ContactListView } from './app/views/contact-list-view';
import { CreateChatView } from './app/views/create-chat-view';
import { CreateSOSChatView } from './app/views/create-sos-chat-view';
import { LandingView } from './app/views/landing-view';
import { OnboardingView } from './app/views/onboarding-view';
import { ProfileView } from './app/views/profile-view';
import { SettingsView } from './app/views/settings-view';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default class Bubble extends Component {

    renderScene(route, navigator) {
        _navigator = navigator;
        switch (route.index) {
            case 'home':
                return (<ChatListView navigator={navigator} title="Chat List View" />);
            case 'chat-list-view':
                return (<ChatListView navigator={navigator} title="Chat List View" />);
            case 'chat-view':
                return (<ChatView navigator={navigator} title="chat-view" />)
            case 'contact-list-view':
                return (<ContactListView navigator={navigator} title="contact-list-view" />)
            case 'create-chat-view':
                return (<CreateChatView navigator={navigator} title="create-chat-view" />)
            case 'create-sos-chat-view':
                return (<CreateSOSChatView navigator={navigator} title="create-sos-chat-view" />)
            case 'landing-view':
                return (<LandingView navigator={navigator} title="landing-view" />)
            case 'onboarding-view':
                return (<OnboardingView navigator={navigator} title="onboarding-view" />)
            case 'profile-view':
                return (<ProfileView navigator={navigator} title="profile-view" />)
            case 'settings-view':
                return (<SettingsView navigator={navigator} title="settings-view" />)
            default:
                return (<ChatListView navigator={navigator} title="home" />);
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ index: 'home' }}
                renderScene={(route, navigator) => this.renderScene(route, navigator)} />
        );
    }
}

AppRegistry.registerComponent('Bubble', () => Bubble);


/*** Old code ***/

// <View style={styles.container}>
//   <Text style={styles.welcome}>
//     Welcome to React Native!
//   </Text>
//   <Text style={styles.instructions}>
//     To get started, edit index.android.js
//   </Text>
//   <Text style={styles.instructions}>
//     Double tap R on your keyboard to reload,{'\n'}
//     Shake or press menu button for dev menu
//   </Text>
// </View>