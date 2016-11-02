import React, {Component} from 'react';
import { Platform } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  backupChatRoom,
  cacheUserId,
  onAddReaction,
  onExitRoom,
  onJoinRoom,
  onSendMessage,
  onTyping,
  onStopTyping,
  onListRooms,
  onMyRooms,
  reassignPendingMessages,
  setPendingMessages,
} from './actions/Actions';

class Root extends Component {

    componentDidMount() {
        const {socket} = this.props;
        socket.on('connect', this.onConnect.bind(this));
        socket.on('list_rooms', this.props.onListRooms);
        socket.on('my_rooms', this.props.onMyRooms);
        socket.on('add_message', this.props.onSendMessage);
        socket.on('add_reaction', this.props.onAddReaction);
        socket.on('bubble_error', this.onError);
        socket.on('join_room', this.props.onJoinRoom);
        socket.on('exit_room', this.onExit.bind(this));
        socket.on('typing', this.props.onTyping);
        socket.on('stop_typing', this.props.onStopTyping);
    }

    onError(error) {
        switch (error.code) {
            case 'room_closed':
                console.log("Room closed", error);
                break;
            case 'user_not_in_room':
                console.log("User has not joined this room", error);
                break;
            default:
                console.log("Generic socket error", error);
                break;
        }
    }

    onExit(data) {
        this.props.onExitRoom(data);
        if (data.userId === this.props.socket.id) {
            // only navigate if this event if for me
            if (Platform.OS === 'ios') {
                Actions.main({ type: ActionConst.REPLACE, selectedTab: 'all' });
            } else {
                Actions.main({ type: ActionConst.REPLACE, selectedTab: 0 });
            }
        }
    }

    onConnect() {
        const { socket } = this.props;

        const socketId = this.props.socket.id;
        console.log("Connected", socketId);

        this.props.reassignOutbox();
        this.props.memoId(socketId);
    }

    render() {
        return {
            ...this.props.children
        };
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        socket: state.socket,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveUnsentMsgs: (messages) => {
            dispatch(setPendingMessages(messages, ownProps.roomId))
        },
        saveChatSession: (chat) => {
            dispatch(backupChatRoom(ownProps.roomId, chat))
        },
        memoId: (userId) => {
            dispatch(cacheUserId(userId))
        },
        reassignOutbox: () => {
            dispatch(reassignPendingMessages())
        },
        onListRooms: (data) => dispatch(onListRooms(data)),
        onMyRooms: (data) => dispatch(onMyRooms(data)),
        onSendMessage: (data) => dispatch(onSendMessage(data)),
        onJoinRoom: (data) => dispatch(onJoinRoom(data)),
        onExitRoom: (data) => dispatch(onExitRoom(data, ownProps.socket)),
        onAddReaction: (data) => dispatch(onAddReaction(data)),
        onTyping: (data) => dispatch(onTyping(data)),
        onStopTyping: (data) => dispatch(onStopTyping(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
