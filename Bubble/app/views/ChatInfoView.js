import React, { Component, PropTypes } from 'react';
import { Platform, Text, View, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Button, Icon, Title } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import CustomTheme from '../themes/bubble';
import ChatInfoComponent from '../components/ChatInfoComponent';
import { connect as connectRedux } from 'react-redux';
import Overlay from 'react-native-overlay';

export class ChatInfoView extends Component {
    static propTypes = {
        chat: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.onQuit = this.onQuit.bind(this);
        this.onExited = this.onExited.bind(this);
        this.state = {
            status: 'normal'
        };
    }

    onQuit() {
        console.log(this.props.chat);
        this.props.socket.emit('exit_room', { roomId: this.props.chat.roomId, user: this.props.aliasId[0] });
        this.setState({ status: "waiting" });
    }

    onExited() {
        if (Platform.OS === 'ios') {
            Actions.main({ type: ActionConst.REPLACE, selectedTab: 'all' });
        } else {
            Actions.main({ type: ActionConst.REPLACE, selectedTab: 0 });
        }
    }

    componentDidMount() {
        this.props.socket.on('exit_room', this.onExited);
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

    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(ChatInfoView);

