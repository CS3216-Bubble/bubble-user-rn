import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Header, Title, Tabs, Button } from 'native-base';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ChatListComponent from '../components/ChatListComponent';
import ProfileComponent from '../components/ProfileComponent';
import SettingsComponent from '../components/SettingsComponent';

import { Styles } from '../styles/Styles';

import { Actions } from 'react-native-router-flux';

// Theme styling for native-base
import light from '../../Themes/light';


export default class MainView extends Component {
  state = {
    user: {
      name: 'User John',
      imgSrc: 'https://www.dropbox.com/s/2fth5ceonfa3iww/group.png?raw=1',
      numThanks: 42,
      numCheers: 21,
    },
    selectedTab: 0
  }

  onChangeTab(tab) {
    // console.log(tab);
    // Depending on tab, show different icons in header
  }

  _renderTabAction() {

  }

  componentWillReceiveProps(props) {
      // console.log("MAINVIEW ANDROID RECEIVES PROPS", props);
  }

  render() {

    var headerButton;
    switch (this.state.selectedTab) {
      case 0:
        headerButton = (
          <Button transparent onPress={Actions.chatFormView}>
            <Icon size={24} name="add" color="#fff" />
          </Button>
        );
      case 1:
        headerButton = (
          <Button transparent>
            <Icon size={24} name="more-vert" color="#fff" />
          </Button>
        );
      case 2:
        headerButton = (
          <Button transparent>
            <Icon size={24} name="more-vert" color="#fff" />
          </Button>
        );
      default:
        headerButton = (
          <Button transparent onPress={Actions.chatFormView}>
            <Icon size={24} name="add" color="#fff" />
          </Button>
        );
    }

    return (
        <Container>
          <Header iconRight>
            <Title>Bubble</Title>
            {headerButton}
          </Header>
          <View style={{ flex: 1 }}>
            <Tabs theme={light} onChangeTab={this.onChangeTab}>
              <ChatListComponent tabLabel='Chats' tabBgColor='#4883da' />
              <ProfileComponent tabLabel='Profile' tabBgColor='#4883da' user={this.state.user} />
              <SettingsComponent tabLabel='Settings' tabBgColor='#4883da' />
            </Tabs>
          </View>
        </Container>
    );
  }
}




// OLD
// render() {
//
//     // [Stub] Payload and Action to join room / enter a specific chat
//     var roomId = "123";
//     var userId = "00007";
//     const joinRoom = () => Actions.chatView({ roomId: roomId, user: userId });
//
//     return (
//         <Container>
//             <Header>
//                 <Button transparent>
//                     <Text></Text>
//                 </Button>
//                 <Title>Bubble</Title>
//                 <Button transparent onPress={joinRoom}>
//                     <Text>Join</Text>
//                 </Button>
//             </Header>
//             <View style={{ flex: 1 }}>
//                 <Tabs theme={light}>
//                     <ChatListComponent tabLabel='Chats' tabBgColor='#4883da' />
//                     <ProfileComponent tabLabel='Profile' tabBgColor='#4883da' />
//                     <SettingsComponent tabLabel='Settings' tabBgColor='#4883da' />
//                 </Tabs>
//             </View>
//         </Container>
//     );
// }
