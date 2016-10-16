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
    Navigator,
    TouchableHighlight
} from 'react-native';

// Native Base Components
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon,
    InputGroup,
    Input,
    Toolbar
} from 'native-base';

// Route Maps
import { SceneRenderer } from './app/routing/route-maps-android';

// Styles
import { Styles } from './app/styles/common-styles';

// Describe the Android Navigation Bar
var routeMapper = {

    LeftButton: function (route, navigator, index, navState) {

        // var previousRoute = navState.routeStack[index - 1];
        return null;
    },
    Title: function (route, navigator, index, navState) {
        return (<Title style={{ color: 'white', marginTop: 15, textAlign: 'center' }}>
            Chat List View
                </Title>);
    },
    RightButton: function (route, navigator, index, navState) {

        return (
            <TouchableHighlight onPress={() => {
                _navigator.push({
                    index: 'settings-view',
                    title: 'Settings View',
                    leftButton: "BACK",
                    rightButton: "PROFILE",
                })
            } }>
                <Text style={{ color: 'white', marginTop: 17, marginRight: 10, textAlign: 'center' }}>
                    SETTINGS
                        </Text>
            </TouchableHighlight>
        );
    }
};

export default class Bubble extends Component {

    render() {
        var current = {
            index: 'chat-list-view',
            title: 'Chat List View',
            leftButton: "",
            rightButton: "SETTINGS",
        };
        return (
            <Navigator
                initialRoute={current}
                renderScene={(route, navigator) => SceneRenderer(route, navigator)}
                />);
    }
}

AppRegistry.registerComponent('Bubble', () => Bubble);