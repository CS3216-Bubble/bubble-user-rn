import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Image, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, Text, Thumbnail } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Actions } from 'react-native-router-flux';
import CustomTheme from '../themes/bubble';

import Globals from '../globals';

import CategoryListComponent from '../components/CategoryListComponent';

const thumbnailSize = 80;

export default class CategoryListView extends Component {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
  }

  render() {

      const bgStyle = {width: 500, resizeMode: 'stretch'};

    var image;
    switch (this.props.selectedCategory.toLowerCase()) {
      case 'advice':
        image = (<Image source={require('../img/advice_bg.png')} style={bgStyle} />);
        break;
      case 'funny':
        image = (<Image source={require('../img/funny_bg.png')} style={bgStyle} />);
        break;
      case 'nostalgia':
        image = (<Image source={require('../img/nostalgia_bg.png')} style={bgStyle} />);
        break;
      case 'rant':
        image = (<Image source={require('../img/rant_bg.png')} style={bgStyle} />);
        break;
      case 'relationship':
        image = (<Image source={require('../img/relationship_bg.png')} style={bgStyle} />);
        break;
      case 'school':
        image = (<Image source={require('../img/school_bg.png')} style={bgStyle} />);
        break;
      default:
        image = (<Image source={require('../img/default_bg.png')} style={bgStyle} />);
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
            backgroundColor="blue"
            stickyHeaderHeight={Platform.OS === 'ios' ? 64 : 56}
            backgroundSpeed={10}
            renderBackground={() => (
              image
            )}
            renderForeground={() => (
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                { thumbnail }
                <Text style={{color: '#FFFFFF', fontWeight: '500', fontSize: 24, paddingTop: 5}}>{this.props.selectedCategory}</Text>
                <Text style={{color: '#FFFFFF'}}>{Globals.CATEGORY_TAGLINES[this.props.selectedCategory]}</Text>
              </View>
            )}
            renderStickyHeader={() =>(
              <Header theme={CustomTheme}>
              <Button transparent><Text></Text></Button>
              <Title>{this.props.selectedCategory}</Title>
              </Header>)}
            renderFixedHeader={() => (
              <View key="fixed-header" style={styles.fixedSection}>
                <Button transparent onPress={Actions.pop}>
                    <Icon style={styles.fixedSectionText} size={30} name='ios-arrow-back' color="#FFFFFF"/>
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
    top: Platform.OS === 'ios' ? 19 : 10,
    left: 8
  },
  fixedSectionText: {
    color: Platform.OS === 'ios' ? '#0E7AFE' : '#FFFFFF'
  },
});
