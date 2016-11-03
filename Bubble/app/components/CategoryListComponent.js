import React, { Component, PropTypes } from 'react';
import { Image, Text, View, TouchableHighlight, ScrollView, RefreshControl, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';
import { Styles } from '../styles/Styles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import moment from 'moment';

import ChatCardComponent from './ChatCardComponent';

import { listRooms } from '../actions/Actions';

export class CategoryListComponent extends Component {
    static propTypes = {
      selectedCategory: PropTypes.string,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          selectedCategory: props.selectedCategory ? props.selectedCategory : '',
        };

         if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    _onRefresh() {
        this.props.listRooms(this.props.socket);
    }

    updateSelectedCategory = (category) => {
       Actions.refresh({selectedCategory: category});
       this.setState({selectedCategory: category});
    }

    render() {
        var userId = this.props.socket.id;

        var chatRooms = this.props.rooms.slice();
        const refreshing = this.props.refreshing;

        chatRooms.sort(function(a, b) {
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
        const chatsToShow = chatRooms.map(function(chat) {
          const chatContainsSelectedCategory =
              (this.state.selectedCategory === '' ||
              chat.categories.indexOf(this.state.selectedCategory) > -1);

          if (chatContainsSelectedCategory) {
              // Create chat card
              return (
                  <ChatCardComponent key={chat.roomId} chat={chat} showCategoriesOnCard={true} />
              );
          }
        }, this);

        const disconnected = (
          <View style={{backgroundColor: '#e74c3c', padding: 10, height: 40}}>
            <Text style={{textAlign: 'center', color: '#FFFFFF'}}>Disconnected</Text>
          </View>
        );

        return (
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh.bind(this)} />}>
              { userId ? null : disconnected }
              {chatsToShow.length == 0 ?
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No chats found for {this.props.selectedCategory}.</Text>
                </View>
                : chatsToShow}
          </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    rooms: Object.values(state.rooms.data),
    refreshing: state.rooms.refreshing,
  }
;}

const mapDispatchToProps = (dispatch) => {
  return {
    listRooms: (socket) => dispatch(listRooms(socket)),
  };
};

export default connectRedux(mapStateToProps, mapDispatchToProps)(CategoryListComponent);
