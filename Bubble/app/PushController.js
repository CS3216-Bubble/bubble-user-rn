import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import { connect as connectRedux } from 'react-redux';

class PushController extends Component {
    componentDidMount() {
        PushNotification.configure({
            onRegister: function (token) {
                // TODO send this token to backend
                // console.log( 'TOKEN:', token );
            },
            onNotification: function (notification) {
                // console.log( 'NOTIFICATION:', notification );
            },
            senderID: "101248374354",
            requestPermissions: true,
        })
    }

    render() {
        return {...this.props.children };
    }
}


/*** Using reducer socket ***/

const mapStateToProps = (state) => {
    return {
        socket: state.socket
    }
        ;
}
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(PushController);
