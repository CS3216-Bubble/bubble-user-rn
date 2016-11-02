import React, { Component, PropTypes } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { List, ListItem, Icon, Input, InputGroup, Text, Button, Thumbnail } from 'native-base';
import MultipleChoice from 'react-native-multiple-choice';

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
    this.setState({categories: nextProps.form.categories});
  }

  state = {
    categories: this.props.form.categories
  }

  onSelectCategory = (category) => {
    this.props.onCategoriesChange(this.state.categories);
  }

  isNameValid = () => {
    return this.props.form.name != '';
  }

  render() {

    var categoryName;
    if (this.props.form.categories.length > 0) {
      categoryName = this.props.form.categories[0];
    } else {
      categoryName = 'Default';
    }

    var thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/default.png')} style={styles.profileContainerImage}/>);
    switch (categoryName) {
      case 'Advice':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/advice.png')} style={styles.profileContainerImage}/>);
        break;
      case 'Funny':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/funny.png')} style={styles.profileContainerImage}/>);
        break;
      case 'Nostalgia':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/nostalgia.png')} style={styles.profileContainerImage} />);
        break;
      case 'Rant':
        thumbnail = (<Thumbnail square square size={thumbnailSize} source={require('../img/rant.png')} style={styles.profileContainerImage} />);
        break;
      case 'Relationship':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/relationship.png')} style={styles.profileContainerImage}/>);
        break;
      case 'School':
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/school.png')} style={styles.profileContainerImage}/>);
        break;
      default:
        thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/default.png')} style={styles.profileContainerImage}/>);
        break;
    }

    const categoryBackground = {
      backgroundColor: Globals.CATEGORY_BG_COLOURS[categoryName]
    }

    return (
      <ScrollView>
        <View style={[styles.profileContainer, categoryBackground]}>
          { thumbnail }
          <View style={styles.profileContainerName}>
            <InputGroup iconRight={!this.isNameValid()} error={!this.isNameValid()}>
              <Input
                value={this.props.form.name}
                onChangeText={this.props.onNameChange}
                placeholder='Name'
              />
              { this.isNameValid() ? null :
                <Icon name='ios-close-circle' style={{color:'red'}}/>}
            </InputGroup>
          </View>
        </View>
        <List>
          <ListItem>
            <InputGroup>
              <Input
                value={this.props.form.description}
                onChangeText={this.props.onDescriptionChange}
                placeholder='Description'
              />
            </InputGroup>
          </ListItem>

          <ListItem iconLeft>
            <InputGroup>
              <Icon name='ios-person' />
              <Input
                keyboardType='numeric'
                value={this.props.form.numUsers}
                onChangeText={this.props.onNumUsersChange}
                placeholder='No. of Users'
              />
            </InputGroup>
          </ListItem>

          <ListItem itemDivider>
            <Text>Categories</Text>
          </ListItem>
        </List>
        <View style={{paddingLeft: 20}}>
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
      paddingTop: 20,
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
