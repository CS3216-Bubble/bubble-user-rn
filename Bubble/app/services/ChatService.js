import { Component } from 'react';
import React from 'react-native';

window.navigator.userAgent = 'ReactNative';

export default class ChatService extends Component {

    constructor() {

        super();

        // Need to require instead of import so we can set the user agent first
        const io = require('socket.io-client/socket.io');
        const host = 'http://localhost:3000';
        this.socket = io(host, { transports: ['websocket'] });

        /*** Listeners ***/

        this.socket.on('connect', () => {
            console.log('connected!');
        });

        // createRoom emits a response:
        //     roomId: string
        this.socket.on('create_room', function (data) {
            console.log('created room!', data);
        })

        // joinRoom emits a response:
        //     roomId: string
        //     user: string
        this.socket.on('join_room', function (data) {
            console.log('joined room!', data);
        })

        // exitRoom emits a response:
        //     roomId: string
        //     user: string
        this.socket.on('exit_room', function (data) {
            console.log('exited room!', data);
        })

        // listRooms emits a response:
        //     rooms: string[]
        this.socket.on('list_rooms', function (data) {
            console.log('listed rooms!', data);
        })

        // listRooms emits a response:
        //     roomId: string
        //     roomName: string
        //     roomType: number
        //     userLimit: number
        //     roomDescription: string
        //     categories: string[]
        //     numUsers: number
        //     lastActive: Date
        this.socket.on('view_room', function (data) {
            console.log('viewed room!', data);
        })

        // didBeginTyping emits a response:
        //     roomId: string,
        //     user: string
        this.socket.on('typing', function (data) {
            console.log('is typing!', data);
        })

        // didEndTyping emits a response:
        //     roomId: string,
        //     user: string
        this.socket.on('stop_typing', function (data) {
            console.log('stopped typing!', data);
        })

        // sendMessage emits a response:
        //     user: string
        //     roomId: string
        //     message: string
        this.socket.on('add_message', function (data) {
            console.log('message sent!', data);
        })

        // sendReaction emits a response:
        //     user: string
        //     roomId: string
        //     reaction: string
        this.socket.on('add_reaction', function (data) {
            console.log('reaction sent!', data);
        })

        // setUsername emits a response:
        //     userId: string
        //     newName: string
        this.socket.on('set_user_name', function (data) {
            console.log('username set!', data);
        })

        // setUsername emits a response:
        //     counsellorId: string
        //     counsellorName: string
        //     roomId: string
        //     roomName: string
        //     roomType: number
        //     userLimit: number
        //     roomDescription: string
        //     categories: string[]
        //     numUsers: number
        //     lastActive: Date
        this.socket.on('find_counsellor', function (data) {
            console.log('found a counsellor!', data);
        })

        // generic error listener
        this.socket.on('bubble_error', function (data) {
            console.log('error!', data);
        })
    }

    // createRoom requires payload:
    //     user: string,
    //     roomName: string,
    //     roomDescription: string,
    //     userLimit: number,
    //     categories: string[]
    createRoom(newChat) {
        this.socket.emit('create_room', newChat);
    }

    // joinRoom requires payload:
    //     roomId: string,
    //     user: string
    joinRoom(joinRequest) {
        this.socket.emit('join_room', joinRequest);
    }

    // exitRoom requires payload:
    //     roomId: string,
    //     user: string
    exitRoom(exitRequest) {
        this.socket.emit('exit_room', exitRequest);
    }

    // listRooms requires payload:
    //     user: string
    listRooms(userIdentity) {
        this.socket.emit('list_rooms', userIdentity);
    }

    // viewRoom requires payload:
    //     roomId: string,
    //     user: string
    viewRoom(viewRequest) {
        this.socket.emit('view_room', viewRequest);
    }

    // didBeginTyping requires payload:
    //     roomId: string,
    //     user: string
    didBeginTyping(typeStatusBroadcast) {
        this.socket.emit('typing', typeStatusBroadcast);
    }

    // didStopTyping requires payload:
    //     roomId: string,
    //     user: string
    didStopTyping(typeStatusBroadcast) {
        this.socket.emit('stop_typing', typeStatusBroadcast);
    }

    // reportUser requires payload:
    //     user: string
    //     userToReport: string
    //     roomId: string
    //     reason: string
    reportUser(flagReport) {
        this.socket.emit('report_user', flagReport);
    }

    // addMessage requires payload:
    //     roomId: string
    //     user: string
    //     message: string
    sendMessage(message) {
        this.socket.emit('add_message', message);
    }

    // sendReaction requires payload:
    //     user: string
    //     roomId: string
    //     reaction: string
    sendReaction(reaction) {
        this.socket.emit('add_reaction', reaction);
    }

    // setUsername requires payload:
    //     userId: string
    //     newName: string
    setUsername(username) {
        this.socket.emit('set_user_name', username);
    }

    // findCounsellor requires payload:
    //     userId: string
    findCounsellor(userId) {
        this.socket.emit('find_counsellor', userId);
    }
}