import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';

const splashScreenDelay = 0;

export class LandingView extends Component {
    render() {
        setTimeout(() => {
          if (this.props.isFirstTimeUser) {
            Actions.onboardingView({type: ActionConst.REPLACE});
          } else {
            Actions.main({type: ActionConst.REPLACE});
          }
        }, splashScreenDelay);
        return (
            <View style={styles.splashContainer}>
              <Image style={styles.splashImage} source={require('../img/logo_white.png')} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#69D2E7'
    },
    splashImage: {
      width: 180,
      resizeMode: 'contain'
    },
    splashText: {
      color: '#FFFFFF'
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        isFirstTimeUser: state.settings.isFirstTimeUser,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};

export default connectRedux(mapStateToProps, mapDispatchToProps)(LandingView);
