import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Switch, TouchableHighlight, Image, Alert } from 'react-native';
import { Container, Content, List, ListItem, Text, Thumbnail, Icon } from 'native-base';
import { Styles } from '../styles/Styles';

import moment from 'moment';
import Globals from '../globals';
import { generateName } from '../utils/ProfileHasher';

var adjectives = require('../utils/adjectives');
var animals = require('../utils/animals');
var numAvatars = 160;

export default class ChatInfoComponent extends Component {
    static propTypes = {
        chat: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            isNotificationsOn: true
        }
        this.toggleNotification = this.toggleNotification.bind(this);
        this.triggerQuit = this.triggerQuit.bind(this);
    }

    componentDidMount() {


    }

    toggleNotification(value) {
        this.setState({ isNotificationsOn: value });
    }

    triggerQuit() {
        Alert.alert(
            'Quit Chat',
            'Are you sure you want to quit this chat? You can join back later before it expires.',
            [
                { text: 'Quit Chat', onPress: () => this.props.onQuit() },
                { text: 'Cancel' },
            ]
        );
    }

    render() {
        const thumbnailSize = 60;
        var categoryName;
        if (this.props.chat.categories.length > 0) {
            categoryName = this.props.chat.categories[0];
        } else {
            categoryName = 'Default';
        }

        // Image paths cannot be dynamic, so return the correct thumbnail
        var thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/default.png')} />);
        switch (categoryName) {
            case 'Advice':
                thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/advice.png')} />);
                break;
            case 'Funny':
                thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/funny.png')} />);
                break;
            case 'Nostalgia':
                thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/nostalgia.png')} />);
                break;
            case 'Rant':
                thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/rant.png')} />);
                break;
            case 'Relationship':
                thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/relationship.png')} />);
                break;
            case 'School':
                thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/school.png')} />);
                break;
            default:
                thumbnail = (<Thumbnail square size={thumbnailSize} source={require('../img/default.png')} />);
                break;
        }

        const thumbnailBackgroundStyle = {
            backgroundColor: Globals.CATEGORY_BG_COLOURS[categoryName]
        }

        return (
                <Container>
                    <Content>
                        <List>
                            <ListItem>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>
                                    <View style={{ height: 80, width: 80, borderRadius: 40, backgroundColor: thumbnailBackgroundStyle.backgroundColor, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}>
                                        {thumbnail}
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start" }}>
                                        <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: "400", textAlign: 'left' }}>
                                            {this.props.chat.roomName}
                                        </Text>
                                        <Text note style={{ fontSize: 12, fontWeight: "300", textAlign: 'left' }} >
                                            Last active {moment.duration(moment().diff(moment(this.props.chat.lastActive))).humanize() + " "}ago
                                    </Text>
                                    </View>
                                </View>
                            </ListItem>
                            <ListItem itemDivider>
                                <Text>Options</Text>
                            </ListItem>
                            <ListItem>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: "300", textAlign: 'left' }} >Receive notifications for this chat</Text>
                                    <Switch onValueChange={this.toggleNotification} value={this.state.isNotificationsOn} />
                                </View>
                            </ListItem>
                            <ListItem itemDivider style={{ backgroundColor: '#BE3144', padding: 0, alignItems: 'center', justifyContent: "center" }}>
                                <TouchableHighlight onPress={this.triggerQuit} underlayColor="#E84A5F" style={{ flex: 1, margin: 0, padding: 0, alignItems: 'center', justifyContent: "center" }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: "400", textAlign: 'center', color: "white" }} >QUIT CHAT</Text>
                                    </View>
                                </TouchableHighlight>
                            </ListItem>
                            <ListItem itemDivider>
                                <Text>Active Participants</Text>
                            </ListItem>
                            <List dataArray={this.props.chat.participants}
                                renderRow={(person) =>
                                    <ListItem>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Image
                                                source={{ uri: 'http://flathash.com/' + person }}
                                                style={{ height: 30, width: 30, margin: 10 }} />
                                            <Text>{generateName(person)}</Text>
                                        </View>
                                    </ListItem>
                                }>
                            </List>
                        </List>
                    </Content>
                </Container>
        );
    }
}

var styles = StyleSheet.create({

});
