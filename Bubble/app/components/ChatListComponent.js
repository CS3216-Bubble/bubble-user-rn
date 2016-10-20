import React, { Component, PropTypes } from 'react';
import { Image, Text, View, TouchableHighlight, ScrollView, RefreshControl } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';
import { ChatListItemComponent } from './ChatListItemComponent';
import { Styles } from '../styles/Styles';
import { Actions } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';

export class ChatListComponent extends Component {

    // static propTypes = {
    //     roomList: PropTypes.array.isRequired,
    // }

    updateList = (data) => {
        this.setState({ roomList: data, refreshing: false });
    }

    constructor(props, context) {
        super(props, context);
        this.state = { roomList: [], refreshing: false };
        this.updateList = this.updateList.bind(this);
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

    render() {
        console.log(this.state);
        // [Stub] Payload and Action to join room / enter a specific chat
        var roomId = "123";
        var userId = this.props.socket.id;
        const joinRoom = () => Actions.chatView({ roomId: roomId, user: userId });

        // [Stub] Payload for populating Chat List
        var chatRoom1 = {
            roomId: "01234",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        var chatRoom2 = {
            roomId: "26423",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        var chatRoom3 = {
            roomId: "12315",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        var chatRoom4 = {
            roomId: "02657",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        var chatRoom5 = {
            roomId: "02799",
            roomName: "I love my life.",
            roomType: 0,
            userLimit: 42,
            roomDescription: "Best ever! Love it",
            categories: ["Family", "School", "Work"],
            numberOfUsers: 7,
            lastActive: new Date().setMonth(8)
        }

        // [Stub] Chat List
        // var chatRooms = [chatRoom1, chatRoom2, chatRoom3, chatRoom4, chatRoom5];
        // this.state.chatRooms = chatRooms;

        // var chatRooms = this.props.roomList;

        var chatRooms = this.state.roomList;

        var listChats = [];
        for (var chatCount = 0; chatCount < chatRooms.length; ++chatCount) {
            var chat = chatRooms[chatCount];

            var listCategories = [];
            for (var catCount = 0; catCount < chat.categories.length; ++catCount) {
                var category = chat.categories[catCount];

                listCategories.push(
                    <Button key={category} transparent textStyle={{
                        color: '#87838B', fontSize: 14,
                        fontWeight: '500'
                    }}>
                        {category}
                    </Button>
                );
            }

            const chatProps = { roomId: chatRooms[chatCount].roomId };

            // <TouchableHighlight style={Styles.imageContainer}>
            //     <Image style={Styles.image} source={{ uri: 'https://lh3.googleusercontent.com/-dWk17lP4LYM/AAAAAAAAAAI/AAAAAAAAAAA/k2_ZU1cJ8lM/photo.jpg' }} />
            // </TouchableHighlight>
            // <Text>
            //     Snappy Koala
            // </Text>
            // <CardItem>
            //     <View style={{ flex: 1, flexDirection: 'row' }}>
            //         <View style={{ flex: 1, flexDirection: 'column' }}>
            //         </View>
            //     </View>
            // </CardItem>

            var moment = require('moment');

            console.log(moment(chat.lastActive));
            var chatCard = (

                <Card key={chat.roomId} style={Styles.card}>
                
                    <CardItem cardBody button onPress={() => Actions.chatView(chatProps)}>
                        <Text style={Styles.title} ellipsizeMode='middle' numberOfLines={1}>
                            {chat.roomName}
                        </Text>
                        <Text style={Styles.description}>
                            {chat.roomDescription}
                        </Text>
                        <View style={Styles.categories}>
                            {listCategories}
                        </View>
                        <Text note style={{ textAlign: 'right' }} >
                            {moment.duration(moment().diff(moment(chat.lastActive))).humanize()} ago
                        </Text>
                    </CardItem>

                    <CardItem header>
                        <Text>{chat.numUsers} of {chat.userLimit} users</Text>
                    </CardItem>

                </Card>

            );

            listChats.push(chatCard);
            // listChats.push(<ChatListItemComponent key={chat.roomId} listCategories={listCategories}
            //     chat={chat} />);
        }



        if (chatRooms.length == 0) {
            return (
                <ScrollView contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>
                    <Image style={Styles.placeholderImage} source={{ uri: 'http://www.icura.dk/images/icons/grey/chat.png' }} />
                    <Text style={Styles.placeholder}> No ongoing chats yet.{'\n'}Create one now! </Text>
                </ScrollView>
            );

        } else {
            return (
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}
                    style={{ flex: 1 }}>
                    {listChats}
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