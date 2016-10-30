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
    CACHE_USER_ID,
    SET_CLAIM_TOKEN,
    REHYDRATION_COMPLETE,
    CONNECT,
    DISCONNECT,
    LISTEN_TO_CONNECT,
    LISTEN_TO_DISCONNECT,
    LISTEN_TO_TIMEOUT,
    LISTEN_TO_RECONNECTING,
    LISTEN_TO_RECONNECT_FAILED,
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
    LISTEN_TO_CLAIM_ID,
    MY_ROOMS,
    LISTEN_TO_MY_ROOMS,
    REMOVE_LISTENERS,
    SET_TOKEN_STATUS
} from '../actions/Actions';

window.navigator.userAgent = 'ReactNative';
const io = require('socket.io-client/socket.io');
const host = "http://getbubblechat.com/";

function socketInit() {
    socket = io(host, {
        transports: ['websocket'], reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000
    });
    return socket;
}

function guid() {

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    console.log(uuid);
    return uuid;
}

const initUUID = guid();

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
    chatList: [],
    connection: "DISCONNECTED",
    aliasId: [],
    nickNameMap: {},
    filter: null,
    search: null,
    outbox: {},
    rehydrated: false,
    claimToken: initUUID,
    claimed: false
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

        case SET_PENDING_MESSAGES:
            var outbox = Object.assign({}, state.outbox);
            outbox[action.roomId] = action.messages;
            return Object.assign({}, state, {
                outbox: outbox
            });

        // case ENQUEUE_PENDING_MESSAGE:
        //     var outbox = Object.assign({}, state.outbox);
        //     outbox.push(action.message);
        //     return Object.assign({}, state, {
        //         outbox: outbox
        //     });

        // case DEQUEUE_PENDING_MESSAGE:
        //     var outbox = Object.assign({}, state.outbox);
        //     for (var i = 0; i < outbox.length; ++i) {
        //         if (message.content == outbox[i].content) {
        //             outbox.splice(outbox, i);
        //             return Object.assign({}, state, {
        //                 outbox: outbox
        //             });
        //         }
        //     }
        //     return state;
        // case CLEAR_PENDING_MESSAGES:
        //     return Object.assign({}, state, {
        //         outbox: {}
        //     });

        case REASSIGN_PENDING_MESSAGES:
            if (state.connection === "CONNECTED" && state.aliasId.length > 0) {
                var outbox = Object.assign({}, state.outbox);
                outbox.keys(obj).forEach(function (key, index) {
                    for (var i = 0; i < outbox[key].length; ++i) {
                        outbox[key][i].userId = state.aliasId[0];
                        // console.log("HOORARH:", key, i, outbox[key][i]);
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

        case CACHE_USER_ID:
            return Object.assign({}, state, {
                aliasId: [action.userId, ...state.aliasId],
            });
            return state;

        case SET_CLAIM_TOKEN:
            return Object.assign({}, state, {
                claimToken: action.token
            });
        case 'claim_id_PENDING':
            return Object.assign({}, state, {
              claim_pending: true,
            });
        case 'claim_id_SUCCESS':
            return Object.assign({}, state, {
              claimed: true,
              claim_pending: false,
            });
        case 'set_claim_token_SUCCESS':
            return Object.assign({}, state, {
              claimToken: action.claimToken,
            });
        case SET_TOKEN_STATUS:
            return Object.assign({}, state, {
                claimed: action.claimed
            });

        // Sockets
        case CONNECT:
            if (state.connection !== "CONNECTED") {
                // console.log(state.socket.connect);
                state.socket.connect();
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

        case LISTEN_TO_CONNECT:
            /* To-do in the callback:
                1. Set socket listeners for other primary events
                2. Attempt to claim id if previous id exists
                3. Set connection status
                4. Save current id
            */
            state.socket.on("connect", action.callback);
            return state;
        case LISTEN_TO_DISCONNECT:
            /* To-do:
                1. Set connection status
            */
            state.socket.on("disconnect", action.callback);
            return state;
        case LISTEN_TO_TIMEOUT:
            state.socket.on("timeout", action.callback);
            return state;

        case LISTEN_TO_RECONNECTING:
            /* To-do:
                1. Set connection status
            */
            state.socket.on("reconnecting", action.callback);
            return state;

        case LISTEN_TO_RECONNECT_FAILED:
            /* To-do:
                1. Set connection status
            */
            state.socket.on("reconnect_failed", action.callback);
            return state;

        case LISTEN_TO_ERROR:
            // Handle cases:
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
            state.socket.on("bubble_error", action.callback);
            return state;

        case CREATE_ROOM:
            state.socket.emit("create_room", action.payload);
            return state;

        case LISTEN_TO_CREATE_ROOM:
            state.socket.on("create_room", action.callback);
            return state;

        case JOIN_ROOM:
            state.socket.emit("join_room", action.payload);
            return state;

        case LISTEN_TO_JOIN_ROOM:
            state.socket.on("join_room", action.callback);
            return state;

        case EXIT_ROOM:
            state.socket.emit("exit_room", action.payload);
            return state;

        case LISTEN_TO_EXIT_ROOM:
            state.socket.on("exit_room", action.callback);
            return state;

        case LIST_ROOMS:
            state.socket.emit("list_rooms", action.payload);
            return state;

        case LISTEN_TO_LIST_ROOMS:
            state.socket.on("list_rooms", action.callback);
            return state;

        case VIEW_ROOM:
            state.socket.emit("view_room", action.payload);
            return state;

        case LISTEN_TO_VIEW_ROOM:
            state.socket.on("view_room", action.callback);
            return state;

        case DID_BEGIN_TYPING:
            state.socket.emit("typing", action.payload);
            return state;

        case DID_STOP_TYPING:
            state.socket.emit("stop_typing", action.payload);
            return state;

        case LISTEN_TO_START_TYPING:
            state.socket.on("typing", action.callback);
            return state;

        case LISTEN_TO_STOP_TYPING:
            state.socket.on("stop_typing", action.callback);
            return state;

        case REPORT_USER:
            state.socket.emit("report_user", action.payload);
            return state;

        case SEND_MESSAGE:
            state.socket.emit("add_message", action.payload);
            return state;

        case LISTEN_TO_SEND_MESSAGE:
            state.socket.on("add_message", action.callback);
            return state;

        case SEND_REACTION:
            state.socket.emit("add_reaction", action.payload);
            return state;

        case LISTEN_TO_SEND_REACTION:
            state.socket.on("add_reaction", action.callback);
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

        case CLAIM_ID:
            state.socket.emit("claim_id", action.payload);
            return state;

        case LISTEN_TO_CLAIM_ID:
            state.socket.on("claim_id", action.callback);
            return state;
        // Set connection status (Connected)
        // Insert Id

        // Call completion callback, if available
        // Handle exception with failure callback


        case MY_ROOMS:
            state.socket.emit("my_rooms");
            return state;

        case LISTEN_TO_MY_ROOMS:
            state.socket.on("my_rooms", action.callback);
            return state;

        case REMOVE_LISTENERS:
            action.callback(state.socket);
            return state;

        default:
            return state;
    }
}

