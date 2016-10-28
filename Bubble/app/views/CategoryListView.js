import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, Text, Thumbnail } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Actions } from 'react-native-router-flux';

import Globals from '../globals';

import CategoryListComponent from '../components/CategoryListComponent';

const thumbnailSize = 80;

export default class CategoryListView extends Component {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
  }

  render() {

    var image;
    switch (this.props.selectedCategory.toLowerCase()) {
      case 'advice':
        image = (<Image source={require('../img/advice_bg.png')} />);
        break;
      case 'funny':
        image = (<Image source={require('../img/funny_bg.png')} />);
        break;
      case 'nostalgia':
        image = (<Image source={require('../img/nostalgia_bg.png')} />);
        break;
      case 'rant':
        image = (<Image source={require('../img/rant_bg.png')} />);
        break;
      case 'relationship':
        image = (<Image source={require('../img/relationship_bg.png')} />);
        break;
      case 'school':
        image = (<Image source={require('../img/school_bg.png')} />);
        break;
      default:
        image = (<Image source={require('../img/default_bg.png')} />);
        break;
    }

    var thumbnail = (<Thumbnail style={styles.thumbnail} square size={thumbnailSize} source={require('../img/default.png')} />);
    switch (this.props.selectedCategory.toLowerCase()) {
      case 'advice':
        thumbnail = (<Thumbnail style={styles.thumbnail} square size={thumbnailSize} source={require('../img/advice.png')} />);
        break;
      case 'funny':
        thumbnail = (<Thumbnail style={styles.thumbnail} square size={thumbnailSize} source={require('../img/funny.png')} />);
        break;
      case 'nostalgia':
        thumbnail = (<Thumbnail style={styles.thumbnail} square size={thumbnailSize} source={require('../img/nostalgia.png')} />);
        break;
      case 'rant':
        thumbnail = (<Thumbnail style={styles.thumbnail} square square size={thumbnailSize} source={require('../img/rant.png')} />);
        break;
      case 'relationship':
        thumbnail = (<Thumbnail style={styles.thumbnail} square size={thumbnailSize} source={require('../img/relationship.png')} />);
        break;
      case 'school':
        thumbnail = (<Thumbnail style={styles.thumbnail} square size={thumbnailSize} source={require('../img/school.png')} />);
        break;
      default:
        thumbnail = (<Thumbnail style={styles.thumbnail} square size={thumbnailSize} source={require('../img/default.png')} />);
        break;
    }

    return (
          <ParallaxScrollView
            parallaxHeaderHeight={200}
            stickyHeaderHeight={64}
            backgroundSpeed={10}
            renderBackground={() => (
              <View>
                { image }
              </View>
            )}
            renderForeground={() => (
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                { thumbnail }
                <Text style={{color: '#FFFFFF', fontWeight: '500', fontSize: 24, paddingTop: 5}}>{this.props.selectedCategory}</Text>
                <Text style={{color: '#FFFFFF'}}>{Globals.CATEGORY_TAGLINES[this.props.selectedCategory]}</Text>
              </View>
            )}
            renderStickyHeader={() =>(
              <Header>
              <Title>{this.props.selectedCategory}</Title>
              </Header>)}
            renderFixedHeader={() => (
              <View key="fixed-header" style={styles.fixedSection}>
                <Button transparent onPress={Actions.pop}>
                    <Icon style={styles.fixedSectionText} size={30} name='ios-arrow-back' color="#0E7AFE"/>
                </Button>
              </View>
            )}
             >
            <CategoryListComponent
              selectedCategory={this.props.selectedCategory} />
          </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    marginBottom: 5
  },
  fixedSection: {
    position: 'absolute',
    top: 19,
    left: 8
  },
  fixedSectionText: {
    color: '#0E7AFE',
  },
});
