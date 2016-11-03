import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
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

import Globals from '../globals';

import { listRooms } from '../actions/Actions';

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

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

    }

    _onRefresh() {
        this.props.listRooms(this.props.socket);
    }

    componentWillMount() {
        this.props.listRooms(this.props.socket);
    }

    render() {
        const userId = this.props.socket.id;
        const chatRooms = this.props.roomList.slice();
        const refreshing = this.props.refreshing;

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

        const categoryButtons = Globals
            .CATEGORIES
            .map(function (name, index) {
                return (
                    <Button
                        style={{
                            backgroundColor: Globals.CATEGORY_COLOURS[name]
                        }}
                        key={index}
                        onPress={() => Actions.categoryListView({ selectedCategory: name })}>
                        <Text
                            style={{
                                fontSize: 10,
                                color: 'white',
                                fontWeight: "600"
                            }}>{name}</Text>
                    </Button>
                );
            }, this);

        const categoryFilter = (
            <View style={styles.categoryButtonContainer}>{categoryButtons}</View>
        );

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

        var content = null;

        // SOMETHING TO SHOW
        if (chatsToShow.length > 0) {
            content = chatsToShow;
        }

        // NOTHING TO SHOW

        // because disconnected 
        else if (this.props.connection == "DISCONNECTED") {
            content = (<View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text>Chat list cannot be loaded as you are offline.</Text>
            </View>);
        }

        // because really nothing
        else if (this.props.connection == "CONNECTED" && !this.props.refreshing) {
            content = (<ChatPlaceholderComponent
                style={{
                    flex: 1
                }}
                onCreateChatPressed={this.props.onCreateChatPressed} />);
        }

        // because no search results
        else if (this.props.searchTerm != '') {
            content = (<View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text>No results found for {this.props.searchTerm}.</Text>
            </View>);
        }

        return (
            <View style={{
                flex: 1
            }}>
                {this.props.searchTerm == '' ? categoryFilter : null}
                <ScrollView
                    style={{
                        flex: 1
                    }}
                    refreshControl={< RefreshControl refreshing={refreshing}
                        onRefresh={
                            this
                                ._onRefresh
                                .bind(this)
                        } />}>
                    {userId
                        ? null
                        : disconnected}
                    {content}
                </ScrollView>
            </View>
        );
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
        marginBottom: 10
    }
});

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        roomList: state.roomList.data,
        refreshing: state.roomList.refreshing,
        connection: state.connection
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        listRooms: (socket) => dispatch(listRooms(socket)),
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatListComponent);