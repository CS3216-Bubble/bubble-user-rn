import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Scene, Router, Actions, Route, Schema, Animations, Modal } from 'react-native-router-flux';
import { Styles } from './app/styles/Styles';
import { Provider } from 'react-redux';
import Store from './app/store/Store';
import ModalView from './app/views/ModalView';
import MainView from './app/views/MainView';
import ChatView from './app/views/ChatView';
import ChatInfoView from './app/views/ChatInfoView';
import ChatFormView from './app/views/ChatFormView';
import ChatLoadingView from './app/views/ChatLoadingView';
import CategoryListView from './app/views/CategoryListView';
import LandingView from './app/views/LandingView';
import OnboardingView from './app/views/OnboardingView';
import Root from './app/Root';


export default class Bubble extends Component {

    render() {
        return (
            <Provider store={Store}>
                <Root>
                <Router>
                    <Scene key="modal" component={Modal} >
                        <Scene key="root" hideNavBar={true}>
                            <Scene key="landingView" component={LandingView} title="Welcome to Bubble" initial={true} />
                            <Scene key="onboardingView" component={OnboardingView} title="Getting Started" />
                            <Scene key="main" component={MainView} title="Main" />
                            <Scene key="chatView" component={ChatView} title="Chat" />
                            <Scene key="chatInfoView" component={ChatInfoView} title="Chat Info" />
                            <Scene key="chatFormView" component={ChatFormView} title="Create Chat" />
                            <Scene key="chatLoadingView" component={ChatLoadingView} title="Chat Loading" />
                            <Scene key="categoryListView" component={CategoryListView} title="Category List" />
                        </Scene>
                        <Scene key="modalView" component={ModalView} />
                    </Scene>
                </Router>
                </Root>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Bubble', () => Bubble);
