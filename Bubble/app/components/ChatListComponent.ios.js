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
import { setClaimToken } from '../actions/Actions';

export class ChatListComponent extends Component {
    static propTypes = {
        onCreateChatPressed: PropTypes.func.isRequired,
        searchTerm: PropTypes.string,
        showCategoriesOnCard: PropTypes.bool
    }

    updateList = (data) => {
        this.setState({ roomList: data, refreshing: false });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            roomList: [],
            refreshing: false,
            showCategoriesOnCard: props.showCategoriesOnCard
                ? props.showCategoriesOnCard
                : true
        };
        this.updateList = this.updateList.bind(this);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.props.socket.emit("list_rooms", { user: this.props.socket.id });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 5000);
    }

    componentDidMount() {
        console.log("MOUNTED");
        // > View Specific Listeners
        this.props.socket.on('list_rooms', this.updateList);
        // this.props.socket.connect();
        console.log(this.props.claimToken);
        this.props.socket.emit("list_rooms", { user: this.props.socket.id });
    }

    componentWillUnmount() {
        this.props.socket.removeListener('list_rooms', this.updateList);
        this.props.socket.removeListener('set_claim_token', (data) => {console.log(data)});
    }

    componentWillReceiveProps(props) {
        // this.props.socket.connect();
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

            const chatContainsSearchTerm = (chat.roomName.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1 || chat.roomDescription.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1);

            if (chatContainsSearchTerm) {
                // Create chat card
                return (<ChatCardComponent
                    key={chat.roomId}
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
                    refreshControl={< RefreshControl refreshing={
                        this.state.refreshing
                    }
                        onRefresh={
                            this
                                ._onRefresh
                                .bind(this)
                        } />}
                    style={{
                        backgroundColor: 'red'
                    }}>
                    {userId
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
                    refreshControl={< RefreshControl refreshing={
                        this.state.refreshing
                    }
                        onRefresh={
                            this
                                ._onRefresh
                                .bind(this)
                        }
                        style={{ marginTop: -19 }} />}>
                    {userId
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
    return { socket: state.socket, claimToken: state.claimToken };
}
const mapDispatchToProps = (dispatch) => {
    return {
        // assignToken: (token) => { dispatch(setClaimToken(token)) }
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatListComponent);
