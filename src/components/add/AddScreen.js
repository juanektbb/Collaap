import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

class AddScreen extends Component{

  openNoteScreen = () => {
    this.props.navigation.navigate("NewItemScreen", { open_date: this.state.open_date })
  }

  constructor(props){
    super(props)
    this.state = {
      open_date: null
    }

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
      <View style={styles.AddScreen}>
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
  AddScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: 'center'
  },
  Option: {
    backgroundColor: "#fff",
    borderRadius: 70,
    width: 140,
    height: 140,

    justifyContent: "center",
    alignItems: 'center'
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

export default AddScreen
