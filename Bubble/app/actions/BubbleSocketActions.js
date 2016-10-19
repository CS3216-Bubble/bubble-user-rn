/*** ACTION DEFINITIONS FOR SOCKET ***/

export function connect() {
    return {
        type: 'CONNECT'
    }
}

export function disconnect() {
    return {
        type: 'DISCONNECT'
    }
}

// createRoom requires payload:
//     user: string,
//     roomName: string,
//     roomDescription: string,
//     userLimit: number,
//     categories: string[]
export function createRoom(newChat) {
    return {
        type: 'CREATE_ROOM',
        newChat: newChat
    }
}

// joinRoom requires payload:
//     roomId: string,
//     user: string
export function joinRoom(joinRequest) {
    return {
        type: 'JOIN_ROOM',
        joinRequest: joinRequest
    }
}

// exitRoom requires payload:
//     roomId: string,
//     user: string
export function exitRoom(exitRequest) {
    return {
        type: 'EXIT_ROOM',
        exitRequest: exitRequest
    }
}

// listRooms requires payload:
//     user: string
export function listRooms(userIdentity) {
    return {
        type: 'LIST_ROOMS',
        userIdentity: userIdentity
    }
}

// viewRoom requires payload:
//     roomId: string,
//     user: string
export function viewRoom(viewRequest) {
    return {
        type: 'VIEW_ROOM',
        viewRequest: viewRequest
    }
}

// didBeginTyping requires payload:
//     roomId: string,
//     user: string
export function didBeginTyping(typeStatusBroadcast) {
    return {
        type: 'DID_BEGIN_TYPING',
        typeStatusBroadcast: typeStatusBroadcast
    }
}

// didStopTyping requires payload:
//     roomId: string,
//     user: string
export function didStopTyping(typeStatusBroadcast) {
    return {
        type: 'DID_STOP_TYPING',
        typeStatusBroadcast: typeStatusBroadcast
    }
}

// reportUser requires payload:
//     user: string
//     userToReport: string
//     roomId: string
//     reason: string
export function reportUser(flagReport) {
    return {
        type: 'REPORT_USER',
        flagReport: flagReport
    }
}

// addMessage requires payload:
//     roomId: string
//     user: string
//     message: string
export function sendMessage(message) {
    return {
        type: 'SEND_MESSAGE',
        message: message
    }
}

// sendReaction requires payload:
//     user: string
//     roomId: string
//     reaction: string
export function sendReaction(reaction) {
    return {
        type: 'SEND_REACTION',
        reaction: reaction
    }
}

// setUsername requires payload:
//     userId: string
//     newName: string
export function setUsername(username) {
    return {
        type: 'SET_USERNAME',
        username: username
    }
}

// findCounsellor requires payload:
//     userId: string
export function findCounsellor(userId) {
    return {
        type: 'FIND_COUNSELLOR',
        userId: userId
    }
}