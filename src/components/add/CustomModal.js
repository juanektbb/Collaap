import React, { Component } from 'react'

import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

class CustomModal extends Component{

  constructor(props){
    super(props)
    this.state = {
      selected_category: null
    }
  }

  render(){
    return(
      <Modal
        visible={this.props.is_open}
        transparent={true}
        animationType="slide">
        <View style={styles.Modal}>
          <View style={styles.Content}>
            <TouchableOpacity style={styles.CloseBar} onPress={this.props.toggle_modal}>
              <Text style={styles.CloseX}>Cancel</Text>
            </TouchableOpacity>
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
    backgroundColor: "#000000aa",
    alignItems: "center"
  },
  Content: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 50,
    width: 320,
    padding: 23,
    flex: 1
  },
  CloseBar: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    marginBottom: 20,
  },
  CloseX: {
    fontSize: 16,
    padding: 5,
    textAlign: "center",
    color: 'red'
  }
})

export default CustomModal
