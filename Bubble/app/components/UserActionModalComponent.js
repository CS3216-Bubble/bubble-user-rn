import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Image, LayoutAnimation, Platform } from 'react-native';
import { Styles } from '../styles/Styles';
import { Button, Icon } from 'native-base';
import Modal from 'react-native-modalbox';

export default class UserActionModalComponent extends Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.toggle != this.props.toggle) {
            this.openModal();
        }
    }

    openModal() {
        this.refs.userActions.open();
    }

    closeModal() {
        this.refs.userActions.close();
    }

    render() {
        
        //    <Button style={{ margin: 4, padding: 8, backgroundColor: '#466C95' }} rounded >
        //        <Text style={{ fontSize: 14, fontWeight: '700', color: 'white' }}> Hide </Text>
        //    </Button>
        
        var avatar = 'http://flathash.com/' + this.props.modalInfo.otherUserId;
        return (
            <Modal
                backdrop={true}
                ref={"userActions"}
                swipeToClose={true}
                style={{ borderRadius: 10, height: 300, width: 300 }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Button transparent style={{ margin: 10, padding: 10 }} onPress={this.closeModal} >
                        <Icon name="ios-close" />
                    </Button>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        source={{ uri: avatar }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 96,
                            height: 96,
                            borderRadius: 48,
                        }}
                        />
                    <Text style={{ fontSize: 18, fontWeight: '600', color: 'grey', margin: 20 }}>
                        {this.props.modalInfo.otherUserName}
                    </Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Button style={{ margin: 4, padding: 8, backgroundColor: '#F73859' }} rounded onPress={()=> {this.props.onThanks(this.props.modalInfo); this.closeModal();}}>
                            <Text style={{ fontSize: 14, fontWeight: '700', color: 'white' }}> Thank </Text>
                        </Button>
                        <Button style={{ margin: 4, padding: 8, backgroundColor: '#F9A828' }} rounded onPress={()=> {this.props.onCheers(this.props.modalInfo); this.closeModal();}} >
                            <Text style={{ fontSize: 14, fontWeight: '700', color: 'white' }}> Cheer </Text>
                        </Button>
                    </View>
                </View>
            </Modal >
        );
    }
}