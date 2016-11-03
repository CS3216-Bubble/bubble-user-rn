import { Component } from 'react';
import React, { Platform } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import {
    SET_FIRST_TIME_USER,
    UNSET_FIRST_TIME_USER,
    SET_GENDER,
    SET_FACULTY,
    SHOW_JOIN_ROOM_WARNINGS,
    HIDE_JOIN_ROOM_WARNINGS,
    SHOW_EXIT_ROOM_WARNINGS,
    HIDE_EXIT_ROOM_WARNINGS,
    TOGGLE_NOTIFICATIONS_DISPLAY_FLAG,
    MUTE_CHATROOM,
    UNMUTE_CHATROOM,
    UNMUTE_ALL_CHATROOMS,
    SET_CHATLIST,
    BACKUP_CHATROOM,
    SET_CONNECTION_STATUS,
    SET_PENDING_MESSAGES,
    ENQUEUE_PENDING_MESSAGE,
    DEQUEUE_PENDING_MESSAGE,
    CLEAR_PENDING_MESSAGES,
    REASSIGN_PENDING_MESSAGES,
    SET_CATEGORIES_FILTER,
    SET_SEARCH_FILTER,
    CACHE_NICKNAME,
    REHYDRATION_COMPLETE,
    CONNECT,
    DISCONNECT,
    LISTEN_TO_RECONNECT_FAILED,
    LISTEN_TO_ERROR,
    CREATE_ROOM,
    JOIN_ROOM,
    LISTEN_TO_JOIN_ROOM,
    EXIT_ROOM,
    I_EXIT,
    LIST_ROOMS,
    VIEW_ROOM,
    LISTEN_TO_VIEW_ROOM,
    DID_BEGIN_TYPING,
    DID_STOP_TYPING,
    LISTEN_TO_START_TYPING,
    LISTEN_TO_STOP_TYPING,
    REPORT_USER,
    SEND_MESSAGE,
    ADD_REACTION,
    SET_USER_NAME,
    LISTEN_TO_SET_USER_NAME,
    FIND_COUNSELLOR,
    LISTEN_TO_FIND_COUNSELLOR,
    MY_ROOMS,
    LISTEN_TO_MY_ROOMS,
    SET_TOKEN_STATUS,
    TYPING,
    STOP_TYPING,
} from '../actions/Actions';
import {createGUID} from "../utils/GUIDGenerator";

window.navigator.userAgent = 'react-native';
const io = require('socket.io-client/socket.io');
const host = "wss://getbubblechat.com";

function socketInit() {
    var socket = io(host, {
        transports: ['websocket', 'xhr-polling'], reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000
    });
    return socket;
}

function updateRoomWithMessages(state, roomId, messages) {
  return {
    ...state,
    rooms: {
      ...state.rooms,
      data: {
        ...state.rooms.data,
        [roomId]: {
          ...state.rooms.data[roomId],
          messages: messages,
        }
      }
    }
  }
}

// Initialise State
const initialState = {
    socket: socketInit(),
    bubbleId: createGUID(),
    settings: {
        isFirstTimeUser: true,
        gender: null,
        faculty: null,
        showTutorial: true,
        showJoinRoomWarning: true,
        showExitRoomWarning: true,
        showAllNotifications: true,
        mutedChatRooms: []
    },
    chatRooms: {},
    chatList: [],
    connection: "DISCONNECTED",
    aliasId: [],
    nickNameMap: {},
    filter: null,
    search: null,
    outbox: {},
    rehydrated: false,
     // used by ChatListComponent as part of migration from state to redux
    roomList: {
      refreshing: false,
      data: [],
    },
    rooms: {
      refreshing: false,
      data: {},
    },
    myRooms: {
      refreshing: false,
      data: [],
    },
    creatingRoom: false,
    joinedRooms: [],
    typing: {},
};

// Reducer Definition
export default function Reducer(state = initialState, action) {

    switch (action.type) {
        case `${LIST_ROOMS}_PENDING`:
          return {
            ...state,
            roomList: {
              ...state.roomList,
              refreshing: true,
            },
            rooms: {
              ...state.rooms,
              refreshing: true,
            },
          }
        case `${LIST_ROOMS}_SUCCESS`:
          let rooms = {};
          action.payload.forEach(r => rooms[r.roomId] = r);

          return {
            ...state,
            roomList: {
              refreshing: false,
              data: action.payload,
            },
            rooms: {
              refreshing: false,
              data: rooms,
            },
          }
        case `${MY_ROOMS}_PENDING`:
          return {
            ...state,
            myRooms: {
              ...state.myRooms,
              refreshing: true,
            }
          }
        case `${MY_ROOMS}_SUCCESS`:
          return {
            ...state,
            myRooms: {
              refreshing: false,
              data: action.payload,
            }
          }
        case `${CREATE_ROOM}_PENDING`:
          return {
            ...state,
            creatingRoom: true,
          }
        case `${CREATE_ROOM}_SUCCESS`:
          return {
            ...state,
            roomList: {
              ...state.roomList,
              data: [action.payload, ...state.roomList.data]
            }
          }
        case `${SEND_MESSAGE}_PENDING`:
          var roomId = action.payload.roomRoomId; // note this weird key name
          var messages = state.rooms.data[roomId].messages;
          var toSend = {
            id: state.bubbleId, // random id first
            ...action.payload,
            received: false,
          };
          messages = [toSend].concat(messages);
          return updateRoomWithMessages(state, roomId, messages);

          return state;
        case `${SEND_MESSAGE}_SUCCESS`:
          // have to find the old pending message and change it
          var roomId = action.payload.roomRoomId; // note this weird key name
          var messages = state.rooms.data[roomId].messages;
          var ackedMessage = action.payload;

          if (ackedMessage.sentByMe) {
            let i = messages.findIndex(m => m.messageType === 'PENDING');
            let myMessage = {
              ...action.payload,
              userId: state.socket.id,
              received: true,
            }
            if (i >= 0) {
              messages[i] = myMessage;
            } else {
              messages = [myMessage].concat(messages);
            }
          } else {
              messages = [ackedMessage].concat(messages);
          }

          return updateRoomWithMessages(state, roomId, messages);
        case `${ADD_REACTION}_SUCCESS`:
          var roomId = action.payload.roomRoomId; // note this weird key name
          var messages = state.rooms.data[roomId].messages;
          var ackedMessage = action.payload;
          if (ackedMessage.sentByMe) {
            let i = messages.findIndex(m => m.messageType === 'PENDING');
            let myMessage = {
              ...action.payload,
              userId: state.socket.id,
            }
            if (i >= 0) {
              messages[i] = myMessage;
            } else {
              messages = [myMessage].concat(messages);
            }
          } else {
              messages = [ackedMessage].concat(messages);
          }
          return updateRoomWithMessages(state, roomId, messages);

        case TYPING:
          var roomId = action.payload.roomId;
          var oldTyping = state.typing[roomId];
          var newTyping = [];

          if (Array.isArray(oldTyping)) {
            newTyping = [action.payload.userId, ...oldTyping];
          }

          return {
            ...state,
            typing: {
              ...state.typing,
              [action.payload.roomId]: newTyping,
            }
          }

        case STOP_TYPING:
          var roomId = action.payload.roomId;
          var oldTyping = state.typing[roomId];
          var newTyping = oldTyping.filter(i => i != action.payload.userId);
          return {
            ...state,
            typing: {
              ...state.typing,
              [action.payload.roomId]: newTyping,
            }
          }

        // Settings
        case SET_FIRST_TIME_USER:
            var settings = Object.assign({}, state.settings);
            settings.isFirstTimeUser = action.flag;
            return Object.assign({}, state, {
                settings: settings
            });

        case UNSET_FIRST_TIME_USER:
            var settings = Object.assign({}, state.settings);
            settings.isFirstTimeUser = action.flag;
            return Object.assign({}, state, {
                settings: settings
            });

        case SET_GENDER:
            var settings = Object.assign({}, state.settings);
            settings.gender = action.gender;
            return Object.assign({}, state, {
                settings: settings
            });

        case SET_FACULTY:
            var settings = Object.assign({}, state.settings);
            settings.faculty = action.faculty;
            return Object.assign({}, state, {
                settings: settings
            });

        case SHOW_JOIN_ROOM_WARNINGS:
            var settings = Object.assign({}, state.settings);
            settings.showJoinRoomWarning = action.flag;
            return Object.assign({}, state, {
                settings: settings
            });

        case HIDE_JOIN_ROOM_WARNINGS:
            var settings = Object.assign({}, state.settings);
            settings.showJoinRoomWarning = action.flag;
            return Object.assign({}, state, {
                settings: settings
            });

        case SHOW_EXIT_ROOM_WARNINGS:
            var settings = Object.assign({}, state.settings);
            settings.showExitRoomWarning = action.flag;
            return Object.assign({}, state, {
                settings: settings
            });

        case HIDE_EXIT_ROOM_WARNINGS:
            var settings = Object.assign({}, state.settings);
            settings.showExitRoomWarning = action.flag;
            return Object.assign({}, state, {
                settings: settings
            });

        case TOGGLE_NOTIFICATIONS_DISPLAY_FLAG:
            var settings = Object.assign({}, state.settings);
            settings.showAllNotifications = !settings.showAllNotifications;
            return Object.assign({}, state, {
                settings: settings
            });

        case MUTE_CHATROOM:
            var roomId = action.roomId;
            if (roomId && state.settings.mutedChatRooms.indexOf(roomId) < 0) {
                var settings = Object.assign({}, state.settings);
                settings.mutedChatRooms.push(roomId);
                return Object.assign({}, state, {
                    settings: settings
                });
            }
            return state;

        case UNMUTE_CHATROOM:
            var roomId = action.roomId;
            if (roomId && state.settings.mutedChatRooms.indexOf(roomId) >= 0) {
                var settings = Object.assign({}, state.settings);
                settings.mutedChatRooms.splice(state.settings.mutedChatRooms.indexOf(roomId), 1);
                return Object.assign({}, state, {
                    settings: settings
                });
            }
            return state;

        case UNMUTE_ALL_CHATROOMS:
            var settings = Object.assign({}, state.settings);
            settings.mutedChatRooms = [];
            return Object.assign({}, state, {
                settings: settings
            });


        // Cached Chats
        case SET_CHATLIST:
            return Object.assign({}, state, {
                chatList: action.chatList
            });

        case BACKUP_CHATROOM:
            var chatRooms = Object.assign({}, state.chatRooms);
            chatRooms[action.roomId] = action.chatRoomState;
            return Object.assign({}, state, {
                chatRooms: chatRooms
            });


        // Networks
        case SET_CONNECTION_STATUS:
            if (action.status === "DISCONNECTED"
                || action.status === "CONNECTING"
                || action.status === "CONNECTED") {
                return Object.assign({}, state, {
                    connection: action.status
                });
            }
            return state;

        case SET_PENDING_MESSAGES:
            var outbox = Object.assign({}, state.outbox);
            outbox[action.roomId] = action.messages;
            return Object.assign({}, state, {
                outbox: outbox
            });

        case REASSIGN_PENDING_MESSAGES:
            if (state.connection === "CONNECTED" && state.aliasId.length > 0) {
                var outbox = Object.assign({}, state.outbox);
                outbox.keys(obj).forEach(function (key, index) {
                    for (var i = 0; i < outbox[key].length; ++i) {
                        outbox[key][i].userId = state.aliasId[0];
                    }
                });
                return Object.assign({}, state, {
                    outbox: outbox
                });
            }
            return state;
        case SET_CATEGORIES_FILTER:
            return Object.assign({}, state, {
                filter: action.categories
            });

        case SET_SEARCH_FILTER:
            return Object.assign({}, state, {
                search: action.searchTerm
            });

        // Utils
        case CACHE_NICKNAME:
            var nickNameMap = Object.assign({}, state.nickNameMap);
            if (action.userId != null && action.nickname != null) {
                nickNameMap[action.userId] = action.nickname;
            }
            return Object.assign({}, state, {
                nickNameMap: nickNameMap
            });

        // Sockets
        case CONNECT:
            if (state.connection !== "CONNECTED") {
                return Object.assign({}, state, {
                    connection: "CONNECTING"
                });
            }
            return state;
        case REHYDRATION_COMPLETE:
            return Object.assign({}, state, {
                rehydrated: true
            });

        case DISCONNECT:
            if (state.connection !== "DISCONNECTED") {
                state.socket.emit("disconnect");
            }
            return state;

        case `${JOIN_ROOM}_PENDING`:
            return state;

        case `${JOIN_ROOM}_SUCCESS`:
            // also need up update messages in rooms
          var joined = state.joinedRooms;
          var roomId = action.payload.roomId;
          if (action.payload.messages) {
            // i joined room
            joined = [roomId, ...state.joinedRooms];
          }
          var messages = state.rooms.data[roomId].messages;
          var data = {
            ...action.payload,
            messageType: 'JOIN_ROOM',
            id: state.bubbleId,
          }

          return {
            ...updateRoomWithMessages(state, roomId, [data].concat(messages)),
            joinedRooms: joined,
          }

        case `${EXIT_ROOM}_SUCCESS`:
          var joined = state.joinedRooms;
          var roomId = action.payload.roomId;
          if (action.payload.userId == state.socket.id) {
            // i exit the room
            joined = joined.filter(i => i !== roomId)
          }
          var messages = state.rooms.data[roomId].messages;
          var data = {
            ...action.payload,
            messageType: 'EXIT_ROOM',
            id: state.bubbleId,
          }
          return {
            ...updateRoomWithMessages(state, roomId, [data].concat(messages)),
            joinedRooms: joined,
          }
        case I_EXIT:
          return {
            ...state,
            joinedRooms: state.joinedRooms.filter(i => i !== roomId)
          }

        case REPORT_USER:
            state.socket.emit("report_user", action.payload);
            return state;

        case SET_USER_NAME:
            state.socket.emit("set_user_name", action.payload);
            return state;

        case LISTEN_TO_SET_USER_NAME:
            break;

        case FIND_COUNSELLOR:
            state.socket.emit("find_counsellor", action.payload);
            return state;

        case LISTEN_TO_FIND_COUNSELLOR:
            break;

        // Set connection status (Connected)
        // Insert Id

        // Call completion callback, if available
        // Handle exception with failure callback

        default:
            return state;
    }
}
