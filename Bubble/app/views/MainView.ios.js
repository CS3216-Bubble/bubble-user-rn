import React, { Component } from 'react';
import { Platform, StyleSheet, TabBarIOS, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect as connectRedux } from 'react-redux';

import ChatListView from './ChatListView';
import SettingsView from './SettingsView';

export default class MainView extends Component {
    state = {
        iconSize: 25,
        refresh: false,
        selectedTab: 'all',
    };

    _renderContent = () => {
        switch (this.state.selectedTab) {
            case 'all':
                return (
                    <ChatListView key="all" title="All Chats" showOpenChatsOnly={false} />
                );
            case 'open':
                return (
                    <ChatListView key="open" title="Open Chats" showOpenChatsOnly={true} />
                );
            case 'settings':
                return (
                    <SettingsView />
                );
        }
    };

    componentWillReceiveProps(props) {
        // console.log("MAINVIEW IOS RECEIVES PROPS", props);
    }

    render() {
        return (

            <TabBarIOS>
                <Icon.TabBarItemIOS
                    title="All"
                    iconName="comments"
                    iconSize={this.state.iconSize}
                    selected={this.state.selectedTab === 'all'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'all',
                        });
                    } }>
                    {this._renderContent()}
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Open"
                    iconName="commenting"
                    iconSize={this.state.iconSize}
                    selected={this.state.selectedTab === 'open'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'open',
                        });
                    } }>
                    {this._renderContent()}
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Settings"
                    iconName="cog"
                    iconSize={this.state.iconSize}
                    selected={this.state.selectedTab === 'settings'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'settings',
                        });
                    } }>
                    {this._renderContent()}
                </Icon.TabBarItemIOS>
            </TabBarIOS>

        );
    }
}

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

// OLD

    //     render() {
    //         return (
    //             <TabBarIOS>
    //                 <Icon.TabBarItemIOS
    //                     title="Chats"
    //                     iconName="ios-chatboxes"
    //                     selected={this.state.selectedTab === 'chats'}
    //                     onPress={() => {
    //                         this.setState({
    //                             selectedTab: 'chats',
    //                         });
    //                     } }>
    //                     {this._renderContent()}
    //                 </Icon.TabBarItemIOS>
    //                 <Icon.TabBarItemIOS
    //                     title="Profile"
    //                     iconName="ios-person-outline"
    //                     selected={this.state.selectedTab === 'profile'}
    //                     onPress={() => {
    //                         this.setState({
    //                             selectedTab: 'profile',
    //                         });
    //                     } }>
    //                     {this._renderContent()}
    //                 </Icon.TabBarItemIOS>
    //                 <Icon.TabBarItemIOS
    //                     title="Settings"
    //                     iconName="ios-settings"
    //                     selected={this.state.selectedTab === 'settings'}
    //                     onPress={() => {
    //                         this.setState({
    //                             selectedTab: 'settings',
    //                         });
    //                     } }>
    //                     {this._renderContent()}
    //                 </Icon.TabBarItemIOS>
    //             </TabBarIOS>
    //         );
    //     }
    //   };
