import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Thumbnail, Text, Button, Icon } from 'native-base';

export default class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    if (this.props.user) {
      return (
        <ScrollView>
          <List>
            <ListItem>
              <Thumbnail square size={80} source={{ uri: this.props.user.imgSrc }} />
              <Text>{this.props.user.name}</Text>
            </ListItem>
            <ListItem iconLeft>
              <Icon name='ios-thumbs-up' />
              <Text>{this.props.user.numThanks}thanks</Text>
            </ListItem>
            <ListItem iconLeft>
              <Icon name='ios-heart' />
              <Text>{this.props.user.numCheers}cheers</Text>
            </ListItem>
            <ListItem>
              <Button block primary>Enter Magic Key</Button>
            </ListItem>
            <ListItem itemDivider>
              <Text>History</Text>
            </ListItem>
            <ListItem iconLeft>
              <Icon name='ios-thumbs-up' />
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

    else {
      return (
        <ScrollView>
          <List>
            <ListItem>
              <Text>DUMMY NAME</Text>
            </ListItem>
            <ListItem iconLeft>
              <Icon name='ios-thumbs-up' />
              <Text>DUMMY THANKS</Text>
            </ListItem>
            <ListItem iconLeft>
              <Icon name='ios-heart' />
              <Text>DUMMY CHEERS</Text>
            </ListItem>
            <ListItem>
              <Button block primary>Enter Magic Key</Button>
            </ListItem>
            <ListItem itemDivider>
              <Text>History</Text>
            </ListItem>
            <ListItem iconLeft>
              <Icon name='ios-thumbs-up' />
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
}
