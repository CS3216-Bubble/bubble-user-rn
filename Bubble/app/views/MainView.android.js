import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Content, Header, Title, Tabs} from 'native-base';
import {connect as connectRedux} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ChatListView from '../views/ChatListView';
import MyChatListView from '../views/MyChatListView';
import SettingsView from '../views/SettingsView';
// import ChatListComponent from '../components/ChatListComponent';
// import MyChatListComponent from '../components/MyChatListComponent';
// import SettingsComponent from '../components/SettingsComponent';
import {Styles} from '../styles/Styles';
import CustomTheme from '../themes/bubble';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import {ThemeProvider, Toolbar, Button} from 'react-native-material-ui';
import {generateName, genOnlineProfImgSrc} from '../utils/ProfileHasher';

export class MainView extends Component {

    constructor(props) {
        super(props);
        const {socket} = this.props;
        const userId = socket.id;
        this.state = {
            user: {
                name: generateName(userId),
                imgSrc: genOnlineProfImgSrc(userId)
            },
            selectedTab: 0,
            searchTerm: '',
            toggleMyChats: false
        }
    }

    onChangeTab = (tab) => {
        this.setState({
            selectedTab: tab.i,
            toggleMyChats: !this.state.toggleMyChats
        });
    }

    onSearchBarTextChange = (text) => {
        this.setState({searchTerm: text});
    }

    onCreateChatPressed = () => {
        Actions.chatFormView({isBackButtonVisible: true});
    }

    clearSearchBar = () => {
        this.setState({searchTerm: ''});
    }

    render() {

        var header;
        if (this.state.selectedTab === 0 || this.state.selectedTab === 1) {
            header = (<Toolbar
                centerElement="Bubble"
                searchable={{
                autoFocus: true,
                placeholder: 'Search',
                onChangeText: this.onSearchBarTextChange,
                onSearchClosed: this.clearSearchBar
            }}/>);
        } else {
            header = (<Toolbar centerElement="Bubble" isSearchActive={false}/>);
        }

        return (
            <ThemeProvider uiTheme={uiTheme}>
                <View style={{
                    flex: 1
                }}>
                    {header}
                    <View style={{
                        flex: 1
                    }}>
                        <Tabs theme={CustomTheme} onChangeTab={this.onChangeTab}>
                            <ChatListView
                                tabLabel='All'
                                searchTerm={this.state.searchTerm}
                                onCreateChatPressed={this.onCreateChatPressed}/>
                            <MyChatListView
                                toggle={this.state.toggleMyChats}
                                tabLabel='My Chats'
                                searchTerm={this.state.searchTerm}
                                onCreateChatPressed={this.onCreateChatPressed}/>
                            <SettingsView tabLabel='Settings' user={this.state.user}/>
                        </Tabs>
                    </View>
                    {this.state.selectedTab === 0
                        ? <ActionButton
                                buttonColor="rgba(231,76,60,1)"
                                onPress={() => Actions.chatFormView({isBackButtonVisible: true})}/>
                        : null}
                </View>
            </ThemeProvider>
        );
    }
}

// Redux Call
const mapStateToProps = (state) => {
    return {socket: state.socket};
}
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(MainView);

// TODO: Collate all styles under Styles.js
const uiTheme = {
    palette: {
        primaryColor: '#69D2E7'
    },
    toolbar: {
        container: {
            height: 56
        }
    }
};