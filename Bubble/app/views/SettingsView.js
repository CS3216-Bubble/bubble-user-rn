import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SettingsComponent from '../components/SettingsComponent';
import { connect as connectRedux } from 'react-redux';
import { generateName, genOnlineProfImgSrc } from '../utils/ProfileHasher';
import { setGender, toggleNotificationsDisplayFlag } from '../actions/Actions';

export class SettingsView extends Component {

    state = {
        user: {
            name: this.props.socket.id ? generateName(this.props.socket.id) : "Anonymous Bubbler",
            imgSrc: genOnlineProfImgSrc(this.props.socket.id ? this.props.socket.id : '1')
        }
    }

    render() {
        if (Platform.OS == 'ios') {
            return (
                <Container>
                    <Header>
                        <Title>Settings</Title>
                    </Header>
                    <Content>
                        <SettingsComponent user={this.state.user}
                            onChangeGender={this.props.onChangeGenderSettings}
                            onChangeNotification={this.props.onChangeNotificationSettings}
                            genderStats={this.props.genderStats}
                            notificationStats={this.props.notificationStats} />
                    </Content>
                </Container>);
        } else {
            return (
                <SettingsComponent user={this.state.user}
                    onChangeGender={this.props.onChangeGenderSettings}
                    onChangeNotification={this.props.onChangeNotificationSettings}
                    genderStats={this.props.genderStats}
                    notificationStats={this.props.notificationStats} />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        notificationStats: state.settings.showAllNotifications,
        genderStats: state.settings.gender
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeNotificationSettings: () => {
            dispatch(toggleNotificationsDisplayFlag())
        },
        onChangeGenderSettings: (gender) => {
            dispatch(setGender(gender))
        }
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(SettingsView);
