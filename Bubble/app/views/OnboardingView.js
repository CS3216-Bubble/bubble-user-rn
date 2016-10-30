import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import AppIntro from 'react-native-app-intro';

export class OnboardingView extends Component {
  onSkipBtnHandle = (index) => {
    // this.props.onOnboardingFinished();
    Actions.main({type: ActionConst.REPLACE});
  }
  doneBtnHandle = () => {
    // this.props.onOnboardingFinished();
    Actions.main({type: ActionConst.REPLACE});
  }
  nextBtnHandle = (index) => {

  }
  onSlideChangeHandle = (index, total) => {
    // console.log(index, total);
  }
  render() {
    const pageArray = [{
      title: 'Page 1',
      description: 'Description 1',
      img: 'https://goo.gl/Bnc3XP',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 2',
      description: 'Description 2',
      img: 'https://goo.gl/Bnc3XP',
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // onOnboardingFinished: () => {
        //   dispatch(unsetFirstTimeUser());
        // }
    };
};

export default connectRedux(mapStateToProps, mapDispatchToProps)(OnboardingView);
