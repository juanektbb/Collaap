import React, { Component } from 'react'

import {
  Text,
  View,
  Image,
  Modal,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

class CustomModal extends Component{

  render(){
    return(
      <Modal
        visible={this.props.modal_open}
        transparent={true}
        animationType="slide">
        <View style={styles.Modal}>
          <View style={styles.Content}>
            <TouchableHighlight
              style={styles.CloseBar}
              onPress={this.props.func_close_modal}>
                <Text style={styles.CloseX}>&#10005;</Text>
            </TouchableHighlight>
            {this.props.children}
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  Modal: {
    flex: 1,
    backgroundColor: "#000000aa"
  },
  Content: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 40,
    padding: 20,
    flex: 1
  },
  CloseBar: {
    position: 'absolute',
    right: 15,
    top: 10
  },
  CloseX: {
    fontSize: 26
  }
})

export default CustomModal
