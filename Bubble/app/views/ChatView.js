import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ChatComponent from '../components/ChatComponent';
import { connect as connectRedux } from 'react-redux';

export class ChatView extends Component {

    updateChat = (data) => {
        // console.log("I RECEIVED CHAT! UH_OH!", data);
        this.setState({ chat: data });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            chat: {
                roomId: "1",
                roomName: "1",
                roomType: "1",
                userLimit: 42,
                roomDescription: "1",
                categories: [],
                numUsers: 0,
                lastActive: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                messages: []
            }
        };
        this.updateChat = this.updateChat.bind(this);
        this.onSend = this.onSend.bind(this);
        this.exitRoom = this.exitRoom.bind(this);
    }

    componentDidMount() {

        // > View Specific Listeners
        this.props.socket.on('view_room', this.updateChat);

        // UPDATE LISTENER TO BE PLACED IN COMPONENT
        // this.props.socket.on('add_message', this.updateChat);

        this.props.socket.connect();
        this.props.socket.emit("join_room", { roomId: this.props.roomId, user: this.props.socket.id });
        this.props.socket.emit("view_room", { user: this.props.socket.id, roomId: this.props.roomId });
    }

    componentWillDismount() {
        this.updateChat = () => { };
    }

    onSend(message) {
        console.log(this.props);
        this.props.socket.emit("add_message", message);
    }

    exitRoom() {
        this.props.socket.emit("exit_room", { roomId: this.props.roomId, user: this.props.socket.id });
    }


    render() {
        // Passed from ChatListComponent via Actions
        //   console.log(this.props.roomId);
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => { this.exitRoom(); Actions.pop(); } }>
                        <Icon size={30} name='ios-arrow-back' color="#0E7AFE" />
                    </Button>
                    <Title ellipsizeMode='middle' numberOfLines={1}>{this.state.chat.roomName}</Title>
                    <Button transparent>
                        <Icon size={30} name='ios-information-circle-outline' color="#0E7AFE" />
                    </Button>
                </Header>
                <View style={{flex:1}}>
                    <ChatComponent key={this.state.chat.roomId} sendFunc={this.onSend} chat={this.state.chat} roomId={this.props.roomId} user={this.props.socket.id} style={{ flex: 1 }} />
                </View>
            </Container>
        );
    }
}

function getChat(state) {
    let socket = state.socketHandler.socket;

    return {
        socket: socket
    }
}

export default connectRedux(getChat)(ChatView);