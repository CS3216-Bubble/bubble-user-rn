import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Thumbnail, Text, Icon, Button } from 'native-base';

export default class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem>
            <Thumbnail square size={80} source={{uri: this.props.user.imgSrc}} />
            <Text>{this.props.user.name}</Text>
          </ListItem>
          <ListItem iconLeft>
              <Icon name='ios-thumbsup' />
              <Text>{this.props.user.numThanks} thanks</Text>
          </ListItem>
          <ListItem iconLeft>
              <Icon name='ios-heart' />
              <Text>{this.props.user.numCheers} cheers</Text>
          </ListItem>
          <ListItem>
            <Button block danger>Logout</Button>
          </ListItem>
          <ListItem itemDivider>
              <Text>History</Text>
          </ListItem>
          <ListItem iconLeft>
              <Icon name='ios-thumbsup' />
              <Text>beanboy thanked you!</Text>
              <Text note>19 Oct 2016, 10:00pm</Text>
          </ListItem>
          <ListItem iconLeft>
              <Icon name='ios-heart' />
              <Text>beanboy cheered you!</Text>
              <Text note>19 Oct 2016, 10:00pm</Text>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}
