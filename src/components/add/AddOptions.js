import React, { Component } from 'react'

import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet
} from 'react-native'

class AddOptions extends Component{
  render(){
    return(
      <View style={styles.AddOptions}>
        <View style={styles.OptionsBox}>
          <Image style={styles.OptionsImage} source={require('Collaap/src/images/star.png')}/>
        </View>
        <View style={styles.OptionsBox}>
          <Image style={styles.OptionsImage} source={require('Collaap/src/images/star.png')}/>
        </View>
        <View style={styles.OptionsBox}>
          <Image style={styles.OptionsImage} source={require('Collaap/src/images/star.png')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  AddOptions: {
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  OptionsBox: {
    width: 60,
    height: 60
  },
  OptionsImage: {
    width: 60,
    height: 60
  }
})

export default AddOptions
