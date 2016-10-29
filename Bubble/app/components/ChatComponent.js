import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Button } from 'native-base';
import { Styles } from '../styles/Styles';
import { Actions } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';

var adjectives = require('../utils/adjectives');
var animals = require('../utils/animals');
var numAvatars = 160;

export default class ChatComponent extends Component {

    // Initialise
    constructor(props, context) {
        super(props, context);
        this.state = { messages: [] };
        this.onSend = this.onSend.bind(this);
        this.parseMessages = this.parseMessages.bind(this);
        this.hashID = this.hashID.bind(this);
        this.generateName = this.generateName.bind(this);
        this.generateAvatar = this.generateAvatar.bind(this);
    }

    // Initial update
    componentDidMount() {
        this.setState({ messages: this.parseMessages(this.props.messages) });
    }

    // Subsequent updates
    componentWillReceiveProps(props) {
        this.setState({ messages: this.parseMessages(props.messages) });
    }

    hashID(userId) {
        var hash = 0;
        if (userId && userId.length != 0) {
            for (i = 0; i < userId.length; i++) {
                char = userId.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
        }
        return hash;
    }

    // Name generator
    generateName(userId) {
        var hashCode = this.hashID(userId);
        var adj = adjectives.adjectives;
        var ani = animals.animals;
        // Get adjective
        var adjective = adj[((hashCode % adj.length) + adj.length) % adj.length];
        // Get animal
        var animal = ani[((hashCode % ani.length) + ani.length) % ani.length];
        // Return result
        return adjective + " " + animal;
    }

    // Avatar generator
    generateAvatar(userId) {
        var hashCode = this.hashID(userId);
        // Get animal
        var avatarIndex = (((hashCode % numAvatars) + numAvatars) % numAvatars) + 1;
        // Return result
        return ("image!" + avatarIndex.toString());
    }

    // For converting API form to GiftedChat form
    parseMessages(messages) {
        var parsed = [];

        // Only parse when messages are valid
        if (messages) {
            for (var i = 0; i < messages.length; ++i) {
                var messageOrg = messages[i];
                var avatar = 'http://flathash.com/' + messageOrg.userId;
                // var avatar = 'http://api.adorable.io/avatar/' + messageOrg.userId;

                var messageParsed = {
                    _id: messageOrg.id,
                    text: messageOrg.content,
                    createdAt: messageOrg.createdAt,
                    type: messageOrg.messageType,
                    sent: messageOrg.messageType != "OPTIMISTIC-MESSAGE",
                    received: false,
                    target: messageOrg.targetUser,
                    user: {
                        _id: messageOrg.userId,
                        name: this.generateName(messageOrg.userId),
                        avatar: avatar,
                    },
                };
                parsed.push(messageParsed);
            }
        }
        return parsed;
    }

    // Use parent callback to send message
    onSend(messages = []) {
        var message = messages[0];
        var parsedMessage = {
            roomId: this.props.roomId,
            user: this.props.user,
            message: message.text
        };
        this.props.onSend(parsedMessage);
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{ _id: this.props.user }}
                isAnimated={true}
                onAvatarPress={(otherUserId, otherUserName) => { this.props.onTriggerModal(this.props.user, otherUserId, this.props.roomId, otherUserName) } }
                />
        );
    }
}