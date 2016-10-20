import React, { Component } from 'react';
import { Text, View, RefreshControl, ScrollView } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

import ChatListComponent from '../components/ChatListComponent';

// import { connect, listRooms } from '../actions/BubbleSocketActions';
// import { connect as connectRedux } from 'react-redux';

export default class ChatListView extends Component {

    // updateList = (data) => {
    //     this.setState({ roomList: data });
    // }

    // constructor() {
    //     super();
    //     this.state = { refreshing: false };
    // }

    // componentDidMount() {

    //     // > View Specific Listeners
    //     this.props.socket.on('list_rooms', this.updateList);

    //     this.props.socket.connect();
    //     this.props.socket.emit("list_rooms", { user: "123" });

    //     // this.props.dispatch(connect());
    //     // this.props.dispatch(listRooms({ user: "123" }));
    // }

    // _onRefresh() {
    //     console.log("REFRESHING");
    //     setTimeout(() => {
    //         this.setState({
    //             refreshing: false,
    //         });
    //     }, 10000);
    // }

    render() {
        // [Stub] Payload and Action to join room / enter a specific chat
        var roomId = "123";
        var userId = "00007";
        const joinRoom = () => Actions.chatView({ roomId: roomId, user: userId, chat: { roomName: "Hello World" } });

        return (

            <Container>
                <Header>
                    <Title>Chats</Title>
                    <Button transparent>
                        <Text></Text>
                    </Button>
                    <Button transparent onPress={Actions.chatFormView}>
                        <Text>Create</Text>
                    </Button>
                </Header>
                <View style={{ flex: 1 }}>
                    <ChatListComponent />
                </View>
            </Container>

        );
    }
}

// function getList(state) {
//     // console.log(state);
//     // let socket = Object.keys(state.socketHandler);
//     let socket = state.socketHandler.socket;

//     return {
//         socket: socket
//     }

// }

// export default connectRedux(getList)(ChatListView);

// OLD
// <ChatListComponent roomList={this.state.roomList} />
