import React, { Component, PropTypes } from 'react';

// React Native Components
import {
    TouchableHighlight, Text
} from 'react-native';

// Native Base Components
import { Title } from 'native-base';

// Views
import { ChatListView } from '../views/chat-list-view';
import { ChatView } from '../views/chat-view.js';
import { ContactListView } from '../views/contact-list-view';
import { CreateChatView } from '../views/create-chat-view';
import { CreateSOSChatView } from '../views/create-sos-chat-view';
import { LandingView } from '../views/landing-view';
import { OnboardingView } from '../views/onboarding-view';
import { ProfileView } from '../views/profile-view';
import { SettingsView } from '../views/settings-view';


export var SceneRenderer = (route, navigator) => {
    _navigator = navigator;
    switch (route.index) {
        case 'home':
            return (<ChatListView
                navigator={navigator}
                title="Chat List View"
                />);
        case 'chat-list-view':
            return (<ChatListView
                navigator={navigator}
                title="Chat List View"
                />);
        case 'chat-view':
            return (<ChatView
                navigator={navigator}
                title="chat-view"
                />)
        case 'contact-list-view':
            return (<ContactListView
                navigator={navigator}
                title="contact-list-view"
                />)
        case 'create-chat-view':
            return (<CreateChatView
                navigator={navigator}
                title="create-chat-view"
                />)
        case 'create-sos-chat-view':
            return (<CreateSOSChatView
                navigator={navigator}
                title="create-sos-chat-view"
                />)
        case 'landing-view':
            return (<LandingView
                navigator={navigator}
                title="landing-view"
                />)
        case 'onboarding-view':
            return (<OnboardingView
                navigator={navigator}
                title="onboarding-view"
                />)
        case 'profile-view':
            return (<ProfileView
                navigator={navigator}
                title="profile-view"
                />)
        case 'settings-view':
            return (<SettingsView
                navigator={navigator}
                title="settings-view"
                />)
        default:
            return (<ChatListView
                navigator={navigator}
                title="Chat List View"
                />);
    }
};