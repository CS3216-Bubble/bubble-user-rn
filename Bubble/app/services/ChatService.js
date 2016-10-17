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

        this.socket.on('connect', () => {
            console.log('connected!');
        });

        this.socket.on('list_rooms', function (data) {
            console.log('list rooms', data);
        })

        this.socket.on('create_room', function (data) {
            console.log('create room', data);
        })

        this.socket.on('add_message', function (data) {
            console.log('add message', data);
        })

        this.socket.on('bubble_error', function (data) {
            console.log('error', data);
        })
    }

    createRoom(chat) {
        this.socket.emit('create_room', chat);
    }

    listRooms(user) {
        this.socket.emit('list_rooms', user);
    }
}






// OLD

// Manually join namespace. Ex: namespace is now partyRoom 
// socket.joinNamespace('partyRoom')

// Leave namespace, back to '/' 
// socket.leaveNamespace()

// Emit an event to server 
// socket.emit('helloWorld', {some: 'data'});

//Disconnect from server 
// socket.disconnect();

// Reconnect to a closed socket 
// socket.reconnect();


// this.socket = io('http://localhost:3000', {
        // this.socket = io('localhost:3000', {
        //     transports: ['websocket'] // you need to explicitly tell it to use websockets
        // });

        // this.socket.on('connect', () => {
        //     console.log('connected!');
        // });

        // this.socket.on('list_rooms', function (data) {
        //     console.log('list rooms', data);
        //     // if (data instanceof Array) {
        //     //     for (let chat of data) {
        //     //         this.chats.push(new Chat(chat));
        //     //     }
        //     // }
        // })

        // this.socket.on('create_room', function (data) {
        //     console.log('create room', data);
        // })

        // this.socket.on('add_message', function (data) {
        //     console.log('add message', data);
        // })

        // this.socket.on('bubble_error', function (data) {
        //     console.log('error', data);
        // })
    // }

    // now you can use sockets with this.socket.io(...)
    // or any other functionality within socket.io!


    // addChat(chat) {
    //     this.socket.emit('create_room', chat);
    // }

    // listRooms(user) {
    //     this.socket.emit('list_rooms', user);
    // }

    // joinChat(roomId) {
    //     this.socket.emit('join_room', {
    //         roomId,
    //     });
    //     this.currentRoom = roomId;
    // }

    // updateChatById(roomId: string, values: Object = {}): Chat {
    //     let chat = this.getChatById(roomId);
    //     if (!chat) {
    //         return null;
    //     }
    //     (<any>Object).assign(chat, values);
    //     return chat;
    //   }

    //   getAllChats(): Chat[] {
    //             this.socket.emit('list_rooms');
    //         return this.chats;
    //   }

    //   getChatById(roomId: string): Chat {
    //     return this.chats
    //       .filter(chat => chat.roomId == roomId)
    //       .pop();
    //   }

    //   createMessage(userId: string, message: string) {
    //             this.socket.emit('add_message', {
    //                 roomId: this.currentRoom,
    //                 message,
    //             });
    //   }