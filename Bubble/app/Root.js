import React, {Component} from 'react';
import {connect} from 'react-redux';
import {onMyRooms, onListRooms, cacheUserId, setPendingMessages, backupChatRoom, reassignPendingMessages} from './actions/Actions';

class Root extends Component {

    componentDidMount() {
        const {socket} = this.props;
        socket.on('connect', this.onConnect.bind(this));
        socket.on('list_rooms', this.props.onListRooms);
        socket.on('my_rooms', this.props.onMyRooms);
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
