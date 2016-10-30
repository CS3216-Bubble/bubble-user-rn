import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, RefreshControl, ScrollView, LayoutAnimation, UIManager } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, InputGroup, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Globals from '../globals';
import MyChatListComponent from '../components/MyChatListComponent';

export default class MyChatListView extends Component {
    static propTypes = {
      title: PropTypes.string.isRequired,
      onCreateChatPressed: PropTypes.func.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          refresh: false,
          searchTerm: '',
          showCategoryFilter: true
        };
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.clearSearchBar = this.clearSearchBar.bind(this);
    }

    componentWillReceiveProps(props) {
        // // console.log("CHATLISTVIEW RECEIVES PROPS", props);
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({refresh: !this.state.refresh});
    }

    onSearchBarTextChange = (text) => {
      const showCategoryFilter = text == '';
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({
        searchTerm: text,
        showCategoryFilter: showCategoryFilter
      });
    }

    clearSearchBar = () => {
      this.setState({searchTerm: ''});
    }

    render() {
        const categoryButtons = Globals.CATEGORIES.map(function(name, index) {
          return (
            <Button style={{backgroundColor: Globals.CATEGORY_COLOURS[name]}} rounded info key={index} onPress={() => Actions.categoryListView({selectedCategory: name})}>
                <Text style={{fontSize: 10, color: 'white', fontWeight: "600"}} >{name}</Text>
            </Button>
          );
        }, this);

        return (
            <Container>
                <Header searchBar rounded>
                  <InputGroup>
                    <Icon name='ios-search' />
                    <Input
                      placeholder='Search'
                      value={this.state.searchTerm}
                      onChangeText={this.onSearchBarTextChange}
                      style={{paddingBottom: 10}}/>
                    {this.state.searchTerm.length > 0 && <Icon name='ios-close' style={{backgroundColor: "transparent", paddingTop: 2}}onPress={this.clearSearchBar}/> }
                  </InputGroup>
                  <Button transparent onPress={Actions.chatFormView}>
                    <Icon name='ios-create-outline' />
                  </Button>
                </Header>
                <View style={{flex:1}}>
                  <MyChatListComponent
                    refresh={this.state.refresh}
                    searchTerm={this.state.searchTerm}
                    onCreateChatPressed={this.props.onCreateChatPressed} />
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
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    categoryButton: {
      marginBottom: 10,
    }
});
