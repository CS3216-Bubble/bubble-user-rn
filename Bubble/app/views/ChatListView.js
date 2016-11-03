import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ScrollView,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    InputGroup,
    Input
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Globals from '../globals';
import ChatListComponent from '../components/ChatListComponent';

export default class ChatListView extends Component {
    static propTypes = {
        onCreateChatPressed: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            refresh: false,
            searchTerm: '',
            showCategoryFilter: true
        };
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.clearSearchBar = this
            .clearSearchBar
            .bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            refresh: !this.state.refresh
        });
    }

    onSearchBarTextChange = (text) => {
        const showCategoryFilter = text == '';
        this.setState({ searchTerm: text, showCategoryFilter: showCategoryFilter });
    }

    clearSearchBar = () => {
        this.setState({ searchTerm: '' });
    }

    render() {
        const categoryButtons = Globals
            .CATEGORIES
            .map(function (name, index) {
                return (
                    <Button
                        style={{
                            backgroundColor: Globals.CATEGORY_COLOURS[name]
                        }}
                        key={index}
                        onPress={() => Actions.categoryListView({ selectedCategory: name })}>
                        <Text
                            style={{
                                fontSize: 10,
                                color: 'white',
                                fontWeight: "600"
                            }}>{name}</Text>
                    </Button>
                );
            }, this);

        return (
            <Container>
                {Platform.OS == 'ios' &&
                    <Header searchBar rounded>
                        <InputGroup>
                            <Icon name='ios-search' />
                            <Input
                                placeholder='Search'
                                value={this.state.searchTerm}
                                onChangeText={this.onSearchBarTextChange}
                                style={{
                                    paddingBottom: 10
                                }} /> {this.state.searchTerm.length > 0 && <Icon
                                    name='ios-close'
                                    style={{
                                        backgroundColor: "transparent",
                                        paddingTop: 2
                                    }} onPress={this.clearSearchBar} />}
                        </InputGroup>
                        <Button transparent onPress={this.props.onCreateChatPressed}>
                            <Icon name='ios-create-outline' />
                        </Button>
                    </Header>
                }

                {Platform.OS == 'ios' &&
                    <View style={{
                        flex: 1
                    }}>
                        <View style={styles.categoryButtonContainer}>{categoryButtons}</View>
                        <ChatListComponent
                            refresh={this.state.refresh}
                            searchTerm={this.state.searchTerm}
                            showOpenChatsOnly={this.props.showOpenChatsOnly}
                            onCreateChatPressed={this.props.onCreateChatPressed} />
                    </View>
                }

                {Platform.OS == 'android' &&
                    <View style={{
                        flex: 1
                    }}>
                        <ChatListComponent
                            refresh={this.state.refresh}
                            searchTerm={this.props.searchTerm}
                            showOpenChatsOnly={this.props.showOpenChatsOnly}
                            onCreateChatPressed={this.props.onCreateChatPressed} />
                    </View>
                }

            </Container>
        );
    }
}

// TODO: Move to Styles.js
var styles = StyleSheet.create({
    categoryButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: 10,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    categoryButton: {
        marginBottom: 10
    }
});
