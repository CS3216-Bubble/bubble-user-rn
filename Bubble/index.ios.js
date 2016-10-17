/**
 * Bubble iOS
 * https://github.com/CS3216-Bubble
 */

// React
import React, {
    Component
} from 'react';

// React Native Components
import {
    AppRegistry, Navigator
} from 'react-native';

// Routing
import {
    Scene,
    Router,
    Actions,
    Route,
    Schema,
    Animations,
    TabBar
} from 'react-native-router-flux';

// Views
import { MainView } from './app/views/MainView';
import { ChatView } from './app/views/ChatView';
import { ContactListView } from './app/views/contact-list-view';
import { CreateChatView } from './app/views/create-chat-view';
import { CreateSOSChatView } from './app/views/create-sos-chat-view';
import { LandingView } from './app/views/landing-view';
import { OnboardingView } from './app/views/onboarding-view';

// Styles
import {
    Styles
} from './app/styles/common-styles';

export default class Bubble extends Component {

    render() {
        return (
            <Router hideNavBar={true}>
                <Scene key="root">
                    <Scene key="main" component={MainView} title="Main" initial={true} />
                    <Scene key="chatView" component={ChatView} title="Chat" />
                    <Scene key="contactListView" component={ContactListView} title="Useful Hotlines" />
                    <Scene key="createChatView" component={CreateChatView} title="Create New Chat" />
                    <Scene key="createSOSChatView" component={CreateSOSChatView} title="Talk to a Hero" />
                    <Scene key="landingView" component={LandingView} title="Welcome to Bubble" />
                    <Scene key="onboardingView" component={OnboardingView} title="Getting Started" />
                </Scene>
            </Router>
        );
    }
}

AppRegistry.registerComponent('Bubble', () => Bubble);
