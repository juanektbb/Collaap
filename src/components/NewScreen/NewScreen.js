import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

class NewScreen extends Component{

  state = {
    open_date: null
  }

  openNoteScreen = () => {
    this.props.navigation.navigate("NewItemScreen", { open_date: this.state.open_date })
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
        <TouchableOpacity onPress={this.openNoteScreen}>
          <View style={styles.Option}>
            <Image style={styles.Icon} source={require("Collaap/src/images/add-note.png")} />
          </View>
        </TouchableOpacity>
        <View style={styles.Option}>
          <Image style={styles.Icon} source={require("Collaap/src/images/add-list.png")} />
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
    backgroundColor: "#fff",
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
