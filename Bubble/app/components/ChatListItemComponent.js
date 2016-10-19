import React, { Component } from 'react';

import { Image, Text, View, TouchableHighlight } from 'react-native';

import {
    Card,
    CardItem,
    Title,
    Button
} from 'native-base';

import { Styles } from '../styles/Styles';

export default class ChatListItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {chat: this.props.chat, listCategories: this.props.listCategories};
    }

    render() {
        return (
        
            <Card style={Styles.card}>

                <CardItem>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableHighlight style={Styles.imageContainer}>
                            <Image style={Styles.image} source={{ uri: 'https://lh3.googleusercontent.com/-dWk17lP4LYM/AAAAAAAAAAI/AAAAAAAAAAA/k2_ZU1cJ8lM/photo.jpg' }} />
                        </TouchableHighlight>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text>
                                Snappy Koala
                              </Text>
                            <Text note>
                                {this.state.chat.lastActive}
                            </Text>
                        </View>
                    </View>
                </CardItem>

                <CardItem cardBody button onPress={() => Actions.chatView({ chat: chat })}>
                    <Title>
                        {this.state.chat.roomName}
                    </Title>
                    <Text>
                        {this.state.chat.roomDescription}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {this.state.listCategories}
                    </View>
                </CardItem>

                <CardItem header>
                    <Text>{this.state.chat.numberOfUsers}of {this.state.chat.userLimit}participants</Text>
                </CardItem>

            </Card>
        );
    }

}
