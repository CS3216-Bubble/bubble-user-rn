import React, { Component, PropTypes } from 'react';
import { Image, Text, View, TouchableHighlight, ScrollView, RefreshControl, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';
import { ChatListItemComponent } from './ChatListItemComponent';
import { Styles } from '../styles/Styles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import moment from 'moment';

export class CategoryDetailComponent extends Component {
    static propTypes = {
      selectedCategory: PropTypes.string,
    }

    updateList = (data) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ roomList: data, refreshing: false });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          roomList: [],
          refreshing: false,
          selectedCategory: props.selectedCategory ? props.selectedCategory : '',
        };
        this.updateList = this.updateList.bind(this);

         if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.props.socket.connect();
        this.props.socket.emit("list_rooms", { user: this.props.socket.id });
    }

    componentDidMount() {
        // > View Specific Listeners
        this.props.socket.on('list_rooms', this.updateList);
        this.props.socket.connect();
        this.props.socket.emit("list_rooms", { user: this.props.socket.id });
    }

    componentWillUnmount() {
        this.props.socket.removeListener('list_rooms', this.updateList);
    }

    componentWillReceiveProps(props) {
        // console.log("CHATLISTCOMPONENT RECEIVES PROPS", props);
        this.props.socket.connect();
        this.props.socket.emit("list_rooms", { user: this.props.socket.id });
    }

    updateSelectedCategory = (category) => {
       Actions.refresh({selectedCategory: category});
       this.setState({selectedCategory: category});
    }

    render() {
        var userId = this.props.socket.id;

        var chatRooms = this.state.roomList.slice();

        chatRooms.sort(function(a, b) {
                return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
            });

        // Create list of chats to show
        const chatsToShow = chatRooms.map(function(chat) {
          const chatContainsSelectedCategory =
              (this.state.selectedCategory === '' ||
              chat.categories.indexOf(this.state.selectedCategory) > -1);

          if (chatContainsSelectedCategory) {
              // Create chat card
              const categoriesToShow = chat.categories.map(function(category) {
                return (
                  <Button
                    key={category}
                    transparent
                    onPress={() => this.updateSelectedCategory(category)}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    textStyle={{
                      color: '#87838B', fontSize: 12,
                      fontWeight: '400'
                    }}>
                      {category}
                  </Button>
                );
              }, this);

              return (
                <Card key={chat.roomId} style={Styles.card}>
                    <CardItem body button onPress={() => Actions.chatView(chatProps)}>
                        <Text style={Styles.title} ellipsizeMode='middle' numberOfLines={1}>
                            {chat.roomName}
                        </Text>
                        <Text style={Styles.description}>
                            {chat.roomDescription}
                        </Text>
                        <View style={{flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text note style={{ textAlign: 'right', fontSize: 10, fontWeight: '500' }} >
                                {moment.duration(moment().diff(moment(chat.lastActive))).humanize()} ago
                            </Text>
                            <Text note style={{ textAlign: 'left', fontSize: 10, fontWeight: '500' }} >
                                {chat.numUsers} of {chat.userLimit} users
                            </Text>
                        </View>
                    </CardItem>
                    { categoriesToShow.length > 0 ?
                        <View style={Styles.categories}>
                            {categoriesToShow}
                        </View>
                        : null
                    }
                </Card>
              );
          }
        }, this);

        if (chatsToShow.length == 0) {
            return (
                <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -100 }} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>

                </ScrollView>
            );
        } else {
            return (
                <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>
                    { chatsToShow }
                </ScrollView>

            );
        }
    }
}

function getList(state) {
    let socket = state.socketHandler.socket;

    return {
        socket: socket
    }
}

export default connectRedux(getList)(CategoryDetailComponent);