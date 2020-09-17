import React, { Component } from 'react'

import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet
} from 'react-native'

import AddHeader from './AddHeader.js'
import AddOptions from './AddOptions.js'

class NoteScreen extends Component{

  render(){
    return(
      <View style={styles.NoteScreen}>
        <AddHeader />
        <View style={styles.MainBody}>
          <TextInput
            style={styles.MainBodyInput}
            multiline={true}
          />
        </View>
        <AddOptions />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  NoteScreen: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 50
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
  }
})

export default NoteScreen
