import React, {Component} from 'react';
import { Platform } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  backupChatRoom,
  cacheUserId,
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
        socket.on('exit_room', this.onExited);
    }

    onExited() {
        if (Platform.OS === 'ios') {
            Actions.main({ type: ActionConst.REPLACE, selectedTab: 'all' });
        } else {
            Actions.main({ type: ActionConst.REPLACE, selectedTab: 0 });
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
