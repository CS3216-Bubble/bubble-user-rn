import React, { Component } from 'react';
import { AppState, Platform } from 'react-native';
import { connect as connectRedux } from 'react-redux';
import { generateName, genLocalProfImg} from './utils/ProfileHasher';

var PushNotification = require('react-native-push-notification');

class NotificationController extends Component {

    toNotify(data) {
        // console.log(data);
        // console.log(this.props.shouldNotify);
        if (AppState.currentState == 'background' && data.user != this.props.socket.id && this.props.shouldNotify) {
            PushNotification.localNotification({
                /* Android Only Properties */
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
                // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
                subText: "... says " + generateName(data.userId), // (optional) default: none

                /* iOS and Android properties */
                title: data.roomName, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
                message: Platform.OS=="ios"
                                    ? "[" + data.roomName + "]\n" + generateName(data.userId) + ": " + data.content
                                    :  data.content,
                soundName: 'default', // (optional) Sound to play when the notification is shown.
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.socket !== 'undefined' && nextProps.socket !== null) {
            nextProps.socket.on('add_message', this.toNotify.bind(this));
        }
    }

    componentDidMount() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
            },
            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
            senderID: "101248374354",
        });
    }

    render() {
        return {...this.props.children };
    }
}


/*** Redux Call ***/
const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        shouldNotify: state.settings.showAllNotifications
    };
}
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(NotificationController);
