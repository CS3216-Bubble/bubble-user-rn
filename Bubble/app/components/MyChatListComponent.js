import React, { Component, PropTypes } from 'react';
import { Image, Text, View, TouchableHighlight, ScrollView, RefreshControl, Alert, LayoutAnimation, UIManager, Platform, TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';

import { Styles } from '../styles/Styles';

import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import moment from 'moment';

import MyChatCardComponent from './MyChatCardComponent';
import ChatPlaceholderComponent from './ChatPlaceholderComponent';

import { myRooms } from '../actions/Actions';
import roomByTypeLastActive from '../utils/sort';

var _ = require('lodash');


export class MyChatListComponent extends Component {
    static propTypes = {
        onCreateChatPressed: PropTypes.func.isRequired,
        searchTerm: PropTypes.string,
        showCategoriesOnCard: PropTypes.bool,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            showCategoriesOnCard: props.showCategoriesOnCard ? props.showCategoriesOnCard : true,
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    onRefresh() {
        this.props.fetchMyRooms(this.props.socket);
    }

    componentDidMount() {
        this.props.fetchMyRooms(this.props.socket);
    }

    render() {

        const bubbleId = this.props.bubbleId;
        var chatRooms = this.props.myRooms.slice();
        const refreshing = this.props.refreshing;

        chatRooms.sort(roomByTypeLastActive);

        // Create list of chats to show
        var myChatsToShow = chatRooms.map(function (chatId) {
            const chat = this.props.rooms.filter(
                cc => cc.roomId == chatId
            )[0]

            // console.log("SHOW MAH CHATS YO", chat);

            const chatContainsSearchTerm =
                (chat.roomName.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1 ||
                    chat.roomDescription.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1);

            if (chatContainsSearchTerm) {
                // Create chat card
                return (
                    <MyChatCardComponent key={chat.roomId + '-open'} chat={chat} showCategoriesOnCard={this.state.showCategoriesOnCard} />
                );
            }
        }, this);

        const disconnected = (
            <View style={{ backgroundColor: '#e74c3c', padding: 10, height: 40 }}>
                <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Disconnected</Text>
            </View>
        );

        // If no search results found
        if (myChatsToShow.length == 0 && this.props.searchTerm != '') {
            return (
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh.bind(this)} />}>
                    {bubbleId ? null : disconnected}
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No results found for {this.props.searchTerm}.</Text>
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        style={{ marginTop: -19 }} />}
                    >
                    {bubbleId ? null : disconnected}
                    {myChatsToShow.length == 0 ?
                        <ChatPlaceholderComponent style={{ flex: 1 }} onCreateChatPressed={this.props.onCreateChatPressed} />
                        : myChatsToShow}
                </ScrollView>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        socket: state.socket,
        bubbleId: state.bubbleId,
        rooms: Object.values(state.rooms.data),
        myRooms: state.myRooms.data,
        refreshing: state.myRooms.refreshing,
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchMyRooms: (socket) => dispatch(myRooms(socket)),
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(MyChatListComponent);
