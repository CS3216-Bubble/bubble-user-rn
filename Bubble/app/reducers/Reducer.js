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
    BACKUP_CHATROOM,
    SET_CONNECTION_STATUS,
    SET_PENDING_MESSAGES,
    ENQUEUE_PENDING_MESSAGE,
    DEQUEUE_PENDING_MESSAGE,
    CLEAR_PENDING_MESSAGES,
    REASSIGN_PENDING_MESSAGES,
    SET_CATEGORIES_FILTER,
    SET_SEARCH_FILTER,
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
    HYDRATE_PENDING,
    HYDRATE_SUCCESS,
    CONNECT_SOCKET,
    MY_ID,
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
    socket: null,
    bubbleId: null,
    token: createGUID(),
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
    connection: "DISCONNECTED",
    aliasId: [],
    filter: null,
    search: null,
    outbox: {},
    rehydrated: false,
     // used by ChatListComponent as part of migration from state to redux
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
    hydrating: false,
};

// Reducer Definition
export default function Reducer(state = initialState, action) {

    switch (action.type) {
        case CONNECT_SOCKET:
          return {
            ...state,
            socket: action.socket,
          }
        case MY_ID:
          return {
            ...state,
            bubbleId: action.payload,
          }

        case HYDRATE_PENDING:
          return {
            ...state,
            hydrating: true,
          }
        case HYDRATE_SUCCESS:
          if (Object.keys(action.payload).length === 0) {
            return state;
          }

          return {
            ...state,
            ...action.payload,
            hydrating: false,
          }

        case `${LIST_ROOMS}_PENDING`:
          return {
            ...state,
            rooms: {
              ...state.rooms,
              refreshing: true,
            },
          }
        case `${LIST_ROOMS}_SUCCESS`:
          let roomsById = {};
          action.payload.forEach(r => roomsById[r.roomId] = r);

          return {
            ...state,
            rooms: {
              refreshing: false,
              data: roomsById, // overwrite all data
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
            joinedRooms: [action.payload.roomId, ...state.joinedRooms],
            rooms: {
              ...state.rooms,
              data: {
                ...state.rooms.data,
                [action.payload.roomId]: action.payload,
              }
            }
          }
        case `${SEND_MESSAGE}_PENDING`:
          var roomId = action.payload.roomRoomId; // note this weird key name
          var messages = state.rooms.data[roomId].messages || [];
          var toSend = {
            ...action.payload,
            bubbleId: state.bubbleId,
            id: createGUID(), // random id first
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
              bubbleId: state.bubbleId,
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
              bubbleId: state.bubbleId,
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
            newTyping = [action.payload.bubbleId, ...oldTyping];
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
          var newTyping = oldTyping.filter(i => i != action.payload.bubbleId);
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
            if (!state.joinedRooms.includes(roomId)) {
              joined = [roomId, ...state.joinedRooms];
            }
          }
          var messages = state.rooms.data[roomId].messages;
          var data = {
            messageType: 'JOIN_ROOM',
            id: createGUID(),
            roomRoomId: action.payload.roomId,
            bubbleId: action.payload.bubbleId,
          };
          return {
            ...updateRoomWithMessages(state, roomId, [data].concat(messages)),
            joinedRooms: joined,
          }

        case `${EXIT_ROOM}_SUCCESS`:
          var joined = state.joinedRooms;
          var roomId = action.payload.roomId;
          if (action.payload.bubbleId == state.bubbleId) {
            // i exit the room
            joined = joined.filter(i => i !== roomId)
          }
          var messages = state.rooms.data[roomId].messages;
          var data = {
            messageType: 'EXIT_ROOM',
            id: createGUID(),
            roomRoomId: action.payload.roomId,
            bubbleId: action.payload.bubbleId,
          };
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
