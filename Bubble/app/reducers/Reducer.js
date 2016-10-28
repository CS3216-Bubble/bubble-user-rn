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
    ENQUEUE_PENDING_MESSAGE,
    DEQUEUE_PENDING_MESSAGE,
    CLEAR_PENDING_MESSAGES,
    REASSIGN_PENDING_MESSAGES,
    SET_CATEGORIES_FILTER,
    SET_SEARCH_FILTER,
    CACHE_NICKNAME,
    CACHE_USER_ID,
    CONNECT,
    DISCONNECT,
    LISTEN_TO_CONNECT,
    LISTEN_TO_DISCONNECT,
    LISTEN_TO_TIMEOUT,
    LISTEN_TO_ERROR,
    CREATE_ROOM,
    LISTEN_TO_CREATE_ROOM,
    JOIN_ROOM,
    LISTEN_TO_JOIN_ROOM,
    EXIT_ROOM,
    LISTEN_TO_EXIT_ROOM,
    LIST_ROOMS,
    LISTEN_TO_LIST_ROOMS,
    VIEW_ROOM,
    LISTEN_TO_VIEW_ROOM,
    DID_BEGIN_TYPING,
    DID_STOP_TYPING,
    LISTEN_TO_START_TYPING,
    LISTEN_TO_STOP_TYPING,
    REPORT_USER,
    SEND_MESSAGE,
    LISTEN_TO_SEND_MESSAGE,
    SEND_REACTION,
    LISTEN_TO_SEND_REACTION,
    SET_USER_NAME,
    LISTEN_TO_SET_USER_NAME,
    FIND_COUNSELLOR,
    LISTEN_TO_FIND_COUNSELLOR,
    CLAIM_ID,
    LISTEN_TO_CLAIM_ID
} from '../actions/Actions';

window.navigator.userAgent = 'ReactNative';
const io = require('socket.io-client/socket.io');
const host = "http://getbubblechat.com/";

function socketInit() {
    socket = io(host, { transports: ['websocket'] });
    return socket;
}

// Initialise State
const initialState = {
    socket: socketInit(),
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
    chatList: {},
    connection: "DISCONNECTED",
    aliasId: [],
    nickNameMap: {},
    filter: null,
    search: null,
    outbox: []
};

// Reducer Definition
export default function Reducer(state = initialState, action) {

    switch (action.type) {


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
        case ENQUEUE_PENDING_MESSAGE:
            var outbox = Object.assign({}, state.outbox);
            outbox.push(action.message);
            return Object.assign({}, state, {
                outbox: outbox
            });

        case DEQUEUE_PENDING_MESSAGE:
            var outbox = Object.assign({}, state.outbox);
            for (var i = 0; i < outbox.length; ++i) {
                if (message.content == outbox[i].content) {
                    outbox.splice(outbox, i);
                    return Object.assign({}, state, {
                        outbox: outbox
                    });
                }
            }
            return state;
        case CLEAR_PENDING_MESSAGES:
            return Object.assign({}, state, {
                outbox: []
            });

        case REASSIGN_PENDING_MESSAGES:
            if (state.connection === "CONNECTED") {
                var outbox = Object.assign({}, state.outbox);
                for (var i = 0; i < outbox.length; ++i) {
                    outbox[i].userId = state.socket.id;
                }
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

        case CACHE_NICKNAME:
            var nickNameMap = Object.assign({}, state.nickNameMap);
            if (action.userId != null && action.nickname != null) {
                nickNameMap[action.userId] = action.nickname;
            }
            return Object.assign({}, state, {
                nickNameMap: nickNameMap
            });

        case CACHE_USER_ID:
            var aliasId = Object.assign({}, state.aliasId);
            if (action.userId) {
                aliasId.unshift(action.userId);
                return Object.assign({}, state, {
                    aliasId: aliasId
                });
            }
            return state;


        // Sockets
        case CONNECT:
            break;

        case DISCONNECT:
            break;

        case LISTEN_TO_CONNECT:
            break;

        case LISTEN_TO_DISCONNECT:
            break;

        case LISTEN_TO_TIMEOUT:
            break;

        case LISTEN_TO_ERROR:
            break;

        case CREATE_ROOM:
            break;

        case LISTEN_TO_CREATE_ROOM:
            break;

        case JOIN_ROOM:
            break;

        case LISTEN_TO_JOIN_ROOM:
            break;

        case EXIT_ROOM:
            break;

        case LISTEN_TO_EXIT_ROOM:
            break;

        case LIST_ROOMS:
            break;

        case LISTEN_TO_LIST_ROOMS:
            break;

        case VIEW_ROOM:
            break;

        case LISTEN_TO_VIEW_ROOM:
            break;

        case DID_BEGIN_TYPING:
            break;

        case DID_STOP_TYPING:
            break;

        case LISTEN_TO_START_TYPING:
            break;

        case LISTEN_TO_STOP_TYPING:
            break;

        case REPORT_USER:
            break;

        case SEND_MESSAGE:
            break;

        case LISTEN_TO_SEND_MESSAGE:
            break;

        case SEND_REACTION:
            break;

        case LISTEN_TO_SEND_REACTION:
            break;

        case SET_USER_NAME:
            break;

        case LISTEN_TO_SET_USER_NAME:
            break;

        case FIND_COUNSELLOR:
            break;

        case LISTEN_TO_FIND_COUNSELLOR:
            break;

        case CLAIM_ID:
            break;

        case LISTEN_TO_CLAIM_ID:
            break;

        default:
            return state;
    }
}

