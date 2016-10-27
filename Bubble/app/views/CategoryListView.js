import React, { Component, PropTypes } from 'react';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

import CategoryListComponent from '../components/CategoryListComponent';

export default class CategoryListView extends Component {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
  }

  render() {
      return (
          <Container>
            <Header>
              <Button transparent onPress={Actions.pop}>
                  <Icon size={30} name='ios-arrow-back' color="#0E7AFE"/>
              </Button>
              <Title>{this.props.selectedCategory}</Title>
            </Header>
            <Content>
              <CategoryListComponent
                selectedCategory={this.props.selectedCategory}
                showOpenChatsOnly={this.props.showOpenChatsOnly} />
            </Content>
          </Container>
      );
  }
}
