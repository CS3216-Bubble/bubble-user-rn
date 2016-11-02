import React, { Component } from 'react';
import { Text, View, PanResponder, LayoutAnimation, Platform, UIManager, TextInput } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, Footer } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import CustomTheme from '../themes/bubble';
import ChatComponent from '../components/ChatComponent';
import UserActionModalComponent from '../components/UserActionModalComponent';
import { Styles } from '../styles/Styles';
import { connect as connectRedux } from 'react-redux';
import dismissKeyboard from 'dismissKeyboard';
import { addReaction, joinRoom, sendMessage, setPendingMessages, backupChatRoom, reassignPendingMessages } from '../actions/Actions';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { generateName } from '../utils/ProfileHasher';

var _ = require('lodash');
var adjectives = require('../utils/adjectives');
var animals = require('../utils/animals');
var numAvatars = 160;

export class ChatView extends Component {
    // Initialise
    constructor(props, context) {
        super(props, context);
        this.state = {
            queue: [],
            toggleModal: false,
            modalInfo: { userId: "userId", otherUserId: "otherUserId", roomId: "roomId", otherUserName: "otherUserName" },
            someoneTyping: '',
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        // Link functions
        this.onReceiveTyping = this.onReceiveTyping.bind(this);
        this.onReceiveTypingStop = this.onReceiveTypingStop.bind(this);
        this.onEmitThanks = this.onEmitThanks.bind(this);
        this.onEmitCheers = this.onEmitCheers.bind(this);
        this.onEmitTyping = this.onEmitTyping.bind(this);
        this.onEmitTypingStop = this.onEmitTypingStop.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onTriggerModal = this.onTriggerModal.bind(this);
        this.onExit = this.onExit.bind(this);
    }

    /*  onReceiveTyping is called when someone is typing */
    onReceiveTyping(data) {
        this.setState({ someoneTyping: generateName(data.userId) });
    }

    /*  onReceiveTypingStop is called when someone stopped typing */
    onReceiveTypingStop(data) {
        this.setState({ someoneTyping: '' });
    }

    // when another user join rooms data.messageType = 'JOIN_ROOM';
    // when another user exits room data.messageType = 'EXIT_ROOM';

    onSend(message) {
      this.props.sendMessage(this.props.socket, message.roomId, message.message)
    }

    /* onSend is called when the user attempts to send a message.
       This triggers an optimistic update on the user chat, and waits for acknowledgement. */

    onEmitThanks(context) {
        var request = {
            user: context.userId,
            roomId: context.roomId,
            reaction: "THANK",
            targetUser: context.otherUserId
        };
        this.props.addReaction(this.props.socket, request);
    }

    onEmitCheers(context) {
        var request = {
            user: context.userId,
            roomId: context.roomId,
            reaction: "CHEER",
            targetUser: context.otherUserId
        };
        this.props.addReaction(this.props.socket, request);
    }

    onEmitTyping() {
        var request = {
            user: this.props.socket.id,
            roomId: this.props.roomId,
        }
        this.props.socket.emit('typing', request);
    }

    onEmitTypingStop() {
        var request = {
            user: this.props.socket.id,
            roomId: this.props.roomId,
        }
        this.props.socket.emit('stop_typing', request);
    }

    /* onTriggeModal will activate contextual options on the specific user.
       These options are presented in the form of a modal. */
    onTriggerModal(userId, otherUserId, roomId, otherUserName) {

        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        dismissKeyboard();

        this.setState({
            toggleModal: !this.state.toggleModal,
            modalInfo: { userId: userId, otherUserId: otherUserId, roomId: roomId, otherUserName: otherUserName }
        });
    }

    /* onExit is called when the user attempts to return to the previous page.
       This will not make the user leave the room */
    onExit() {
        Actions.main({ type: ActionConst.REPLACE, selectedTab: 'all' });
    }

    componentDidMount() {
      this.props.socket.on('typing', this.onReceiveTyping);
      this.props.socket.on('stop_typing', this.onReceiveTypingStop);
      if (this.props.joinedRooms.includes(this.props.chat.roomId)) {
        // alr joined, dont' join
      } else {
        this.props.joinRoom(this.props.socket, this.props.chat.roomId);
      }
    }

    componentWillUnmount() {
        this.props.socket.removeListener('typing', this.onReceiveTyping);
        this.props.socket.removeListener('stop_typing', this.onReceiveTypingStop);
    }

    render() {
        const {
          chat,
          socket,
        } = this.props;

        if (typeof socket.id == 'undefined') {
          console.log('undefined ocket');
            return (<Container>
                <Header>
                    <Button transparent onPress={this.onExit}>
                        <Icon size={30}
                            name='ios-arrow-back'
                            color="#0E7AFE" />
                    </Button>
                    <Title ellipsizeMode='middle' numberOfLines={1}>
                        <Text style={Styles.titleContainer}> Not Available </Text>
                    </Title>
                    <Button transparent onPress={() => Actions.chatInfoView({ chat: chat })}>
                        <Icon size={32}
                            name='ios-information-circle-outline'
                            color="#0E7AFE" />
                    </Button>
                </Header>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text>You're offline! Come back later.</Text>
                </View>
            </Container>);
        } else if (chat == null) {
          console.log('chat is null');
            // When chat is not yet available, display placeholder and|or loader
            return null;
        } else if (Platform.OS === 'ios') {
            return (
                <Container>
                    <Header>
                        <Button transparent onPress={this.onExit}>
                            <Icon size={30}
                                name='ios-arrow-back'
                                color="#0E7AFE" />
                        </Button>
                        <Title ellipsizeMode='middle' numberOfLines={1}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 200, height: 28 }}>
                                <TextInput style={Styles.titleContainer} note maxLength={20} editable={false} value={chat.roomName} />
                                {(this.state.someoneTyping !== '') ? <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "300" }}>
                                        {this.state.someoneTyping}is typing...
      </Text>
                                </View> : []}
                            </View>
                        </Title>
                        <Button transparent onPress={() => Actions.chatInfoView({ chat: chat })}>
                            <Icon size={32}
                                name='ios-information-circle-outline'
                                color="#0E7AFE" />
                        </Button>
                    </Header>
                    <View style={{ flex: 1 }}>
                        <ChatComponent key={chat.roomId}
                            onSend={this.onSend}
                            onTriggerModal={this.onTriggerModal}
                            messages={this.props.messages}
                            roomId={this.props.roomId}
                            user={this.props.socket.id}
                            myIds={this.props.aliasId}
                            style={{ flex: 1 }}
                            onTyping={this.onEmitTyping}
                            onTypingStop={this.onEmitTypingStop}
                            />
                        <UserActionModalComponent
                            toggle={this.state.toggleModal}
                            modalInfo={this.state.modalInfo}
                            onThanks={this.onEmitThanks}
                            onCheers={this.onEmitCheers} />
                    </View>
                </Container>
            );
        }

        else {
            return (
                <Container theme={CustomTheme}>
                    <Header>
                        <Button transparent onPress={this.onExit}>
                            <Icon size={30}
                                name='ios-arrow-back'
                                color="#0E7AFE" />
                        </Button>
                        <Title ellipsizeMode='middle' numberOfLines={1}>
                            {chat.roomName}
                        </Title>
                        <Button transparent onPress={() => Actions.chatInfoView({ chat: chat })}>
                            <Icon size={32}
                                name='ios-information-circle-outline'
                                color="#0E7AFE" />
                        </Button>
                    </Header>
                    <View style={{ flex: 1 }}>
                        <ChatComponent key={chat.roomId}
                            onSend={this.onSend}
                            onTriggerModal={this.onTriggerModal}
                            messages={this.props.messages}
                            roomId={this.props.roomId}
                            user={this.props.bubbleId}
                            style={{ flex: 1 }}
                            myIds={this.props.aliasId}
                            onTyping={this.onEmitTyping}
                            onTypingStop={this.onEmitTypingStop}
                            />
                        <UserActionModalComponent
                            toggle={this.state.toggleModal}
                            modalInfo={this.state.modalInfo}
                            onThanks={this.onEmitThanks}
                            onCheers={this.onEmitCheers} />
                    </View>
                </Container>
            );
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    var outboxCached = [];
    if (state.outbox[ownProps.roomId]) {
        outboxCached = state.outbox[ownProps.roomId];
    }

    return {
        socket: state.socket,
        bubbleId: state.socket.id,
        aliasId: state.aliasId,
        outbox: outboxCached,
        chat: state.rooms.data[ownProps.roomId],
        messages: state.rooms.data[ownProps.roomId].messages,
        joinedRooms: state.joinedRooms,
    }
        ;
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveUnsentMsgs: (messages) => { dispatch(setPendingMessages(messages, ownProps.roomId)) },
        saveChatSession: (chat) => { dispatch(backupChatRoom(ownProps.roomId, chat)) },
        reassignOutbox: () => { dispatch(reassignPendingMessages()) },
        sendMessage: (...args) => dispatch(sendMessage(...args)),
        addReaction: (...args) => dispatch(addReaction(...args)),
        joinRoom: (...args) => dispatch(joinRoom(...args)),
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatView);
