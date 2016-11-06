import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';

import { Container, Header, Content, Button, Icon, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

import SettingsComponent from '../components/SettingsComponent';
import { connect as connectRedux } from 'react-redux';
import { generateName } from '../utils/ProfileHasher';

var adjectives = require('../utils/adjectives');
var animals = require('../utils/animals');

export class SettingsView extends Component {
    render() {
        const { bubbleId } = this.props;
        const user = {
          name: generateName(bubbleId) || "Anonymous Bubbler",
          imgSrc: `http://flathash.com/${bubbleId}`
        }

        return (
            <Container>
                {Platform.OS === 'ios' ?
                <Header>
                    <Title>Settings</Title>
                </Header>
                : null }
                <Content>
                    <SettingsComponent user={user} style={{ height: 300 }} />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    bubbleId: state.bubbleId
  }
;}
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(SettingsView);
