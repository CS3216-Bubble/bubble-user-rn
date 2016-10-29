import React, { Component, PropTypes } from 'react';
import { Image, Text, View, TouchableHighlight, ScrollView, RefreshControl, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';
import { Styles } from '../styles/Styles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import moment from 'moment';

import ChatCardComponent from './ChatCardComponent';

export class CategoryListComponent extends Component {
    static propTypes = {
      selectedCategory: PropTypes.string,
    }

    updateList = (data) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ roomList: data, refreshing: false });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          roomList: [],
          refreshing: false,
          selectedCategory: props.selectedCategory ? props.selectedCategory : '',
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

    updateSelectedCategory = (category) => {
       Actions.refresh({selectedCategory: category});
       this.setState({selectedCategory: category});
    }

    render() {
        var userId = this.props.socket.id;

        var chatRooms = this.state.roomList.slice();

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

        return (
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)} />}>
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
    socket: state.socket
  }
;}
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(CategoryListComponent);

