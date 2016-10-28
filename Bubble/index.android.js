import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Scene, Router, Actions, Route, Schema, Animations, Modal } from 'react-native-router-flux';

// Views
import ModalView from './app/views/ModalView';
import MainView from './app/views/MainView';
import ChatView from './app/views/ChatView';
import ChatInfoView from './app/views/ChatInfoView';
import ChatFormView from './app/views/ChatFormView';
import ChatLoadingView from './app/views/ChatLoadingView';
import CategoryListView from './app/views/CategoryListView';
import ContactListView from './app/views/ContactListView';
import ProfileFormView from './app/views/ProfileFormView';
import LandingView from './app/views/LandingView';
import OnboardingView from './app/views/OnboardingView';

import { Provider } from 'react-redux';
import { connect as connectRedux } from 'react-redux';
import { connect, listRooms } from './app/actions/BubbleSocketActions';
import Store from './app/stores/Store';

// Styles
import { Styles } from './app/styles/Styles';

// console.ignoredYellowBox = ['Warning: setState(...)'];

export default class Bubble extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Router>

                    <Scene key="modal" component={Modal} >
                        <Scene key="root" hideNavBar={true}>
                            <Scene key="landingView" component={LandingView} title="Welcome to Bubble" initial={true}/>
                            <Scene key="main" component={MainView} title="Main" />
                            <Scene key="chatView" component={ChatView} title="Chat" />
                            <Scene key="chatInfoView" component={ChatInfoView} title="Chat Info" />
                            <Scene key="chatFormView" component={ChatFormView} title="Create Chat" />
                            <Scene key="chatLoadingView" component={ChatLoadingView} title="Chat Loading" />
                            <Scene key="categoryListView" component={CategoryListView} title="Category List" />
                            <Scene key="contactListView" component={ContactListView} title="Useful Hotlines" />
                            <Scene key="profileForm" component={ProfileFormView} title="Edit Profile" />
                            <Scene key="onboardingView" component={OnboardingView} title="Getting Started" />
                        </Scene>
                        <Scene key="modalView" component={ModalView} />
                    </Scene>
                </Router>
            </Provider>

        );
    }
}

AppRegistry.registerComponent('Bubble', () => Bubble);
