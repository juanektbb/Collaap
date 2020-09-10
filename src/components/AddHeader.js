import React, { Component } from 'react'

import {
  Text,
  View,
  TextInput,
  Image,
  Modal,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import CustomModal from './CustomModal'

class AddHeader extends Component{

  constructor(props){
    super(props)
    this.state = {
      modal_open: true
    }
  }

  func_open_modal = () => {
    this.setState({
      modal_open: true
    })
  }
  func_close_modal = () => {
    this.setState({
      modal_open: false
    })
  }

  render(){
    return(
      <View style={styles.AddHeader}>
        <TextInput style={styles.Title} value="Title" />

        <TouchableHighlight onPress={this.func_open_modal}>
          <View style={styles.ColorPicker}>
            <Image style={styles.ColorPickerImage} source={require('../images/category.png')} />
          </View>
        </TouchableHighlight>

        <CustomModal modal_open={this.state.modal_open} func_close_modal={this.func_close_modal}>

        </CustomModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  AddHeader: {
    flexDirection: "row"
  },
  Title: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 30,
    flex: 1,
    fontSize: 20
  },
  ColorPicker: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 10
  },
  ColorPickerImage: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginTop: 5
  }
})

export default AddHeader
