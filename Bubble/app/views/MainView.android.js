import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Header, Title, Tabs } from 'native-base';
import { ThemeProvider, Toolbar, Button } from 'react-native-material-ui';
import { connect as connectRedux } from 'react-redux';
import { Styles } from '../styles/Styles';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import CustomTheme from '../themes/bubble';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatListComponent from '../components/ChatListComponent';
import MyChatListComponent from '../components/MyChatListComponent';
import SettingsComponent from '../components/SettingsComponent';

var adjectives = require('../utils/adjectives');
var animals = require('../utils/animals');

const uiTheme = {
  palette: {
    primaryColor: '#69D2E7',
  },
  toolbar: {
    container: {
      height: 56,
    },
  },
};

export class MainView extends Component {

  hashID(userId) {
    if (userId) {
        var hash = 0;
        if (userId.length == 0) return hash;
        for (i = 0; i < userId.length; i++) {
          char = userId.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        return hash;
    } else {
      return 123123123;
    }
  }

  // Name generator
  generateName(userId) {
    var hashCode = this.hashID(userId);
    var adj = adjectives.adjectives;
    var ani = animals.animals;
    // Get adjective
    var adjective = adj[((hashCode % adj.length) + adj.length) % adj.length];
    // Get animal
    var animal = ani[((hashCode % ani.length) + ani.length) % ani.length];
    // Return result
    return adjective + " " + animal;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: this.generateName(this.props.socket.id),
        imgSrc: 'http://flathash.com/' + this.props.socket.id,
      },
      selectedTab: 0,
      searchTerm: ''
    }
  }

  onChangeTab = (tab) => {
    this.setState({ selectedTab: tab.i });
  }

  onSearchBarTextChange = (text) => {
    console.log(text);
    this.setState({ searchTerm: text });
  }

  onCreateChatPressed = () => {
    Actions.chatFormView({isBackButtonVisible: true});
  }

  clearSearchBar = () => {
    this.setState({ searchTerm: '' });
  }

  render() {

    var header;
    if (this.state.selectedTab === 0) {
      header = (
        <Toolbar
          centerElement="Bubble"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: this.onSearchBarTextChange,
            onSearchClosed: this.clearSearchBar,
          }}
          />
      );
    } else {
      header = (
        <Toolbar
          centerElement="Bubble"
          />
      );
    }

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={{ flex: 1 }}>
          {header}
          <View style={{ flex: 1 }}>
            <Tabs theme={CustomTheme} onChangeTab={this.onChangeTab}>
              <ChatListComponent tabLabel='All' searchTerm={this.state.searchTerm} onCreateChatPressed={this.onCreateChatPressed}/>
              <MyChatListComponent tabLabel='Open' searchTerm={this.state.searchTerm} onCreateChatPressed={this.onCreateChatPressed} />
              <SettingsComponent tabLabel='Settings' user={this.state.user} />
            </Tabs>
          </View>
          {this.state.selectedTab === 0 ?
            <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={() => Actions.chatFormView({isBackButtonVisible: true})}
              /> : null}
        </View>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    socket: state.socket
  }
;}
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(MainView);
