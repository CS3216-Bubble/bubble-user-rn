import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPendingMessages, backupChatRoom, cacheUserId, reassignPendingMessages } from './actions/Actions';
import { claimId, claimSuccess, setClaimToken, setClaimTokenSuccess } from './actions/claim';

class Root extends Component {
  componentDidMount() {
    const { socket } = this.props;
    socket.on('connect', this.onConnect.bind(this));
    socket.on('claim_id', this.onClaimId.bind(this));
    socket.on('set_claim_token', this.onSetClaimTokenSuccess.bind(this));
  }

  onSetClaimTokenSuccess() {
    this.props.setClaimTokenSuccess(this.props.claimToken);
  }

  onClaimId() {
    this.props.claimSuccess();
  }

  onConnect() {
    const {
      socket,
      noToken,
      claimToken,
      memoId,
      aliasId,
    } = this.props;

    const socketId = this.props.socket.id;
    console.log("Connected", socketId);

    // set initial token
    if (noToken) {
      setClaimToken(socket, claimToken);
    }

    this.props.reassignOutbox();

    const toClaimId = aliasId.find(aid => aid !== socketId)
    if (typeof toClaimId !== 'undefined') {
      claimId(socket, toClaimId, claimToken);
    }

    memoId(socketId);
  }

  render() {
    return {...this.props.children};
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    socket: state.socket,
    aliasId: state.aliasId,
    noToken: !state.claimed,
    claimToken: state.claimToken,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveUnsentMsgs: (messages) => { dispatch(setPendingMessages(messages, ownProps.roomId)) },
    saveChatSession: (chat) => { dispatch(backupChatRoom(ownProps.roomId, chat)) },
    memoId: (userId) => { dispatch(cacheUserId(userId)) },
    reassignOutbox: () => { dispatch(reassignPendingMessages()) },
    claimSuccess: () => { dispatch(claimSuccess()) },
    setClaimTokenSuccess: (claimToken) => { dispatch(setClaimTokenSuccess(claimToken)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
