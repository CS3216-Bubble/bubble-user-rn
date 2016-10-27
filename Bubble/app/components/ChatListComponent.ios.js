import React, { Component, PropTypes } from 'react';
import { Image, Text, View, TouchableHighlight, ScrollView, RefreshControl, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';

import { Styles } from '../styles/Styles';

import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import moment from 'moment';

import ChatCardComponent from './ChatCardComponent';
import ChatPlaceholderComponent from './ChatPlaceholderComponent';

export class ChatListComponent extends Component {
    static propTypes = {
        onCreateChatPressed: PropTypes.func.isRequired,
        searchTerm: PropTypes.string,
        showOpenChatsOnly: PropTypes.bool,
        showCategoriesOnCard: PropTypes.bool,
    }

    updateList = (data) => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ roomList: data, refreshing: false });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            roomList: [],
            refreshing: false,
            showOpenChatsOnly: props.showOpenChatsOnly ? props.showOpenChatsOnly : false,
            showCategoriesOnCard: props.showCategoriesOnCard ? props.showCategoriesOnCard : true,
        };
        this.updateList = this.updateList.bind(this);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.props.socket.connect();
        this.props.socket.emit("list_rooms", { user: this.props.socket.id });
    }

    componentDidMount() {
        // > View Specific Listeners
        this.props.socket.on('list_rooms', this.updateList);
        this.props.socket.connect();
        this.props.socket.emit("list_rooms", { user: this.props.socket.id });
    }

    componentWillUnmount() {
        this.props.socket.removeListener('list_rooms', this.updateList);
    }

    componentWillReceiveProps(props) {
        // console.log("CHATLISTCOMPONENT RECEIVES PROPS", props);
        this.props.socket.connect();
        this.props.socket.emit("list_rooms", { user: this.props.socket.id });
    }

    render() {
        var userId = this.props.socket.id;

        var chatRooms = this.state.roomList.slice();

        chatRooms.sort(function (a, b) {
          // Sticky chat first
          if (a.roomType == 'HOT' && b.roomType != 'HOT') {
            return -1;
          } else if ((b.roomType == 'HOT' && a.roomType != 'HOT')) {
            return 1;
          } else {
            // Chat types are the same, sort by time
            return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
          }
        });

        // Create list of chats to show
        const chatsToShow = chatRooms.map(function (chat) {

            const chatContainsSearchTerm =
                (chat.roomName.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1 ||
                 chat.roomDescription.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1);

            if (chatContainsSearchTerm) {
                // Create chat card
                return (
                    <ChatCardComponent key={chat.roomId} chat={chat} showCategoriesOnCard={this.state.showCategoriesOnCard} />
                );
            }
        }, this);

        // If no search results found
        if (chatsToShow.length == 0 && this.props.searchTerm != '') {
            return (
              <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)} />}>
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Text>No results found for {this.props.searchTerm}.</Text>
                  </View>
              </ScrollView>
            );
        } else {
            return (
                <ScrollView
                  style={{ flex: 1 }}
                  refreshControl={<RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)} />}>
                    {chatsToShow.length == 0 ?
                      <ChatPlaceholderComponent style={{flex: 1}} onCreateChatPressed={this.props.onCreateChatPressed}/>
                      : chatsToShow}
                </ScrollView>
            );
        }
    }
}

function getList(state) {
    let socket = state.socketHandler.socket;

    return {
        socket: socket
    }
}

export default connectRedux(getList)(ChatListComponent);
