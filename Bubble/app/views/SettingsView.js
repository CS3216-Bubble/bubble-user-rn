import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import SettingsComponent from '../components/SettingsComponent';
import { connect as connectRedux } from 'react-redux';

var adjectives = require('../utils/adjectives');
var animals = require('../utils/animals');

export class SettingsView extends Component {

    hashID(userId) {
        var hash = 0;
        if (userId.length == 0) return hash;
        for (i = 0; i < userId.length; i++) {
            char = userId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    // Name generator
    generateName(userId) {
        var hashCode = this.hashID(userId);
        var adj = adjectives.adjectives;
        var ani = animals.animals;
        // Get adjective
        var adjective = adj[((hashCode % adj.length) + adj.length) % adj.length];
        // Get animal
        var animal = ani[((hashCode % ani.length) + ani.length) % ani.length];
        // Return result
        return adjective + " " + animal;
    }

    state = {
        user: {
            name: this.generateName(this.props.socket.id),
            imgSrc: 'http://flathash.com/' + this.props.socket.id
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title>Settings</Title>
                </Header>
                <Content>
                    <SettingsComponent user={this.state.user} style={{ height: 300 }} />
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
export default connectRedux(mapStateToProps, mapDispatchToProps)(SettingsView);
