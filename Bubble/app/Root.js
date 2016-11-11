import React, {Component} from 'react';
import { Platform } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  backup,
  connectSocket,
  hydrateStore,
  myId,
  onAddReaction,
  onCreateRoom,
  onExitRoom,
  onIExit,
  onJoinRoom,
  onViewRoom,
  onSendMessage,
  onTyping,
  onStopTyping,
  onListRooms,
  onMyRooms,
  reassignPendingMessages,
  setPendingMessages,
} from './actions/Actions';

class Root extends Component {
    static contextTypes = {
      store: React.PropTypes.object
    }

    componentDidMount() {
        this.props.hydrateStore()
          .then(() => this.props.connectSocket(this.props.token))
          .then(() => {
            const {socket} = this.props;
            socket.on('connect', this.onConnect.bind(this));
            socket.on('my_id', this.props.myId);
            socket.on('list_rooms', this.props.onListRooms);
            socket.on('my_rooms', this.props.onMyRooms);
            socket.on('add_message', this.props.onSendMessage);
            socket.on('add_reaction', this.props.onAddReaction);
            socket.on('bubble_error', this.onError);
            socket.on('join_room', this.props.onJoinRoom);
            socket.on('view_room', this.props.onViewRoom);
            socket.on('exit_room', this.props.onExitRoom);
            socket.on('i_exit', this.onIExit.bind(this));
            socket.on('typing', this.props.onTyping);
            socket.on('stop_typing', this.props.onStopTyping);
            socket.on('create_room', this.onCreateRoom.bind(this));
            socket.on('error', this.onError.bind(this));
            socket.on('disconnect', this.onDisconnect.bind(this));
            socket.on('reconnecting', this.onReconnecting.bind(this));
            socket.onError = this.onError.bind(this);
          });

        this.backup = this.backup.bind(this);
        const backupIntervalId = setInterval(this.backup, 10000);
        this.setState({ backupIntervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.backupIntervalId);
    }

    backup() {
        this.props.backup(this.context.store);
    }

    onError() {

    }

    onDisconnect() {

    }

    onReconnecting() {

    }

    onIExit(data) {
      this.props.onIExit(data);
      if (Platform.OS === 'ios') {
        //   Actions.main({ type: ActionConst.REPLACE, selectedTab: 'all' });
        Actions.popTo("main", {selectedTab: 'all'});
      } else {
        //   Actions.main({ type: ActionConst.REPLACE, selectedTab: 0 });
        Actions.popTo("main", {selectedTab: 0});
      }
    }

    onCreateRoom(data) {
      this.props.onCreateRoom(data);
      Actions.chatView({ type: ActionConst.REPLACE, roomId: data.roomId });
    }

    onError(error) {
        switch (error.code) {
            case 'room_closed':
                // console.log("Room closed", error);
                break;
            case 'user_not_in_room':
                // console.log("User has not joined this room", error);
                break;
            default:
                // console.log("Generic socket error", error);
                break;
        }
    }

    onConnect() {
        const { socket } = this.props;

        const socketId = this.props.socket.id;
        // console.log("Connected", socketId);

        this.props.reassignOutbox();
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
        reassignOutbox: () => {
            dispatch(reassignPendingMessages())
        },
        onListRooms: (data) => dispatch(onListRooms(data)),
        onMyRooms: (data) => dispatch(onMyRooms(data)),
        onSendMessage: (data) => dispatch(onSendMessage(data)),
        onJoinRoom: (data) => dispatch(onJoinRoom(data)),
        onViewRoom: (data) => dispatch(onViewRoom(data)),
        onExitRoom: (data) => dispatch(onExitRoom(data, ownProps.socket)),
        onAddReaction: (data) => dispatch(onAddReaction(data)),
        onTyping: (data) => dispatch(onTyping(data)),
        onStopTyping: (data) => dispatch(onStopTyping(data)),
        onCreateRoom: (data) => dispatch(onCreateRoom(data)),
        onIExit: (data) => dispatch(onIExit(data)),
        hydrateStore: () => dispatch(hydrateStore()),
        myId: (data) => dispatch(myId(data)),
        connectSocket: (token) => dispatch(connectSocket(token)),
        backup: (state) => dispatch(backup(state)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
