import { Component } from 'react';
import React, { Platform } from 'react-native';

window.navigator.userAgent = 'ReactNative';
const io = require('socket.io-client/socket.io');

var host = "";

// iOS LOCALHOST
// if (Platform.OS === 'ios') {
//     host = 'http://localhost:3000';
// }

// // ANDROID LOCALHOST
// else {
//     host = "http://10.0.2.2:3000";
// }

host = "http://ec2-52-77-222-46.ap-southeast-1.compute.amazonaws.com/";

const initialState = {
    socket: socketBuilder()
};

export default function BubbleSocketReducer(state = initialState, action) {

    switch (action.type) {
        case 'CONNECT':
            state.socket.connect();
            return state;

        case 'DISCONNECT':
            state.socket.disconnect();
            return state;

        case 'CREATE_ROOM':
            state.socket.emit('create_room', action.newChat);
            return state;

        case 'JOIN_ROOM':
            state.socket.emit('join_room', action.joinRequest);
            return state;

        case 'EXIT_ROOM':
            state.socket.emit('exit_room', action.exitRequest);
            return state;

        case 'LIST_ROOMS':
            state.socket.emit('list_rooms', action.userIdentity);
            return state;

        case 'VIEW_ROOM':
            state.socket.emit('view_room', action.viewRequest);
            return state;

        case 'DID_BEGIN_TYPING':
            state.socket.emit('typing', action.typeStatusBroadcast);
            return state;

        case 'DID_STOP_TYPING':
            state.socket.emit('stop_typing', action.typeStatusBroadcast);
            return state;

        case 'REPORT_USER':
            state.socket.emit('report_user', action.flagReport);
            return state;

        case 'SEND_MESSAGE':
            state.socket.emit('add_message', action.message);
            return state;

        case 'SEND_REACTION':
            state.socket.emit('add_reaction', action.reaction);
            return state;

        case 'SET_USERNAME':
            state.socket.emit('set_user_name', action.username);
            return state;

        case 'FIND_COUNSELLOR':
            state.socket.emit('find_counsellor', action.userId);
            return state;

        default:
            return state;
    }
}


function socketBuilder() {

    // Need to require instead of import so we can set the user agent first
    socket = io(host, { transports: ['websocket'] });

    /*** Listeners ***/

    socket.on('connect', () => {
        console.log('connected!');
    });

    socket.on('disconnect', () => {
        console.log('disconnected!');
    });

    // generic error listener
    socket.on('bubble_error', function (data) {
        console.log('error!', data);
    })

    return socket;
}

// // OLD STUFF
// // createRoom emits a response:
    // //     roomId: string
    // socket.on('create_room', function (data) {
    //     console.log('created room!', data);
    // })

    // // joinRoom emits a response:
    // //     roomId: string
    // //     user: string
    // socket.on('join_room', function (data) {
    //     console.log('joined room!', data);
    // })

    // // exitRoom emits a response:
    // //     roomId: string
    // //     user: string
    // socket.on('exit_room', function (data) {
    //     console.log('exited room!', data);
    // })

    // listRooms emits a response:
    //     rooms: string[]
    // socket.on('list_rooms', function (data) {
    //     console.log('listed rooms!', data);
    // })

    // // listRooms emits a response:
    // //     roomId: string
    // //     roomName: string
    // //     roomType: number
    // //     userLimit: number
    // //     roomDescription: string
    // //     categories: string[]
    // //     numUsers: number
    // //     lastActive: Date
    // socket.on('view_room', function (data) {
    //     console.log('viewed room!', data);
    // })

    // // didBeginTyping emits a response:
    // //     roomId: string,
    // //     user: string
    // socket.on('typing', function (data) {
    //     console.log('is typing!', data);
    // })

    // // didEndTyping emits a response:
    // //     roomId: string,
    // //     user: string
    // socket.on('stop_typing', function (data) {
    //     console.log('stopped typing!', data);
    // })

    // // sendMessage emits a response:
    // //     user: string
    // //     roomId: string
    // //     message: string
    // socket.on('add_message', function (data) {
    //     console.log('message sent!', data);
    // })

    // // sendReaction emits a response:
    // //     user: string
    // //     roomId: string
    // //     reaction: string
    // socket.on('add_reaction', function (data) {
    //     console.log('reaction sent!', data);
    // })

    // // setUsername emits a response:
    // //     userId: string
    // //     newName: string
    // socket.on('set_user_name', function (data) {
    //     console.log('username set!', data);
    // })

    // // setUsername emits a response:
    // //     counsellorId: string
    // //     counsellorName: string
    // //     roomId: string
    // //     roomName: string
    // //     roomType: number
    // //     userLimit: number
    // //     roomDescription: string
    // //     categories: string[]
    // //     numUsers: number
    // //     lastActive: Date
    // socket.on('find_counsellor', function (data) {
    //     console.log('found a counsellor!', data);
    // })