import React, { Component } from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable
} from 'react-native'

class AddScreen extends Component{

  openNoteScreen = () => {
    this.props.navigation.navigate("NewItemScreen")
  }

  render(){
    return (
      <View style={styles.AddScreen}>
        <Pressable onPress={this.openNoteScreen}>
          <View style={styles.Option}>
            <Image style={styles.Icon} source={require("Collaap/src/images/add-note.png")} />
            <Text style={styles.Text}>
              Note
            </Text>
          </View>
        </Pressable>
        <View style={styles.Option}>
          <Image style={styles.Icon} source={require("Collaap/src/images/add-note.png")} />
          <Text style={styles.Text}>
            List
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  AddScreen: {
    marginBottom: 50,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: 'center'
  },
  Option: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    width: 132,
    height: 132,
    alignItems: 'center'
  },
  Icon: {
    width: 90,
    height: 90,
    marginTop: 12
  },
  Text: {
    fontSize: 16,
    color: "#999",
  }
})

export default AddScreen
