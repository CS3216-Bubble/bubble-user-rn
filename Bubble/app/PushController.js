import React, { Component } from 'react';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';

class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onRegister: function(token) {
        // TODO send this token to backend
        console.log( 'TOKEN:', token );
      },
      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
      },
      senderID: "101248374354",
      requestPermissions: true,
    })
  }

  render() {
    return {...this.props.children};
  }
}


function mapStateToProps(state) {
  return {
    socket: state.socketHandler.socket,
  }
}

export default connect(mapStateToProps)(PushController);
