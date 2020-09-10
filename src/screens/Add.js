import React, { Component } from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native'

class Add extends Component{

  render(){
    return (
      <View style={styles.Add}>
        <View style={styles.Option}>
          <Image style={styles.Icon} source={require("../images/add-note.png")} />
          <Text style={styles.Text}>
            Notes
          </Text>
        </View>
        <View style={styles.Option}>
          <Image style={styles.Icon} source={require("../images/add-note.png")} />
          <Text style={styles.Text}>
            List
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Add: {
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

export default Add
