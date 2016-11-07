import React, { Component, PropTypes } from 'react';
import {
    Image,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    RefreshControl,
    Alert,
    LayoutAnimation,
    UIManager,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';

import { Styles } from '../styles/Styles';

import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import moment from 'moment';

import ChatCardComponent from './ChatCardComponent';
import ChatPlaceholderComponent from './ChatPlaceholderComponent';

import { listRooms } from '../actions/Actions';
import roomByTypeLastActive from '../utils/sort';

export class ChatListComponent extends Component {
    static propTypes = {
        onCreateChatPressed: PropTypes.func.isRequired,
        searchTerm: PropTypes.string,
        showCategoriesOnCard: PropTypes.bool
    }


    constructor(props, context) {
        super(props, context);
        this.state = {
            showCategoriesOnCard: props.showCategoriesOnCard
                ? props.showCategoriesOnCard
                : true
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    onRefresh() {
        this.props.listRooms(this.props.socket);
    }

    componentDidMount() {
        this.props.listRooms(this.props.socket);
    }

    componentWillUnmount() {
        // console.log ("I AM UNMOUNTING!!! [CHAT LIST COMPONENT]");
    }

    render() {
        const bubbleId = this.props.bubbleId;
        // const chatRooms = this.props.rooms.slice();
        const chatRooms = this.props.rooms;
        const refreshing = this.props.refreshing;
        

        chatRooms.sort(roomByTypeLastActive);

        // console.log("rendering...\n");
        // Create list of chats to show
        var chatsToShow = chatRooms.map(function (chat) {

            const chatContainsSearchTerm = (chat.roomName.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1 || chat.roomDescription.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1);

            if (chatContainsSearchTerm) {

                // console.log("THIS IS CHAT CARD: " + chat.roomName);

                // Create chat card
                return (<ChatCardComponent
                    key={chat.roomId+'-list'}
                    chat={chat}
                    showCategoriesOnCard={this.state.showCategoriesOnCard} />);
            }
        }, this);

        const disconnected = (
            <View
                style={{
                    backgroundColor: '#e74c3c',
                    padding: 10,
                    height: 40
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#FFFFFF'
                    }}>Disconnected</Text>
            </View>
        );

        // If no search results found
        if (chatsToShow.length == 0 && this.props.searchTerm != '') {
            return (
                <ScrollView
                    style={{
                        flex: 1
                    }}
                    refreshControl={<RefreshControl refreshing={refreshing}
                        onRefresh={this.onRefresh.bind(this)} />}>
                    {bubbleId
                        ? null
                        : disconnected}
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text>No results found for {this.props.searchTerm}.</Text>
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView
                    style={{
                        flex: 1
                    }}
                    refreshControl={<RefreshControl refreshing={refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        style={{ marginTop: -19 }} />}>
                    {bubbleId
                        ? null
                        : disconnected}
                    {chatsToShow.length == 0
                        ? <ChatPlaceholderComponent
                            style={{
                                flex: 1
                            }}
                            onCreateChatPressed={this.props.onCreateChatPressed} />
                        : chatsToShow}
                </ScrollView>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
      socket: state.socket,
      bubbleId: state.bubbleId,
      rooms: Object.values(state.rooms.data),
      refreshing: state.rooms.refreshing,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
      listRooms: (socket) => dispatch(listRooms(socket)),
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatListComponent);
