import React, { Component } from 'react';
import { AppState } from 'react-native';
import { connect as connectRedux } from 'react-redux';

var PushNotification = require('react-native-push-notification');

class NotificationController extends Component {

    toNotify(data) {
        console.log(data);
        if (AppState.currentState == 'background' && data.user != this.props.socket.id) {
            PushNotification.localNotification({
                /* Android Only Properties */
                // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                ticker: "My Notification Ticker", // (optional)
                autoCancel: true, // (optional) default: true
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
                smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
                bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
                subText: "This is a subText", // (optional) default: none
                color: "red", // (optional) default: system default
                vibrate: true, // (optional) default: true
                vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                tag: 'some_tag', // (optional) add tag to message
                group: "group", // (optional) add group to message
                ongoing: false, // (optional) set whether this is an "ongoing" notification

                /* iOS only properties */
                // alertAction: // (optional) default: view
                // category: // (optional) default: null
                // userInfo: // (optional) default: null (object containing additional notification data)

                /* iOS and Android properties */
                title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
                message: "My Notification Message", // (required)
                playSound: false, // (optional) default: true
                soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                // number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                // repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
                actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
            });
        }
    }
    componentDidMount() {
        const {socket} = this.props;
        socket.on('add_message', this.toNotify.bind(this));

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

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });
    }

    render() {
        return {...this.props.children };
    }
}


/*** Redux Call ***/
const mapStateToProps = (state) => {
    return {
        socket: state.socket
    };
}
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(NotificationController);