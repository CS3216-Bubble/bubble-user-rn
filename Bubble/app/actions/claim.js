const CLAIM_ID = 'claim_id';

export function claimId(socket, oldSocketId, claimToken) {
    socket.emit(
      "claim_id", {
      oldSocketId,
      claimToken,
    });

    return {
      type: `${CLAIM_ID}_PENDING`,
    }
}

export function claimSuccess() {
  return {
      type: `${CLAIM_ID}_SUCCESS`,
  }
}

const SET_CLAIM_TOKEN = 'set_claim_token'

export function setClaimToken(socket, claimToken) {
  socket.emit(
    SET_CLAIM_TOKEN, {
      claimToken,
    });

  return {
      type: `${SET_CLAIM_TOKEN}_PENDING`,
  }
}

export function setClaimTokenSuccess(claimToken) {
  return {
    type: `${SET_CLAIM_TOKEN}_SUCCESS`,
    claimToken,
  }
}
