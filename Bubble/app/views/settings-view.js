/**
 * Settings View
 */

import React, { Component, PropTypes } from 'react';

// React Native Components
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Navigator,
    NavigatorIOS,
    NavigationBarRouteMapper,
    TouchableHighlight,
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

// Styles
import { Styles } from '../styles/common-styles';

// Views
import { ProfileView } from './profile-view';


export class SettingsView extends Component {

    routeMapper;

    constructor(props, context) {
        var nextRoute = {
            index: 'profile-view',
            title: 'Profile View',
            leftButton: "BACK",
            rightButton: "",
        };

        super(props, context);
        this.onForward = this.onForward.bind(this);
        this.onBackward = this.onBackward.bind(this);

        // Describe the Android Navigation Bar
        this.routeMapper = {

            LeftButton: function (route, navigator, index, navState) {

                // var previousRoute = navState.routeStack[index - 1];
                return (
                    <TouchableHighlight onPress={() => { _navigator.pop() } }>
                        <Text style={{ color: 'white', marginTop: 17, marginLeft: 10, textAlign: 'center' }}>
                            BACK
                </Text>
                    </TouchableHighlight>
                );
            },
            Title: function (route, navigator, index, navState) {
                return (<Title style={{ color: 'white', marginTop: 15, textAlign: 'center' }}>
                    Settings View
                </Title>);
            },
            RightButton: function (route, navigator, index, navState) {

                return (
                    <TouchableHighlight onPress={() => {
                        _navigator.push({
                            index: 'profile-view',
                            title: 'Profile View',
                            leftButton: "BACK",
                            rightButton: "",
                        })
                    } }>
                        <Text style={{ color: 'white', marginTop: 17, marginRight: 10, textAlign: 'center' }}>
                            PROFILE
                        </Text>
                    </TouchableHighlight>
                );
            }
        };
    }

    // Enter logic: Push a route into the navigator
    onForward(nextRoute) {
        this.props.navigator.push(nextRoute);
    }

    // Return logic: Pop a route from the navigator
    onBackward() {
        this.props.navigator.pop();
    }

    // Android Layout
    androidScene() {
        var nextRoute = {
            index: 'profile-view',
            title: 'Profile View',
            leftButton: "BACK",
            rightButton: "",
        };

        return (
            <Container>

                <Header>
                </Header>

                <Content>
                    <View>
                        <Text style={Styles.welcome}>Settings View Android</Text>
                        <Text style={Styles.instructions}>To get started, edit this js.</Text>
                        <Text style={Styles.instructions}>
                            Double tap R on your keyboard to reload,{'\n'}
                            Shake or press menu button for dev menu</Text>
                    </View>

                    <TouchableHighlight onPress={() => { _navigator.push(nextRoute) } }>
                        <Text style={{ marginTop: 200, alignSelf: 'center' }}>
                            Go Profile!
                        </Text>
                    </TouchableHighlight>

                </Content>

            </Container>
        );
    }

    // iOS Layout
    iosScene() {
        const nextRoute = {
            component: ProfileView,
            title: 'Profile View',
        };

        return (<Container>

            <Content>

                <View style={{ marginTop: 60 }}>
                    <Text style={Styles.welcome}>Settings View IOS</Text>
                    <Text style={Styles.instructions}>To get started, edit this js.</Text>
                    <Text style={Styles.instructions}>
                        Press Cmd+R to reload,{'\n'}
                        Cmd+D or shake for dev menu
                            </Text>
                </View>

                <TouchableHighlight onPress={() => { this.onForward(nextRoute) } }>
                    <Text style={{ marginTop: 200, alignSelf: 'center' }}>
                        Go Profile!
                    </Text>
                </TouchableHighlight>
            </Content>

            <Footer>
            </Footer>

        </Container>);
    }

    render() {

        // IOS 
        if (Platform.OS === 'ios') {
            return this.iosScene();
        }

        // ANDROID
        else {
            var current = {
                index: 'settings-view',
                title: 'Settings View',
                leftButton: "",
                rightButton: "PROFILE",
            };
            return (
                <Navigator
                    initialRoute={current}
                    renderScene={this.androidScene}
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={this.routeMapper} />
                    }
                    />);
        }
    }
}