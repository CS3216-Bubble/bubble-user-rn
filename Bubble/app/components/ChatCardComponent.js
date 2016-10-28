import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { Button, Thumbnail } from 'native-base';
import { Styles } from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions, ActionConst } from 'react-native-router-flux';

import moment from 'moment';

import Globals from '../globals';

const thumbnailSize = 40;

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
              small
              key={category}
              transparent
              onPress={() => Actions.categoryListView({selectedCategory: category})}
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

        // Image paths cannot be dynamic, so return the correct thumbnail
        var thumbnail = (<View style={Styles.cardThumbnail}><Thumbnail square size={thumbnailSize} source={require('./img/default.png')} /></View>);
        switch (categoryName) {
          case 'advice':
            thumbnail = (<View style={Styles.cardThumbnail}><Thumbnail square size={thumbnailSize} source={require('./img/advice.png')} /></View>);
            break;
          case 'funny':
            thumbnail = (<View style={Styles.cardThumbnail}><Thumbnail square size={thumbnailSize} source={require('./img/funny.png')} /></View>);
            break;
          case 'nostalgia':
            thumbnail = (<View style={Styles.cardThumbnail}><Thumbnail square size={thumbnailSize} source={require('./img/nostalgia.png')} /></View>);
            break;
          case 'rant':
            thumbnail = (<View style={Styles.cardThumbnail}><Thumbnail square square size={thumbnailSize} source={require('./img/rant.png')} /></View>);
            break;
          case 'relationship':
            thumbnail = (<View style={Styles.cardThumbnail}><Thumbnail square size={thumbnailSize} source={require('./img/relationship.png')} /></View>);
            break;
          case 'school':
            thumbnail = (<View style={Styles.cardThumbnail}><Thumbnail square size={thumbnailSize} source={require('./img/school.png')} /></View>);
            break;
          default:
            thumbnail = (<View style={Styles.cardThumbnail}><Thumbnail square size={thumbnailSize} source={require('./img/default.png')} /></View>);
            break;
        }

        return (
          <View key={chat.roomId} style={Styles.cardContainer}>
              <TouchableHighlight onPress={() => Actions.chatView(chatProps)} underlayColor="#69D2E7">
                <View style={Styles.cardMainRow}>
                    <View>
                      { thumbnail }
                    </View>
                    <View style={Styles.cardMainRowText}>
                        <View style={Styles.cardTitle}>
                            <Text style={Styles.cardTitleText} ellipsizeMode='middle' numberOfLines={1}>
                                {chat.roomName}
                            </Text>
                            { chat.roomType == 'HOT' ? <Icon name='thumb-tack' style={{fontSize: 20, color: '#FA6900'}}/> : null }
                        </View>
                        <Text style={Styles.cardDescription}>
                            {chat.roomDescription}
                        </Text>
                        <View style={Styles.cardSubRow}>
                            <Text note style={Styles.cardSubRowTextLeft} >
                                {moment.duration(moment().diff(moment(chat.lastActive))).humanize()} ago
                            </Text>
                            <View style={Styles.cardSubRowRight}>
                              <Text note style={Styles.cardSubRowTextRight}>
                                  {chat.numUsers} / {chat.userLimit}
                              </Text>
                              <Icon name='user' style={{fontSize: 16, color: '#BCBCBC'}}/>
                            </View>
                        </View>
                    </View>
                </View>
              </TouchableHighlight>
              { categoriesToShow.length > 0 ?
                  <View style={Styles.cardFooterRow}>
                      {categoriesToShow}
                  </View>
                  : null
              }
          </View>
        );
    }
}
