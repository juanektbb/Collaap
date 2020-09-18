import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

import AddHeader from './AddHeader.js'
import AddOptions from './AddOptions.js'

class NoteScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      item: {
        type: undefined,
        category: null,
        title: "",
        note: "",
        list_stuff: [],
        starred: false,
        reminder: false
      },
      backgroundColor: colors.softwhite
    }
  }

  onChangeTitle = (text) => {
    this.setState({ title: text })
  }

  onChangeCategory = (category, backgroundColor) => {
    this.setState({
      item: { category: category },
      backgroundColor: backgroundColor
    })
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
          <View style={[styles.NoteScreen, {backgroundColor: this.state.backgroundColor}]}>
          <AddHeader onChangeTitle={this.onChangeTitle} onChangeCategory={this.onChangeCategory} />
          <View style={styles.MainBody}>
            <TextInput
              placeholder="What is happening?"
              multiline={true}
              style={styles.MainBodyInput}
            />
          </View>
          <AddOptions />
          <TouchableOpacity style={styles.SubmitButton}>
            <Text style={styles.SubmitButtonText}>Save this</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  NoteScreen: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 50,
  },

  MainBody: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 10,
    marginTop: 20,
    flex: 1
  },
  MainBodyInput: {
    fontSize: 20
  },
  SubmitButton: {
    backgroundColor: colors.sweetpeach,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  SubmitButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#f2f2f2",
  },
})

export default NoteScreen
