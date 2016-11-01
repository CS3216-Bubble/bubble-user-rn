/* REACT NATIVE REDUX ACTIONS */


//------------- Settings --------------

// Action Types
export const SET_FIRST_TIME_USER = 'SET_FIRST_TIME_USER'
export const UNSET_FIRST_TIME_USER = 'UNSET_FIRST_TIME_USER'
export const SET_GENDER = 'SET_GENDER'
export const SET_FACULTY = 'SET_FACULTY'
export const SHOW_JOIN_ROOM_WARNINGS = 'SHOW_JOIN_ROOM_WARNINGS'
export const HIDE_JOIN_ROOM_WARNINGS = 'HIDE_JOIN_ROOM_WARNINGS'
export const SHOW_EXIT_ROOM_WARNINGS = 'SHOW_EXIT_ROOM_WARNINGS'
export const HIDE_EXIT_ROOM_WARNINGS = 'HIDE_EXIT_ROOM_WARNINGS'
export const TOGGLE_NOTIFICATIONS_DISPLAY_FLAG = 'TOGGLE_NOTIFICATIONS_DISPLAY_FLAG'
export const MUTE_CHATROOM = 'MUTE_CHATROOM'
export const UNMUTE_CHATROOM = 'UNMUTE_CHATROOM'
export const UNMUTE_ALL_CHATROOMS = 'UNMUTE_ALL_CHATROOMS'

// Action Creators
export function setFirstTimeUser() {
    return {
        type: SET_FIRST_TIME_USER,
        flag: true
    }
}
export function unsetFirstTimeUser() {
    return {
        type: UNSET_FIRST_TIME_USER,
        flag: false
    }
}
export function setGender(gender) {
    return {
        type: SET_GENDER,
        gender: gender
    }
}
export function setFaculty(faculty) {
    return {
        type: SET_FACULTY,
        faculty: faculty
    }
}
export function showJoinRoomWarnings() {
    return {
        type: SHOW_JOIN_ROOM_WARNINGS,
        flag: true
    }
}
export function hideJoinRoomWarnings() {
    return {
        type: HIDE_JOIN_ROOM_WARNINGS,
        flag: false
    }
}
export function showExitRoomWarnings() {
    return {
        type: SHOW_EXIT_ROOM_WARNINGS,
        flag: true
    }
}
export function hideExitRoomWarnings() {
    return {
        type: HIDE_EXIT_ROOM_WARNINGS,
        flag: false
    }
}
export function toggleNotificationsDisplayFlag() {
    return {
        type: TOGGLE_NOTIFICATIONS_DISPLAY_FLAG
    }
}
export function muteChatRoom(roomId) {
    return {
        type: MUTE_CHATROOM,
        roomId: roomId
    }
}
export function unmuteChatRoom(roomId) {
    return {
        type: UNMUTE_CHATROOM,
        roomId: roomId
    }
}
export function unmuteAllChatRooms() {
    return {
        type: UNMUTE_ALL_CHATROOMS,
    }
}


//----------- Cached Chats --------------

// Action Types
export const SET_CHATLIST = 'SET_CHATLIST'
export const BACKUP_CHATROOM = 'BACKUP_CHATROOM'

// Action Creators
export function setChatList(chatList) {
    return {
        type: SET_CHATLIST,
        chatList: chatList
    }
}
export function backupChatRoom(roomId, chatRoomState) {
    return {
        type: BACKUP_CHATROOM,
        roomId: roomId,
        chatRoomState: chatRoomState
    }
}


//-------------- Networks ---------------

// Action Types
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS'
export const SET_PENDING_MESSAGES = 'SET_PENDING_MESSAGES'
export const ENQUEUE_PENDING_MESSAGE = 'ENQUEUE_PENDING_MESSAGE'
export const DEQUEUE_PENDING_MESSAGE = 'DEQUEUE_PENDING_MESSAGE'
export const CLEAR_PENDING_MESSAGES = 'CLEAR_PENDING_MESSAGES'
export const REASSIGN_PENDING_MESSAGES = 'REASSIGN_PENDING_MESSAGES'

// Action Creators
export function setConnectionStatus(status) {
    return {
        type: SET_CONNECTION_STATUS,
        status: status
    }
}
export function setPendingMessages(messages, roomId) {
    return {
        type: SET_PENDING_MESSAGES,
        messages: messages,
        roomId: roomId
    }
}
export function enqueuePendingMessage(message) {
    return {
        type: ENQUEUE_PENDING_MESSAGE,
        message: message
    }
}
export function dequeuePendingMessage(message) {
    return {
        type: DEQUEUE_PENDING_MESSAGE,
        message: message
    }
}
export function clearPendingMessages() {
    return {
        type: CLEAR_PENDING_MESSAGES
    }
}
export function reassignPendingMessages(userId) {
    return {
        type: REASSIGN_PENDING_MESSAGES,
        userId: userId
    }
}


//---------- Filter and Search ----------

// Action Types
export const SET_CATEGORIES_FILTER = 'SET_CATEGORIES_FILTER'
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER'

// Action Creators
export function setCategoriesFilter(categories) {
    return {
        type: SET_CATEGORIES_FILTER,
        categories: categories
    }
}
export function setSearchFilter(searchTerm) {
    return {
        type: SET_SEARCH_FILTER,
        searchTerm: searchTerm
    }
}


//---------------- Utils ----------------

// Action Types
export const CACHE_NICKNAME = 'CACHE_NICKNAME'
export const CACHE_USER_ID = 'CACHE_USER_ID'
export const REHYDRATION_COMPLETE = 'REHYDRATION_COMPLETE'
export const SET_TOKEN_STATUS = "SET_TOKEN_STATUS"

// Action Creators
export function cacheNickname(userId, nickname) {
    return {
        type: CACHE_NICKNAME,
        userId: userId,
        nickname: nickname
    }
}
export function cacheUserId(userId) {
    return {
        type: CACHE_USER_ID,
        userId: userId,
    }
}
export function rehydrationComplete() {
    return {
        type:REHYDRATION_COMPLETE
    }
}



//--------------- Sockets ---------------

// Action Types
export const CONNECT = 'CONNECT'
export const DISCONNECT = 'DISCONNECT'
export const LISTEN_TO_CONNECT = 'LISTEN_TO_CONNECT'
export const LISTEN_TO_DISCONNECT = 'LISTEN_TO_DISCONNECT'
export const LISTEN_TO_TIMEOUT = 'LISTEN_TO_TIMEOUT'
export const LISTEN_TO_RECONNECTING = 'LISTEN_TO_RECONNECTING'
export const LISTEN_TO_RECONNECT_FAILED = 'LISTEN_TO_RECONNECT_FAILED'
export const LISTEN_TO_ERROR = 'LISTEN_FOR_ERROR'
export const CREATE_ROOM = 'CREATE_ROOM'
export const LISTEN_TO_CREATE_ROOM = 'LISTEN_FOR_CREATE_ROOM'
export const JOIN_ROOM = 'JOIN_ROOM'
export const LISTEN_TO_JOIN_ROOM = 'LISTEN_TO_JOIN_ROOM'
export const EXIT_ROOM = 'EXIT_ROOM'
export const LISTEN_TO_EXIT_ROOM = 'LISTEN_TO_EXIT_ROOM'
export const LIST_ROOMS = 'LIST_ROOMS'
export const LISTEN_TO_LIST_ROOMS = 'LISTEN_TO_LIST_ROOMS'
export const VIEW_ROOM = 'VIEW_ROOM'
export const LISTEN_TO_VIEW_ROOM = 'LISTEN_TO_VIEW_ROOM'
export const DID_BEGIN_TYPING = 'DID_BEGIN_TYPING'
export const DID_STOP_TYPING = 'DID_STOP_TYPING'
export const LISTEN_TO_START_TYPING = 'LISTEN_TO_START_TYPING'
export const LISTEN_TO_STOP_TYPING = 'LISTEN_TO_STOP_TYPING'
export const REPORT_USER = 'REPORT_USER'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const LISTEN_TO_SEND_MESSAGE = 'LISTEN_TO_SEND_MESSAGE'
export const SEND_REACTION = 'SEND_REACTION'
export const LISTEN_TO_SEND_REACTION = 'LISTEN_TO_SEND_REACTION'
export const SET_USER_NAME = 'SET_USER_NAME'
export const LISTEN_TO_SET_USER_NAME = 'LISTEN_TO_SET_USER_NAME'
export const FIND_COUNSELLOR = 'FIND_COUNSELLOR'
export const LISTEN_TO_FIND_COUNSELLOR = 'LISTEN_TO_FIND_COUNSELLOR'
export const MY_ROOMS = 'MY_ROOMS'
export const LISTEN_TO_MY_ROOMS = 'LISTEN_TO_MY_ROOMS'
export const REMOVE_LISTENERS = 'REMOVE_LISTENERS'

// Action Creators
export function connect() {
    return {
        type: CONNECT
    }
}
export function disconnect() {
    return {
        type: DISCONNECT
    }
}
export function listenToConnect(callback) {
    return {
        type: CONNECT,
        callback: callback
    }
}
export function listenToDisconnect(callback) {
    return {
        type: DISCONNECT,
        callback: callback
    }
}
export function listenToTimeout(callback) {
    return {
        type: LISTEN_TO_TIMEOUT,
        callback: callback
    }
}
export function listenToReconnecting(callback) {
    return {
        type: LISTEN_TO_RECONNECTING,
        callback: callback
    }
}
export function listenToReconnectFailed(callback) {
    return {
        type: LISTEN_TO_RECONNECT_FAILED,
        callback: callback
    }
}

// listenToError listens to the following:
// - NO_MESSAGE
// - NO_REACTION
// - NO_NAME
// - NO_ROOM_ID
// - NO_ROOM_NAME
// - ROOM_FULL
// - ROOM_ID_NOT_FOUND
// - USER_ALREADY_IN_ROOM
// - USER_NOT_IN_ROOM
// - COUNSELLOR_UNAVAILABLE
// - NO_USER_TO_REPORT
// - ROOM_CLOSED
// - NO_TARGET_USER
// - INVALID_ROOM_ID
// - INVALID_ROOM_NAME
// - NO_OLD_SOCKET_ID
// - OLD_SOCKET_ID_NOT_FOUND
export function listenToError(callback) {
    return {
        type: LISTEN_TO_ERROR,
        callback: callback
    }
}

// createRoom requires payload:
//     user: string,
//     roomName: string,
//     roomDescription: string,
//     userLimit: number,
//     categories: string[]
export function createRoom(userId, roomName, roomDesc, userLimit, categories) {
    const newChat = {
        user: userId,
        roomName: roomName,
        roomDescription: roomDesc,
        userLimit: userLimit,
        categories: categories
    }
    return {
        type: CREATE_ROOM,
        payload: newChat
    }
}

// listenToCreateRoom provides:
//     roomId: string
export function listenToCreateRoom(callback) {
    return {
        type: LISTEN_TO_CREATE_ROOM,
        callback: callback
    }
}

// joinRoom requires payload:
//     roomId: string,
//     user: string
export function joinRoom(roomId, userId) {
    const joinRequest = {
        roomId: roomId,
        user: userId,
    }
    return {
        type: JOIN_ROOM,
        payload: joinRequest
    }
}

// listenToJoinRoom provides to other parties:
//     roomId: string,
//     user: string
// and to emitter:
//     roomId: string,
//     roomName: string,
//     roomType: string,
//     userLimit: number,
//     roomDescription: string,
//     categories: string[],
//     numUsers: number,
//     lastActive: ISO date string,
//     messages: Object[],
//     participants: string[]
export function listenToJoinRoom(callback) {
    return {
        type: LISTEN_TO_JOIN_ROOM,
        callback: callback
    }
}

// exitRoom requires payload:
//     roomId: string,
//     user: string
export function exitRoom(roomId, userId) {
    const exitRequest = {
        roomId: roomId,
        user: userId
    }
    return {
        type: EXIT_ROOM,
        payload: exitRequest
    }
}

// listenToExitRoom provides:
//     roomId: string,
//     user: string
export function listenToExitRoom(callback) {
    return {
        type: LISTEN_TO_EXIT_ROOM,
        callback: callback
    }
}

// listRooms requires payload:
//     user: string
export function listRooms(userId) {
    const userIdentity = {
        user: userId
    }
    return {
        type: LIST_ROOMS,
        payload: userIdentity
    }
}

// listenToListRooms provides:
//     rooms: Object[]
export function listenToListRooms(callback) {
    return {
        type: LISTEN_TO_LIST_ROOMS,
        callback: callback
    }
}

// viewRoom requires payload:
//     roomId: string,
//     user: string
export function viewRoom(roomId, userId) {
    const viewRequest = {
        roomId: roomId,
        user: userId
    }
    return {
        type: VIEW_ROOM,
        payload: viewRequest
    }
}

// listenToViewRoom provides:
//     roomId: string,
//     roomName: string,
//     roomType: string,
//     userLimit: number,
//     roomDescription: string,
//     categories: string[],
//     numUsers: number,
//     lastActive: ISO date string,
//     messages: Object[],
//     participants: string[]
export function listenToViewRoom(callback) {
    return {
        type: LISTEN_TO_VIEW_ROOM,
        callback: callback
    }
}

// didBeginTyping requires payload:
//     roomId: string,
//     user: string
export function didBeginTyping(roomId, userId) {
    const typeStatusBroadcast = {
        roomId: roomId,
        user: userId
    }
    return {
        type: DID_BEGIN_TYPING,
        payload: typeStatusBroadcast
    }
}

// listenToStartTyping provides:
//     roomId: string,
//     user: string
export function listenToStartTyping(callback) {
    return {
        type: LISTEN_TO_START_TYPING,
        callback: callback
    }
}

// didStopTyping requires payload:
//     roomId: string,
//     user: string
export function didStopTyping(roomId, userId) {
    const typeStatusBroadcast = {
        roomId: roomId,
        user: userId
    }
    return {
        type: DID_STOP_TYPING,
        payload: typeStatusBroadcast
    }
}

// listenToStopTyping provides:
//     roomId: string,
//     user: string
export function listenToStopTyping(callback) {
    return {
        type: LISTEN_TO_STOP_TYPING,
        callback: callback
    }
}

// reportUser requires payload:
//     user: string
//     userToReport: string
//     roomId: string
//     reason: string
export function reportUser(userId, targetUserId, roomId, reason, reportType) {
    const flagReport = {
        user: userId,
        userToReport: targetUserId,
        roomId: roomId,
        reason: reason,
        type: reportType
    }
    return {
        type: REPORT_USER,
        payload: flagReport
    }
}

// sendMessage requires payload:
//     roomId: string
//     user: string
//     message: Object
export function sendMessage(roomId, userId, message) {
    const messageToAdd = {
        roomId: roomId,
        user: userId,
        message: message
    }
    return {
        type: SEND_MESSAGE,
        payload: messageToAdd
    }
}

// listenToSendMessage provides to other parties:
//     user: string
//     roomId: string
//     message: Object
// and to emitter:
//     user: string
//     roomId: string,
//     message: Object
//     sentByMe: boolean,
export function listenToSendMessage(callback) {
    return {
        type: LISTEN_TO_SEND_MESSAGE,
        callback: callback
    }
}

// sendReaction requires payload:
//     user: string
//     roomId: string
//     reaction: string
export function sendReaction(user, roomId, reactionType) {
    const reaction = {
        user: userId,
        roomId: roomId,
        reaction: reactionType
    }
    return {
        type: SEND_REACTION,
        payload: reaction
    }
}

// listenToSendReaction provides to all other parties:
//     user: string
//     roomId: string
//     reaction: string
// add to emitter:
//     user: string
//     roomId: string
//     reaction: string
//     sendByMe: boolean
export function listenToSendReaction(callback) {
    return {
        type: LISTEN_TO_SEND_REACTION,
        callback: callback
    }
}

// setUsername requires payload:
//     userId: string
//     newName: string
export function setUsername(userId, newName) {
    var usernameRequest = {
        userId: userId,
        newName: newName
    }
    return {
        type: SET_USER_NAME,
        payload: usernameRequest
    }
}

// listenToSetUsername provides to all other parties:
//     userId: string
//     newName: string
export function listenToSetUsername(callback) {
    return {
        type: LISTEN_TO_SET_USER_NAME,
        callback: callback
    }
}

// findCounsellor requires payload:
//     userId: string
//     faculty: string
export function findCounsellor(userId, faculty) {
    const counsellorChatRequest = {
        userId: userId,
        faculty: faculty
    }
    return {
        type: FIND_COUNSELLOR,
        payload: counsellorChatRequest
    }
}

// listenToFindCounsellor provides:
//     counsellorId: string,
//     counsellorName: string,
//     roomId: string,
//     roomName: string,
//     roomType: string,
//     userLimit: number,
//     roomDescription: string,
//     categories: string[],
//     numUsers: number,
//     lastActive: ISO string
export function listenToFindCounsellor(callback) {
    return {
        type: LISTEN_TO_FIND_COUNSELLOR,
        callback: callback
    }
}

// myRooms requires no payload
export function myRooms() {
    return {
        type: MY_ROOMS
    }
}

// listenToMyRooms provides to emitter:
//     roomIds: string[]
export function listenToMyRooms(callback) {
    return {
        type: LISTEN_TO_MY_ROOMS,
        callback: callback
    }
}

// removeListeners helps to remove socket listeners that binds to component callbacks
export function removeListeners(callback) {
    return {
        type: REMOVE_LISTENERS,
        callback: callback
    }
}
