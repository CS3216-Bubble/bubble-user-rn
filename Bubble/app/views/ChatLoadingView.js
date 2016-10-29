import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';

class ChatLoadingView extends Component {

  constructor(props, context) {
    super(props, context);
    this.onRoomCreated = this.onRoomCreated.bind(this);
    // > View Specific Listeners
    this.props.socket.on('create_room', this.onRoomCreated);
    this.props.socket.connect();
    console.log("CONSTRUCT MY VIEW");
  }

  componentDidMount() {
    console.log("I DID MOUNT and i am ", this.props.socket.id);
    // Props passed from route
    const chatInfo = {
      user: this.props.socket.id,
      roomName: this.props.form.name,
      roomDescription: this.props.form.description,
      userLimit: this.props.form.numUsers,
      categories: this.props.form.categories
    }
    this.props.socket.emit('create_room', chatInfo);
  }

  onRoomCreated = (response) => {
    console.log(response);
    Actions.chatView({ type: ActionConst.REPLACE, roomId: response.roomId });
    // Actions.chatView({roomId: response.roomId});
  }

  componentWillReceiveProps(props) {
    console.log("I DID RECEIVE PROPS and i am ", this.props.socket.id);
    // Props passed from route
    const chatInfo = {
      user: this.props.socket.id,
      roomName: props.form.name,
      roomDescription: props.form.description,
      userLimit: props.form.numUsers,
      categories: props.form.categories
    }
    this.props.socket.emit('create_room', chatInfo);
  }

  componentWillUnmount() {
    this.props.socket.removeListener('create_room', this.onRoomCreated);
    this.props.socket.removeListener('bubble_error', (data) => { console.log(data) });

  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../img/default.png')} />
        <Text style={styles.text}>Creating chat...</Text>
        <View>
          <Button transparent onPress={Actions.main}>
            <Icon size={60} name='ios-close' style={{ color: '#FFFFFF' }} />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#69D2E7'
  },
  text: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 24
  }
});

function getList(state) {
  let socket = state.socketHandler.socket;

  return {
    socket: socket
  }
}

export default connectRedux(getList)(ChatLoadingView);
