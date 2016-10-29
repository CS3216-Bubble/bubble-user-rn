import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import InformationComponent from '../components/InformationComponent';
import { connect as connectRedux } from 'react-redux';

export class InformationView extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Title>Useful Information</Title>
                </Header>
                <Content>
                    <InformationComponent />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    socket: state.socket
  }
;}
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(InformationView);
