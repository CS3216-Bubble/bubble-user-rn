import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, AppRegistry, View, Image, Text } from 'react-native';
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

        var imgList, imgCreate;

        if (Platform.OS === 'ios') {
            imgList = (<Image style={styles.ssImg} source={require('../img/ss_list_ios.png')} />);
            imgCreate = (<Image style={styles.ssImg} source={require('../img/ss_create_ios.png')} />);
        } else {
            imgList = (<Image style={styles.ssImg} source={require('../img/ss_list_android.png')} />);
            imgCreate = (<Image style={styles.ssImg} source={require('../img/ss_create_android.png')} />);
        }

 // {
            //     title: 'Hide the trolls',
            //     description: 'No more annoying messages!',
            //     img: (<Image style={styles.ssImg} source={require('../img/ss_hide.png')} />),
            //     backgroundColor: '#e74c3c',
            //     type: 'slide'
            // }
        const pageArray = [
            {
                title: 'Talk about anything!',
                description: '',
                img: imgList,
                backgroundColor: '#2980b9',
                type: 'slide',
            },
            {
                title: 'Create your own chatroom!',
                description: '',
                img: imgCreate,
                backgroundColor: '#f39c12',
                type: 'slide'
            },
            {
                title: 'Tap on people...',
                description: 'Cheer them on or thank them for their help!',
                img: (<Image style={styles.ssImg} source={require('../img/ss_reactions.png')} />),
                backgroundColor: '#3498db',
                type: 'slide'
            },
           
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
        paddingTop: 50,
        paddingBottom: 50
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
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
        height: Platform.OS === 'ios' ? 16 * 27 : 389
    }
});
