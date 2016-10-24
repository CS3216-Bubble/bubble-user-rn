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
    card: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '100',
        flexDirection: 'row'
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
    }
});