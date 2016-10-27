import React, { Component, PropTypes } from 'react';

import { StyleSheet } from 'react-native';

export var Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
        margin: 0,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '100',
        color: '#333333',
        marginBottom: 0,
    },
    categories: {
        flex: 1,
        flexDirection: 'row',
        marginTop: -10,
        paddingBottom: 15
        // alignItems: 'stretch',
        // justifyContent: 'flex-start',
    },
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
    },
    centralise: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    wrapper: {
        flex: 1,
    },
    imageContainer: {
        height: 36,
        width: 36,
        borderRadius: 18,
        justifyContent: 'space-between',
        marginRight: 10
    },
    image: {
        height: 36,
        width: 36,
        borderRadius: 18,
        justifyContent: 'space-between'
    },
    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 10,
    },
    cardThumbnail: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#A7DBD8',
        borderRadius: 30,
        padding: 20,
        margin: 5
    },
    cardMainRow: {
        flexDirection: 'row',
        height: 70,
    },
    cardMainRowText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 5,
        paddingRight: 5,
    },
    cardTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitleText: {
        flex: 1,
        fontSize: 20,
        fontWeight: '500',
    },
    cardSubRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cardSubRowTextLeft: {
        flex: 1,
        fontSize: 12,
        textAlign: 'left'
    },
    cardSubRowRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cardSubRowTextRight: {
        fontSize: 12,
        marginRight: 10,
    },
    cardFooterRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    placeholderContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '100',
        flexDirection: 'row',
        height: 30,
    },
    placeholderImage: {
        height: 128,
        width: 128,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 18,
        width: 200,
        fontSize: 16,
        fontWeight: '500',
        marginTop: 2
    },
    subtitle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 10,
        width: 200,
        fontSize: 8,
        fontWeight: '400',
        paddingTop: 2
    },
    formContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    formRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    formRowColumn: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    }
});
