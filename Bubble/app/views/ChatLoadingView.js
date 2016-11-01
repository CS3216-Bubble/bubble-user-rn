import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import { createRoom, onCreateRoom } from '../actions/Actions';

class ChatLoadingView extends Component {

  constructor(props, context) {
    super(props, context);
    this.onRoomCreated = this.onRoomCreated.bind(this);
    this.props.socket.on('create_room', this.onRoomCreated);
  }

  componentDidMount() {
    const chatInfo = {
      roomName: this.props.form.name,
      roomDescription: this.props.form.description,
      userLimit: this.props.form.numUsers,
      categories: this.props.form.categories
    }
    this.props.createRoom(this.props.socket, chatInfo)
  }

  onRoomCreated = (response) => {
    // console.log(response);
    Actions.chatView({ type: ActionConst.REPLACE, roomId: response.roomId });
    this.props.onCreateRoom(response)
    // Actions.chatView({roomId: response.roomId});
  }

  componentWillUnmount() {
    this.props.socket.removeListener('create_room', this.onRoomCreated);
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

const mapStateToProps = (state) => {
  return {
    socket: state.socket
  }
;}
const mapDispatchToProps = (dispatch) => {
  return {
      createRoom: (socket, args) => dispatch(createRoom(socket, args)),
      onCreateRoom: (data) => dispatch(onCreateRoom(data)),
  };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatLoadingView);
