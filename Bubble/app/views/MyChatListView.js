import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Text, View, RefreshControl, ScrollView, LayoutAnimation, UIManager } from 'react-native';
import { Container, Header, Content, Button, Icon, InputGroup, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';
import Globals from '../globals';
import MyChatListComponent from '../components/MyChatListComponent';

export class MyChatListView extends Component {
    static propTypes = {
      onCreateChatPressed: PropTypes.func.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          refresh: false,
          searchTerm: '',
          showCategoryFilter: true,
          listing: []
        };
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.clearSearchBar = this.clearSearchBar.bind(this);
    }

    // componentWillReceiveProps(props) {
    //     if (props.searchTerm) {
    //         this.setState({searchTerm: props.searchTerm});
    //     }
    //     // // console.log("CHATLISTVIEW RECEIVES PROPS", props);
    //     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //     this.setState({refresh: !this.state.refresh});
    // }

    onSearchBarTextChange = (text) => {
      const showCategoryFilter = text == '';
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({
        searchTerm: text,
        showCategoryFilter: showCategoryFilter
      });
    }

    clearSearchBar = () => {
      this.setState({searchTerm: ''});
    }

    render() {
        const categoryButtons = Globals.CATEGORIES.map(function(name, index) {
          return (
            <Button style={{backgroundColor: Globals.CATEGORY_COLOURS[name]}} rounded info key={name} onPress={() => Actions.categoryListView({selectedCategory: name})}>
                <Text style={{fontSize: 10, color: 'white', fontWeight: "600"}} >{name}</Text>
            </Button>
          );
        }, this);

        return (
            <Container>
              {Platform.OS === 'ios' ?
                <Header searchBar rounded>
                  <InputGroup>
                    <Icon name='ios-search' />
                    <Input
                      placeholder='Search'
                      value={this.state.searchTerm}
                      onChangeText={this.onSearchBarTextChange}
                      style={{paddingBottom: 10}}/>
                    {this.state.searchTerm.length > 0 && <Icon underlayColor='transparent' transparent onPress={this.clearSearchBar} style={{backgroundColor: 'transparent', marginBottom: 5}}
                                name='ios-close' /> }
                  </InputGroup>
                  <Button transparent onPress={this.props.onCreateChatPressed}>
                    <Icon name='ios-create-outline' />
                  </Button>
                </Header>
                : null }
                <View style={{flex:1}}>
                  <MyChatListComponent
                    refresh={this.state.refresh}
                    searchTerm={this.state.searchTerm}
                    onCreateChatPressed={this.props.onCreateChatPressed}
                    listing={this.state.listing}
                    selectedTab={this.props.selectedTab} />
                </View>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    categoryButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      padding: 10,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    categoryButton: {
      marginBottom: 10,
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        socket: state.socket,
    }
        ;
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};
export default connectRedux(mapStateToProps, mapDispatchToProps)(MyChatListView);
