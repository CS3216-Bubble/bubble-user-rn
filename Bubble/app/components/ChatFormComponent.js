import React, { Component, PropTypes } from 'react';
import { ScrollView, View, StyleSheet, Slider } from 'react-native';
import { List, ListItem, Input, InputGroup, Text, Button, Thumbnail, Icon } from 'native-base';
import MultipleChoice from 'react-native-multiple-choice';
import * as Animatable from 'react-native-animatable';

import Globals from '../globals';

const thumbnailSize = 40;

export default class ChatFormComponent extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onNumUsersChange: PropTypes.func.isRequired,
    onCategoriesChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const newCat = nextProps.form.categories.length > 0 ? nextProps.form.categories[0] : 'Default';
    this.setState({
      categories: nextProps.form.categories,
      currentCategory: newCat
    });

    // If category has changed, animate to new colour
    if (this.state.currentCategory != newCat) {
      this.refs.backgroundContainer.transitionTo({ backgroundColor: Globals.CATEGORY_BG_COLOURS[newCat] });
    }
  }

  state = {
    categories: this.props.form.categories,
    currentCategory: this.props.form.categories.length > 0 ? this.props.form.categories[0] : 'Default'
  }

  onSelectCategory = (category) => {
    this.props.onCategoriesChange(this.state.categories);
  }

  isNameValid = () => {
    return this.props.form.name != '';
  }

  render() {

    var thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/default.png')} style={styles.profileContainerImage} />);
    switch (this.state.currentCategory) {
      case 'Advice':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/advice.png')} style={styles.profileContainerImage} />);
        break;
      case 'Funny':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/funny.png')} style={styles.profileContainerImage} />);
        break;
      case 'Nostalgia':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/nostalgia.png')} style={styles.profileContainerImage} />);
        break;
      case 'Rant':
        thumbnail = (<Thumbnail square square size={thumbnailSize} source={require('../img/rant.png')} style={styles.profileContainerImage} />);
        break;
      case 'Relationship':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/relationship.png')} style={styles.profileContainerImage} />);
        break;
      case 'School':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/school.png')} style={styles.profileContainerImage} />);
        break;
      default:
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/default.png')} style={styles.profileContainerImage} />);
        break;
    }

    const categoryBackground = {
      backgroundColor: Globals.CATEGORY_BG_COLOURS[this.state.currentCategory]
    }

    return (
      <ScrollView>
        <Animatable.View ref="backgroundContainer" style={[styles.profileContainer, categoryBackground]}>
          {thumbnail}
          <View style={styles.profileContainerName}>
            <InputGroup iconRight={!this.isNameValid()} error={!this.isNameValid()}>
              <Input
                value={this.props.form.name}
                onChangeText={this.props.onNameChange}
                placeholder='Title'
                multiline={true}
                maxLength={39}
                />
              {this.isNameValid() ? null :
                <Icon name='md-alert' style={{color:'#F73859'}}/>}
            </InputGroup>
          </View>
        </Animatable.View>
        <List>
          <ListItem iconLeft>
            <InputGroup iconLeft>
              <Icon name='md-document' style={{color:'#A9A9A9'}} />
              <Input
                value={this.props.form.description}
                onChangeText={this.props.onDescriptionChange}
                placeholder='Description'
                multiline={true}
                maxLength={140}
                style={{borderBottomWidth: StyleSheet.hairlineWidth, height: 100}}
                />
            </InputGroup>
          </ListItem>

          <ListItem iconLeft>
            <InputGroup iconLeft>
              <Icon name='md-person' style={{color:'#A9A9A9'}} />
              <Input
                keyboardType='numeric'
                value={this.props.form.numUsers}
                onChangeText={this.props.onNumUsersChange}
                placeholder='No. of Users'
                />
            </InputGroup>
          </ListItem>

          <ListItem itemDivider style={{ height: 30 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#999999" }}>CATEGORIES</Text>
          </ListItem>
        </List>
        <View style={{ paddingLeft: 20 }}>
          <MultipleChoice
            options={Globals.CATEGORIES}
            selectedOptions={this.state.categories}
            onSelection={this.onSelectCategory}
            />
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 60,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#A7DBD8'
  },
  profileContainerName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileContainerText: {
    fontSize: 20
  },
  profileContainerImage: {
    marginBottom: 15,
    height: 80,
    width: 80,
  }
});
