import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, RefreshControl, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

import ChatListComponent from '../components/ChatListComponent';

export default class ChatListView extends Component {
    static propTypes = {
      title: PropTypes.string.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          refresh: false,
          categoryNames: ['Rant', 'Funny', 'Nostalgia', 'Relationship', 'Advice', 'School']
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

    render() {
        const categoryButtons = this.state.categoryNames.map(function(name, index) {
          return (
            <Button info key={index}>
                <Text>{name}</Text>
            </Button>
          );
        }, this);

        return (
            <Container>
                <Header>
                    <Title>{this.props.title}</Title>
                    <Button transparent>
                        <Text></Text>
                    </Button>
                    <Button transparent onPress={Actions.chatFormView}>
                        <Text>Create</Text>
                    </Button>
                </Header>
                <View style={{flex:1}}>
                  <View style={styles.categoryButtonContainer}>
                    { categoryButtons }
                  </View>
                  <ChatListComponent refresh={this.state.refresh}/>
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
