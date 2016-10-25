import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default class UserActionModalComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: true};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    // return (
    //   <View style={{marginTop: 22}}>
    //     <Modal
    //       animationType={"slide"}
    //       transparent={false}
    //       visible={this.state.modalVisible}
    //       onRequestClose={() => {alert("Modal has been closed.")}}
    //       >
    //      <View style={{marginTop: 22}}>
    //       <View>
    //         <Text>Hello World!</Text>

    //         <TouchableHighlight onPress={() => {
    //           this.setModalVisible(!this.state.modalVisible)
    //         }}>
    //           <Text>Hide Modal</Text>
    //         </TouchableHighlight>

    //       </View>
    //      </View>
    //     </Modal>

    //     <TouchableHighlight onPress={() => {
    //       this.setModalVisible(true)
    //     }}>
    //       <Text>Show Modal</Text>
    //     </TouchableHighlight>

    //   </View>
    // );


     return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.props.onDismiss();
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}