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

export const BACKUP_START = 'BACKUP_START';
export function backupStart(state) {
  return {
    type: BACKUP_START,
    state,
  }
}

export const BACKUP_DONE = 'BACKUP_DONE';
export function backupDone() {
  return {
    type: BACKUP_DONE,
  }
}

export const BACKUP_ERROR = 'BACKUP_ERROR';
export function backupError(error) {
  return {
    type: BACKUP_ERROR,
    error,
  }
}

import { AsyncStorage } from 'react-native';
export const BACKUP_KEY = '@bubble:all'

export function backup(store) {
  let currentState = store.getState();
  let state = {
      bubbleId: currentState.bubbleId,
      settings: currentState.settings,
      rooms: currentState.rooms,
      myRooms: currentState.myRooms,
  };
  return dispatch => {
    dispatch(backupStart(state));
    return AsyncStorage.setItem(BACKUP_KEY, JSON.stringify(state))
      .then(dispatch(backupDone()))
      .catch((e) => dispatch(backupError(e)))
  }
}

const HYDRATE = 'HYDRATE';
export const HYDRATE_PENDING = `${HYDRATE}_PENDING`;
export const HYDRATE_SUCCESS = `${HYDRATE}_SUCCESS`;
export const HYDRATE_ERROR = `${HYDRATE}_ERROR`;

export function hydrateStart() {
  return {
    type: HYDRATE_PENDING,
  }
}

export function hydrateDone(state) {
  console.log(`got ${state.length} bytes from backup`);

  if (typeof state === 'undefined') {
    return {
      type: HYDRATE_SUCCESS,
      payload: {},
    }
  }

  try {
    var parsed = JSON.parse(state);
  } catch (error) {
    return {
      type: HYDRATE_ERROR,
      error,
    }
  }

  return {
    type: HYDRATE_SUCCESS,
    payload: parsed,
  }
}
export function hydrateError(error) {
  return {
    type: `${HYDRATE}_ERROR`,
    error,
  }
}

export function hydrateStore(state) {
  // state is just the redux state
  return dispatch => {
    dispatch(hydrateStart())
    return AsyncStorage.getItem(BACKUP_KEY)
      .then(v => { dispatch(hydrateDone(v))})
      .catch(e => dispatch(hydrateError(e)))
  }
}

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export function connectSocket(token) {
  const io = require('socket.io-client/socket.io');
  const host = `wss://getbubblechat.com/?bubble=${token}`;
  var socket = io(host, {
      transports: ['websocket', 'xhr-polling'], reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000
  });
  return {
    type: CONNECT_SOCKET,
    socket,
  }
}

export const MY_ID = 'MY_ID';
export function myId(data) {
  return {
    type: MY_ID,
    payload: data,
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
export const CREATE_ROOM = 'CREATE_ROOM'
export const JOIN_ROOM = 'JOIN_ROOM'
export const LISTEN_TO_JOIN_ROOM = 'LISTEN_TO_JOIN_ROOM'
export const EXIT_ROOM = 'EXIT_ROOM'
export const I_EXIT = 'I_EXIT'
export const LIST_ROOMS = 'LIST_ROOMS'
export const VIEW_ROOM = 'VIEW_ROOM'
export const LISTEN_TO_VIEW_ROOM = 'LISTEN_TO_VIEW_ROOM'
export const DID_BEGIN_TYPING = 'DID_BEGIN_TYPING'
export const DID_STOP_TYPING = 'DID_STOP_TYPING'
export const LISTEN_TO_START_TYPING = 'LISTEN_TO_START_TYPING'
export const LISTEN_TO_STOP_TYPING = 'LISTEN_TO_STOP_TYPING'
export const REPORT_USER = 'REPORT_USER'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const LISTEN_TO_SEND_MESSAGE = 'LISTEN_TO_SEND_MESSAGE'
export const ADD_REACTION = 'ADD_REACTION'
export const SET_USER_NAME = 'SET_USER_NAME'
export const LISTEN_TO_SET_USER_NAME = 'LISTEN_TO_SET_USER_NAME'
export const FIND_COUNSELLOR = 'FIND_COUNSELLOR'
export const LISTEN_TO_FIND_COUNSELLOR = 'LISTEN_TO_FIND_COUNSELLOR'
export const MY_ROOMS = 'MY_ROOMS'
export const LISTEN_TO_MY_ROOMS = 'LISTEN_TO_MY_ROOMS'

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


// createRoom requires payload:
//     user: string,
//     roomName: string,
//     roomDescription: string,
//     userLimit: number,
//     categories: string[]
export function createRoom(socket, args) {
    socket.emit('create_room', args);
    return {
        type: `${CREATE_ROOM}_PENDING`,
    }
}

export function onCreateRoom(data) {
    return {
        type: `${CREATE_ROOM}_SUCCESS`,
        payload: data,
    }
}

export function joinRoom(socket, roomId) {
  socket.emit('join_room', { roomId });
  return {
    type: `${JOIN_ROOM}_PENDING`,
  }
}

export function onJoinRoom(data) {
  return {
    type: `${JOIN_ROOM}_SUCCESS`,
    payload: data,
  }
}

export function exitRoom(socket, roomId) {
  socket.emit('exit_room', { roomId });
  return {
      type: `${EXIT_ROOM}_PENDING`,
  }
}

export function onExitRoom(data) {
  return {
    type: `${EXIT_ROOM}_SUCCESS`,
    payload: data,
  }
}

export function onIExit(data) {
  return {
    type: I_EXIT,
    payload: data,
  }
}

// listRooms requires payload:
//     user: string
export function listRooms(socket) {
    socket.emit('list_rooms');
    return {
        type: `${LIST_ROOMS}_PENDING`,
    }
}

export function onListRooms(data) {
    return {
        type: `${LIST_ROOMS}_SUCCESS`,
        payload: data,
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

export function addReaction(socket, reaction) {
  socket.emit('add_reaction', reaction);
  return {
    type: `${ADD_REACTION}_PENDING`,
    payload: reaction,
  }
}

export function onAddReaction(data) {
    return {
        type: `${ADD_REACTION}_SUCCESS`,
        payload: data,
    }
}

export function sendMessage(socket, roomId, message, dateTime) {
    socket.emit('add_message', {
      roomId,
      message,
    })

    return {
        type: `${SEND_MESSAGE}_PENDING`,
        payload: {
          roomRoomId: roomId, // weird key name for server
          userId: socket.id,
          content: message,
          createdAt: dateTime,
          sentByMe: true,
          messageType: 'PENDING' },
    }
}

export function onSendMessage(data) {
    return {
        type: `${SEND_MESSAGE}_SUCCESS`,
        payload: data,
    }
}

export const TYPING = 'TYPING';

export function onTyping(data) {
  return {
        type: TYPING,
        payload: data,
  }
}

export const STOP_TYPING = 'TYPING';
export function onStopTyping(data) {
  return {
        type: STOP_TYPING,
        payload: data,
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

export function myRooms(socket) {
    socket.emit('my_rooms');
    return {
        type: `${MY_ROOMS}_PENDING`,
    }
}

export function onMyRooms(data) {
    return {
        type: `${MY_ROOMS}_SUCCESS`,
        payload: data,
    }
}
