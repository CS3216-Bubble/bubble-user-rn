/**
 * Chat List View
 */

import React, { Component, PropTypes } from 'react';

// React Native Components
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Navigator,
    NavigationBarRouteMapper,
} from 'react-native';

// Native Base Components
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon,
    InputGroup,
    Input,
    Toolbar
} from 'native-base';

// Styling ... to be migrated
const styles = StyleSheet.create({
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
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
    },
    centralise: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

var navbarAndroidAdds = {

    LeftButton: function (route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }

        var previousRoute = navState.routeStack[index - 1];
        return (null);
    },

    RightButton: function (route, navigator, index, navState) {
        return (null);
    },

    Title: function (route, navigator, index, navState) {
        return (<Title style={{ color: 'white', margin: 0, textAlign: 'center' }}>
            Chat List View
        </Title>);
    },

};

export class ChatListView extends Component {

    //*** START OF IOS NAV METHODS ***//

    static propTypes = {
        title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this._onForward = this._onForward.bind(this);
        this._onBack = this._onBack.bind(this);
    }

    _onForward(nextRoute) {
        this.props.navigator.push(nextRoute);
    }

    _onBack() {
        this.props.navigator.pop();
    }

    //*** END OF IOS NAV METHODS ***//


    //*** START OF ANDROID NAV METHODS ***//

    gotoNext() {
        // this.props.navigator.push();
    }

    gotoPrev() {
        // this.props.navigator.pop();
    }

    renderScene(route, navigator) {
        return (
            <Container>

                <Header>
                </Header>

                <Content>
                    <View>
                        <Text style={styles.welcome}>Chat List View Android</Text>
                        <Text style={styles.instructions}>To get started, edit this js.</Text>
                        <Text style={styles.instructions}>
                            Double tap R on your keyboard to reload,{'\n'}
                            Shake or press menu button for dev menu</Text>
                    </View>
                </Content>

            </Container>
        );
    }

    //*** END OF ANDROID NAV METHODS ***//


    // Display Layout
    render() {

        if (Platform.OS === 'ios')
            return (
                <Container>

                    <Content>

                        <View style={{marginTop: 60}}>
                            <Text style={styles.welcome}>Chat List View IOS</Text>
                            <Text style={styles.instructions}>To get started, edit this js.</Text>
                            <Text style={styles.instructions}>
                                Press Cmd+R to reload,{'\n'}
                                Cmd+D or shake for dev menu
                            </Text>
                        </View>
                    </Content>

                    <Footer>
                    </Footer>

                </Container>
            )
        else
            return (
                <Navigator
                    renderScene={this.renderScene.bind(this)}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={{ backgroundColor: '#246dd5', alignItems: 'center' }}
                            navigationStyles={Navigator.NavigationBar.StylesIOS}
                            routeMapper={navbarAndroidAdds} />
                    }
                    />
            );
    }
}


/*** Old Code ***/

// <Container>

//     <Header>
//         <Title>{this.props.title}</Title>
//         <Button transparent>Search</Button>
//         <Button transparent>Options</Button>
//     </Header>

//     <Content>
//         <View>
//             <Text style={styles.welcome}>Chat List View Android</Text>
//             <Text style={styles.instructions}>To get started, edit this js.</Text>
//             <Text style={styles.instructions}>
//                 Double tap R on your keyboard to reload,{'\n'}
//                 Shake or press menu button for dev menu</Text>
//         </View>
//     </Content>

//     <Footer>
//     </Footer>

// </Container>