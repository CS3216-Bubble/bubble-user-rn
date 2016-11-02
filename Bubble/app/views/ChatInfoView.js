import React, { Component, PropTypes } from 'react';
import { Platform, Text, View, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import CustomTheme from '../themes/bubble';
import ChatInfoComponent from '../components/ChatInfoComponent';
import { connect as connectRedux } from 'react-redux';
import { exitRoom } from '../actions/Actions';

export class ChatInfoView extends Component {
    static propTypes = {
        chat: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.onQuit = this.onQuit.bind(this);
        this.state = {
            status: 'normal'
        };
    }

    onQuit() {
        this.props.exitRoom(this.props.socket, this.props.chat.roomId);
        this.setState({ status: "waiting" });
    }

    render() {
        const buttonColor = Platform.OS === 'ios' ? '#0E7AFE' : '#FFFFFF';

        return (
            this.state.status == 'waiting' ?
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator animating={true} size="large" style={{ backgroundColor: 'transparent' }} color="white" />
                    </View>
                </View>
                :
                <Container theme={CustomTheme}>
                    <Header>
                        <Button transparent onPress={Actions.pop}>
                            <Icon size={30} name='ios-arrow-back' color={buttonColor} />
                        </Button>
                        <Title>Chat Info</Title>
                    </Header>
                    <Content>
                        <ChatInfoComponent chat={this.props.chat} onQuit={this.onQuit} />
                    </Content>
                </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        socket: state.socket,
        aliasId: state.aliasId
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      exitRoom: (socket, roomId) => dispatch(exitRoom(socket, roomId)),
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatInfoView);

