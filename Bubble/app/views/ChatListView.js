import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, RefreshControl, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, InputGroup, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

import ChatListComponent from '../components/ChatListComponent';

export default class ChatListView extends Component {
    static propTypes = {
      title: PropTypes.string.isRequired,
      showOpenChatsOnly: PropTypes.bool.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          refresh: false,
          searchTerm: '',
          categoryNames: ['Rant', 'Funny', 'Nostalgia', 'Relationship', 'Advice', 'School'],
          showCategoryFilter: true
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillReceiveProps(props) {
        // console.log("CHATLISTVIEW RECEIVES PROPS", props);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({refresh: !this.state.refresh});
    }

    onSearchBarTextChange = (text) => {
      const showCategoryFilter = text == '';
      this.setState({
        searchTerm: text,
        showCategoryFilter: showCategoryFilter
      });
    }

    render() {
        const categoryButtons = this.state.categoryNames.map(function(name, index) {
          return (
            <Button info key={index} onPress={() => Actions.categoryDetailView({selectedCategory: name})}>
                <Text>{name}</Text>
            </Button>
          );
        }, this);

        return (
            <Container>
                <Header searchBar rounded>
                  <InputGroup style={styles.searchBar}>
                    <Icon name='ios-search' />
                    <Input
                      placeholder='Search'
                      value={this.state.searchTerm}
                      onChangeText={this.onSearchBarTextChange} />
                  </InputGroup>
                  <Button transparent onPress={Actions.chatFormView}>
                    <Icon size={30} name='ios-create-outline' color="#0E7AFE"/>
                  </Button>
                </Header>
                <View style={{flex:1}}>
                  { !this.props.isOpenChatsOnly && this.state.showCategoryFilter ?
                    <View style={styles.categoryButtonContainer}>{ categoryButtons }</View> :
                    null }
                  <ChatListComponent
                    refresh={this.state.refresh}
                    searchTerm={this.state.searchTerm}
                    showOpenChatsOnly={this.props.showOpenChatsOnly} />
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
      height: 90,
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    categoryButton: {
      marginBottom: 10,
    }
});
