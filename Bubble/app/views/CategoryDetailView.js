import React, { Component } from 'react';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

import ChatListComponent from '../components/ChatListComponent';

export default class CategoryDetailView extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
  }

  render() {
      return (
          <Container>
            <Button transparent onPress={Actions.pop}>
                <Icon size={30} name='ios-arrow-back' color="#0E7AFE"/>
            </Button>
            <Header>
              <Title>{this.props.categoryName}</Title>
            </Header>
            <Content>
              <ChatListComponent />
            </Content>
          </Container>
      );
  }
}
