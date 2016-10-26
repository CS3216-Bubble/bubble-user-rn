import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, Text, View, TouchableHighlight, ScrollView, RefreshControl, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, CardItem, Button, Thumbnail } from 'native-base';
import { Styles } from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions, ActionConst } from 'react-native-router-flux';

import moment from 'moment';

import Globals from '../globals';

export default class ChatCardComponent extends Component {
    static propTypes = {
      chat: PropTypes.object.isRequired,
      showCategoriesOnCard: PropTypes.bool.isRequired,
    }

    render() {
        const chat = this.props.chat;
        const chatProps = { roomId: chat.roomId };

        // Create chat card
        const categoriesToShow = chat.categories.map(function(category) {
          return (
            <Button
              key={category}
              transparent
              onPress={() => Actions.categoryDetailView({selectedCategory: category})}
              style={{justifyContent: 'center', alignItems: 'center'}}
              textStyle={{
                color: '#87838B', fontSize: 12,
                fontWeight: '400'
              }}>
                {category}
            </Button>
          );
        }, this);

        var categoryName;
        if (chat.categories.length > 0) {
          categoryName = chat.categories[0].toLowerCase();
        } else {
          categoryName = 'default';
        }

        // const chatImage = (
        //   <Thumbnail size={80} source={require('./img/' + categoryName + '.png')} />
        // );

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
}

var styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      flexDirection: 'column',
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 150,
    },
    cardMainRow: {
      flex: 1,
      flexDirection: 'row',

    },
    cardSubRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    cardSubRowText: {
      fontSize: 12,
      fontWeight: '500',
    },
    cardFooterRow: {
      flex: 1,
      flexDirection: 'row',
    }
});
