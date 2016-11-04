import React, { Component, PropTypes } from 'react';
import { StyleSheet, AppRegistry, View, Image, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { unsetFirstTimeUser } from '../actions/Actions';
import { connect as connectRedux } from 'react-redux';
import AppIntro from 'react-native-app-intro';

export class OnboardingView extends Component {
    static propTypes = {
      navigateToNext: PropTypes.func.isRequired,
    }

    onSkipBtnHandle = (index) => {
        this.props.onOnboardingFinished();
        this.props.navigateToNext();
    }

    onDoneBtnHandle = () => {
        this.props.onOnboardingFinished();
        this.props.navigateToNext();
    }

    render() {

        const pageArray = [
            {
                title: 'Need to rant about life?',
                description: '',
                img: (<Image source={require('../img/rant.png')} />),
                backgroundColor: '#69D2E7',
                type: 'header'
            },
            {
                title: 'Create a chatroom',
                description: '',
                img: (<Image style={styles.ssImg} source={require('../img/ss_create.png')} />),
                backgroundColor: '#2980b9',
                type: 'slide'
            },
            {
                title: 'Talk to people who care!',
                description: '',
                img: (<Image style={styles.ssImg} source={require('../img/ss_chat.png')} />),
                backgroundColor: '#2980b9',
                type: 'slide',
            },
            {
                title: 'Thank the people who help!',
                description: '',
                img: (<Image style={styles.ssImg} source={require('../img/ss_reactions.png')} />),
                backgroundColor: '#2980b9',
                type: 'slide'
            },
            {
                title: 'Want to chat with others and hear their worries?',
                description: '',
                img: (<Image source={require('../img/advice.png')} />),
                backgroundColor: '#f39c12',
                type: 'header'
            },
            {
                title: 'Browse through chats',
                description: 'Find a topic you care about and join in!',
                img: (<Image style={styles.ssImg} source={require('../img/ss_list.png')} />),
                backgroundColor: '#e67e22',
                type: 'slide'
            },
            {
                title: 'Someone annoying you on chat?',
                description: '',
                img: (<Image source={require('../img/worried.png')} />),
                backgroundColor: '#e74c3c',
                type: 'header'
            },
            {
                title: 'Hide them',
                description: 'No more troll messages',
                img: (<Image style={styles.ssImg} source={require('../img/ss_reactions3.png')} />),
                backgroundColor: '#e74c3c',
                type: 'slide'
            }
        ];

        const slides = pageArray.map(function (slide, index) {
            if (slide.type === 'header') {
                return (
                    <View key={index} style={[styles.slide, { backgroundColor: slide.backgroundColor }]}>
                        <View level={15} style={styles.headerImgContainer}>{slide.img}</View>
                        <View level={8}><Text style={styles.text}>{slide.title}</Text></View>
                        <View level={10}><Text style={styles.description}>{slide.description}</Text></View>
                    </View>
                );
            } else {
                return (
                    <View key={index} style={[styles.slide, { backgroundColor: slide.backgroundColor }]}>
                        <View level={15}><Text style={styles.text}>{slide.title}</Text></View>
                        <View level={8}><Text style={styles.description}>{slide.description}</Text></View>
                        <View level={10} style={styles.imgContainer}>{slide.img}</View>
                    </View>
                );
            }

        });

        return (
            <AppIntro
                onSkipBtnClick={this.onSkipBtnHandle}
                onDoneBtnClick={this.onDoneBtnHandle}>
                {slides}
            </AppIntro>
        );
    }
}


// Redux Call
const mapStateToProps = (state, ownProps) => {
    return {
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onOnboardingFinished: () => {
            dispatch(unsetFirstTimeUser());
        }
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(OnboardingView);

// TODO: Shift to Styles.js
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 70,
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    headerImgContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        height: 16 * 27,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ssImg: {
        width: 9 * 27,
        height: 16 * 27
    }
});
