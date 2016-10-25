import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, InputGroup, Input, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

import SearchResultComponent from '../components/SearchResultComponent';

export default class SearchView extends Component {
  state = {
    searchTerm: ''
  }

  render() {
      return (
          <Container>
            <Header searchBar rounded>
              <InputGroup>
                <Icon name='ios-search' />
                <Input
                  placeholder='Search for chat rooms'
                  value={this.state.searchTerm}
                  onChangeText={(text) => this.setState({searchTerm: text})} />
              </InputGroup>
              <Button transparent onPress={Actions.pop}>
                Cancel
              </Button>
            </Header>
            <View style={{flex:1}}>
              <SearchResultComponent searchTerm={this.state.searchTerm}/>
            </View>
          </Container>
      );
  }
}

var styles = StyleSheet.create({
    categoryButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      height: 70,
      padding: 10
    },
    categoryButton: {
      marginBottom: 10,
    }
});
