import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';

class ChatLoadingView extends Component {
  componentDidMount() {
    // Props passed from route
    const chatInfo = {
      user: '123',
      roomName: this.props.form.name,
      roomDescription: this.props.form.description,
      userLimit: this.props.form.numUsers,
      categories: this.props.form.categories
    }

    // > View Specific Listeners
    this.props.socket.on('create_room', this.onRoomCreated);
    this.props.socket.connect();
    this.props.socket.emit('create_room', chatInfo);
  }

  onRoomCreated = (response) => {
    // console.log(response);
    Actions.chatView({type: ActionConst.REPLACE, roomId: response.roomId});
  }

  render() {
      return (
          <Container>
              <Content>
                  <Text>Creating chat...</Text>
              </Content>
          </Container>
      );
  }
}

function getList(state) {
    let socket = state.socketHandler.socket;

    return {
        socket: socket
    }
}

export default connectRedux(getList)(ChatLoadingView);
