import React, { Component } from 'react';
import { Text, View, RefreshControl, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

import ChatListComponent from '../components/ChatListComponent';

export default class ChatListView extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { refresh: false };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillReceiveProps(props) {
        // console.log("CHATLISTVIEW RECEIVES PROPS", props);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({refresh: !this.state.refresh});
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title>Chats</Title>
                    <Button transparent>
                        <Text></Text>
                    </Button>
                    <Button transparent onPress={Actions.chatFormView}>
                        <Text>Create</Text>
                    </Button>
                </Header>
                <View style={{flex:1}}>
                <ChatListComponent refresh={this.state.refresh}/>
                </View>
            </Container>
        );
    }
}