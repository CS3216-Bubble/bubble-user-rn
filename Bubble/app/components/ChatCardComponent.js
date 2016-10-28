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
              onPress={(event) => {event.stopPropagation(); Actions.categoryListView({selectedCategory: category});}}
              textStyle={{
                color: Globals.CATEGORY_COLOURS[category],
                fontSize: 12,
                fontWeight: '500'
              }}>
                {category}
            </Button>
          );
        }, this);

        var categoryName;
        if (chat.categories.length > 0) {
          categoryName = chat.categories[0];
        } else {
          categoryName = 'Default';
        }

        // Image paths cannot be dynamic, so return the correct thumbnail
        var thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/default.png')} />);
        switch (categoryName) {
          case 'Advice':
            thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/advice.png')} />);
            break;
          case 'Funny':
            thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/funny.png')} />);
            break;
          case 'Nostalgia':
            thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/nostalgia.png')} />);
            break;
          case 'Rant':
            thumbnail = (<Thumbnail square square size={thumbnailSize} source={require('../img/rant.png')} />);
            break;
          case 'Relationship':
            thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/relationship.png')} />);
            break;
          case 'School':
            thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/school.png')} />);
            break;
          default:
            thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/default.png')} />);
            break;
        }

        const thumbnailBackgroundStyle = {
          backgroundColor: Globals.CATEGORY_BG_COLOURS[categoryName]
        }

        return (
          <TouchableHighlight key={chat.roomId} onPress={() => {Actions.chatView(chatProps);}} underlayColor="#69D2E7">
            <View key={chat.roomId} style={Styles.cardContainer}>
                  <View style={Styles.cardMainRow}>
                      <View>
                        <View style={[Styles.cardThumbnail, thumbnailBackgroundStyle]}>
                          { thumbnail }
                        </View>
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
                { categoriesToShow.length > 0 ?
                    <View style={Styles.cardFooterRow}>
                        {categoriesToShow}
                    </View>
                    : null
                }
            </View>
          </TouchableHighlight>
        );
    }
}
