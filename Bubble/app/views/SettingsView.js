import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SettingsComponent from '../components/SettingsComponent';
import { connect as connectRedux } from 'react-redux';
import { generateName } from '../utils/ProfileHasher';
import { toggleNotificationsDisplayFlag } from '../actions/Actions';

export class SettingsView extends Component {
    render() {
        const { bubbleId } = this.props;
        const user = {
            name: generateName(bubbleId) || "Anonymous Bubbler",
            imgSrc: `http://flathash.com/${bubbleId}`
        }

        if (Platform.OS == 'ios') {
            return (
                <Container>
                    <Header>
                        <Title>Settings</Title>
                    </Header>
                    <Content>
                        <SettingsComponent user={user}
                            onChangeNotification={this.props.onChangeNotificationSettings}
                            notificationStats={this.props.notificationStats} />
                    </Content>
                </Container>);
        } else {
            return (
                <SettingsComponent user={user}
                    onChangeNotification={this.props.onChangeNotificationSettings}
                    notificationStats={this.props.notificationStats} />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        bubbleId: state.bubbleId,
        notificationStats: state.settings.showAllNotifications,
    }
        ;
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeNotificationSettings: () => {
            dispatch(toggleNotificationsDisplayFlag())
        }
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(SettingsView);
