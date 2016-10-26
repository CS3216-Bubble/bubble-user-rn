import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, Text, View, TouchableHighlight, ScrollView, RefreshControl, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base';
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

        return (
          <View style={styles.cardContainer} key={chat.roomId}>
            <View style={styles.cardMainRow}>
              <Icon name="fa-heart"/>
              <Text ellipsizeMode='middle' numberOfLines={1}>{chat.roomName}</Text>
              <Text>{chat.roomDescription}</Text>
            </View>
            <View style={styles.cardSubRow}>
              <Text note style={{ textAlign: 'right', fontSize: 10, fontWeight: '500' }} >
                  {moment.duration(moment().diff(moment(chat.lastActive))).humanize()} ago
              </Text>
              <Text note style={{ textAlign: 'left', fontSize: 10, fontWeight: '500' }} >
                  {chat.numUsers} of {chat.userLimit} users
              </Text>
            </View>
            { categoriesToShow.length > 0 && this.props.showCategoriesOnCard ?
              <View style={styles.cardFooterRow}>{ categoriesToShow }</View> :
              null }
          </View>
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
    cardFooterRow: {
      flex: 1,
      flexDirection: 'row',
    }
});
