import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, InputGroup, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

export default class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = {
    isEditMode: false,
    name: this.props.user.name,
    inputValue: this.props.user.name,
  }

  isNameValid = () => {
    return this.state.inputValue != '';
  }

  saveName = () => {
    console.log('save');
    // Action to save name
    this.setState({isEditMode: false, name: this.state.inputValue});
  }

  render() {
    console.log(this.state.isEditMode);
    const buttonColour = this.isNameValid() ? {color:'#00C497'} : {color:'#999999'};

    return (
      <View style={styles.profileContainer}>
        <Image source={{ uri: this.props.user.imgSrc }} style={styles.profileContainerImage}/>
        <View style={styles.profileContainerName}>
          { this.state.isEditMode ?
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Input
                value={this.state.inputValue}
                placeholder='Your nickname'
                style={{textAlign: 'center'}}
                onChangeText={(text) => this.setState({inputValue: text})}/>
              <Button transparent onPress={this.saveName}>
                <Icon size={20} name='check' style={buttonColour} />
              </Button>
            </View>:
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.profileContainerText}>{this.state.name}</Text>
              <Button transparent onPress={() => this.setState({isEditMode: true})}>
                <Icon size={20} name='edit' />
              </Button>
            </View>
          }
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    profileContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
      backgroundColor: '#A7DBD8'
    },
    profileContainerName: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    profileContainerText: {
      fontSize: 20
    },
    profileContainerImage: {
      marginBottom: 15,
      height: 80,
      width: 80,
      borderRadius: 40
    }
});
