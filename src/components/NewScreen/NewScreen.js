import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import colors from "Collaap/src/data/colors.js"

class NewScreen extends Component{

  state = {
    open_date: null
  }

  openNoteScreen = (type) => {
    this.props.navigation.navigate("NewItemScreen", { open_date: this.state.open_date, type: type })
  }

  componentDidMount(){
    if(this.props.route.params !== undefined){
      const { open_date } = this.props.route.params

      this.setState({
        open_date: open_date
      })
    }
  }

  render(){
    return (
      <View style={styles.NewScreen}>
        <TouchableOpacity onPress={() => this.openNoteScreen('note')}>
          <View style={styles.Option}>
            <Image style={styles.Icon} source={require("Collaap/src/images/add-note.png")} />
          </View>
        </TouchableOpacity >
        <View style={styles.Option}>
          <TouchableOpacity onPress={() => this.openNoteScreen('list')}>
            <Image style={styles.Icon} source={require("Collaap/src/images/add-list.png")} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  NewScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: 'center'
  },
  Option: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: "center"
  },
  Icon: {
    width: 60,
    height: 60,
  },
  Text: {
    fontSize: 16,
    paddingTop: 8,
    color: "#666",
  }
})

export default NewScreen
