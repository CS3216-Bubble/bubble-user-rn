import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { List, ListItem } from 'native-base';

import ProfileComponent from './ProfileComponent';

export default class SettingsComponent extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
  }

  render() {
      return (
        <ScrollView>
          <Text>{this.props.searchTerm}</Text>
        </ScrollView>
      );
  }
}

var styles = StyleSheet.create({

});
