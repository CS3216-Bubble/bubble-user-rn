import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, Text, View, TouchableHighlight, ScrollView, RefreshControl, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';
import ChatCardComponent from './ChatCardComponent';
import { Styles } from '../styles/Styles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import moment from 'moment';

import Globals from '../globals';

export class ChatListComponent extends Component {
    static propTypes = {
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

        chatRooms.sort(function(a, b) {
            return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        });

        // Create list of chats to show
        const chatsToShow = chatRooms.map(function(chat) {

          const chatContainsSearchTerm =
              (chat.roomName.indexOf(this.props.searchTerm) > -1 ||
               chat.roomDescription.indexOf(this.props.searchTerm) > -1);

          if (chatContainsSearchTerm) {
              // Create chat card
              return (
                <ChatCardComponent key={chat.roomId} chat={chat} showCategoriesOnCard={this.state.showCategoriesOnCard}/>
              );
          }
        }, this);

        const categoryButtons = Globals.CATEGORIES.map(function(name, index) {
          return (
             <Button rounded info key={index} onPress={() => Actions.categoryDetailView({selectedCategory: name})}>
                <Text style={{fontSize: 10, color: 'white', fontWeight: "600"}} >{name}</Text>
            </Button>
          );
        }, this);

        const categoryFilter = (
          <View style={styles.categoryButtonContainer}>{ categoryButtons }</View>
        );

        if (chatsToShow.length == 0) {
            return (
                null
            );
        } else {
            return (
                <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>
                    { this.props.searchTerm === '' ? categoryFilter : null }
                    { chatsToShow }
                </ScrollView>
            );
        }
    }
}

var styles = StyleSheet.create({
    categoryButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    categoryButton: {
      marginBottom: 10,
    }
});

function getList(state) {
    let socket = state.socketHandler.socket;

    return {
        socket: socket
    }
}

export default connectRedux(getList)(ChatListComponent);
