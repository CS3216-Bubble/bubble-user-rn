import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Scene, Router, Actions, Route, Schema, Animations } from 'react-native-router-flux';

// Views
import MainView from './app/views/MainView';
import ChatView from './app/views/ChatView';
import ContactListView from './app/views/ContactListView';
import CreateChatView from './app/views/CreateChatView';
import CreateSOSChatView from './app/views/CreateSOSChatView';
import ProfileFormView from './app/views/ProfileFormView';
import LandingView from './app/views/LandingView';
import OnboardingView from './app/views/OnboardingView';

// Styles
import { Styles } from './app/styles/Styles';

export default class Bubble extends Component {

    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key="main" component={MainView} title="Main" initial={true} />
                    <Scene key="chatView" component={ChatView} title="Chat" />
                    <Scene key="contactListView" component={ContactListView} title="Useful Hotlines" />
                    <Scene key="createChatView" component={CreateChatView} title="Create New Chat" />
                    <Scene key="createSOSChatView" component={CreateSOSChatView} title="Talk to a Hero" />
                    <Scene key="profileForm" component={ProfileFormView} title="Edit Profile" />
                    <Scene key="landingView" component={LandingView} title="Welcome to Bubble" />
                    <Scene key="onboardingView" component={OnboardingView} title="Getting Started" />
                </Scene>
            </Router>
        );
    }
}

AppRegistry.registerComponent('Bubble', () => Bubble);
