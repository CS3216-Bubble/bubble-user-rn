/**
 * Chat List View
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
import { SettingsView } from './settings-view';
import { ProfileView } from './profile-view';

export class ChatListView extends Component {

    routeMapper;

    constructor(props, context) {
        super(props, context);

        this.nextRoute = {
            index: 'settings-view',
            title: 'Settings View',
            leftButton: "BACK",
            rightButton: "PROFILE",
        };

        // Describe the Android Navigation Bar
        this.routeMapper = {

            LeftButton: function (route, navigator, index, navState) {

                // var previousRoute = navState.routeStack[index - 1];
                // return (
                //     <TouchableHighlight onPress={() => { navigator.pop() } }>
                //         <Text style={{ color: 'white', marginTop: 17, marginLeft: 10, textAlign: 'center' }}>
                //             BACK
                // </Text>
                //     </TouchableHighlight>
                // );

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

        this.onForward = this.onForward.bind(this);
        this.onBackward = this.onBackward.bind(this);
        // this.routeMapper = this.routeMapper.bind(this);
        // this.nextRoute = this.nextRoute.bind(this);
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
            index: 'settings-view',
            title: 'Settings View',
            leftButton: "BACK",
            rightButton: "PROFILE",
        };

        const profileRoute = {
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
                        <Text style={Styles.welcome}>Chat List View Android</Text>
                        <Text style={Styles.instructions}>To get started, edit this js.</Text>
                        <Text style={Styles.instructions}>
                            Double tap R on your keyboard to reload,{'\n'}
                            Shake or press menu button for dev menu</Text>
                    </View>

                    <TouchableHighlight onPress={() => { _navigator.push(nextRoute) } }>
                        <Text style={{ marginTop: 200, alignSelf: 'center' }}>
                            Go Settings!
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => { _navigator.push(profileRoute) } }>
                        <Text style={{ marginTop: 10, alignSelf: 'center' }}>
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
            component: SettingsView,
            title: 'Settings View',
        };

        const profileRoute = {
            component: ProfileView,
            title: 'Profile View',
        };

        return (<Container>

            <Content>

                <View style={{ marginTop: 60 }}>
                    <Text style={Styles.welcome}>Chat List View IOS</Text>
                    <Text style={Styles.instructions}>To get started, edit this js.</Text>
                    <Text style={Styles.instructions}>
                        Press Cmd+R to reload,{'\n'}
                        Cmd+D or shake for dev menu
                            </Text>
                </View>

                <TouchableHighlight onPress={() => { this.onForward(nextRoute) } }>
                    <Text style={{ marginTop: 200, alignSelf: 'center' }}>
                        Go Settings!
                    </Text>
                </TouchableHighlight>


                <TouchableHighlight onPress={() => { this.onForward(profileRoute) } }>
                    <Text style={{ marginTop: 10, alignSelf: 'center' }}>
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
                index: 'chat-list-view',
                title: 'Chat List View',
                leftButton: "",
                rightButton: "SETTINGS",
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