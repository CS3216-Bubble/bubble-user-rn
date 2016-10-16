/**
 * Bubble IOS
 * https://github.com/CS3216-Bubble
 */

import React, { Component } from 'react';

// React Native Components
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS
} from 'react-native';

// Styles
import { Styles } from './app/styles/common-styles';

// Views
import { ChatListView } from './app/views/chat-list-view';

export default class Bubble extends Component {

    render() {
        return (
            <NavigatorIOS
                ref='nav'
                style={Styles.wrapper}
                initialRoute={{
                    component: ChatListView,
                    title: 'Chat List View',
                    passProps: { title: 'Chat List View' },
                    leftButtonTitle: '',
                    rightButtonTitle: 'Settings',
                }}
                />
        );
    }
}

AppRegistry.registerComponent('Bubble', () => Bubble);