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
        category: "shopping",
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
    this.setState({
      ...this.state,
      item: {
        ...this.state.item,
        title: text
      }
    })

    if(text !== "")
      this.props.navigation.setOptions({ title: text })
    else
      this.props.navigation.setOptions({ title: "Untitled Item" })
  }

  onChangeCategory = (category, backgroundColor) => {
    this.setState({
      ...this.state,
      item: {
        ...this.state.item,
        category: category
      },
      backgroundColor: backgroundColor
    })
  }

  submitItem = () => {
    console.log(this.state.item)
  }

  componentDidMount(){


    if(this.props.route.params !== undefined){
      const { item } = this.props.route.params

        console.log("bbb", item.category)

        this.setState({
          item: {
            ...this.state.item,
            title: item.title,
            category: item.category,
          }
        })

        this.props.navigation.setOptions({
          title: item.title
        })
    }




  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
          <View style={[styles.NoteScreen, {backgroundColor: this.state.backgroundColor}]}>
          <AddHeader
            item={this.state.item}
            onChangeTitle={this.onChangeTitle}
            onChangeCategory={this.onChangeCategory}
          />

          <View style={styles.MainBody}>
            <TextInput
              placeholder="What is happening?"
              multiline={true}
              style={styles.MainBodyInput}
            />
          </View>
          <AddOptions />
          <TouchableOpacity onPress={this.submitItem} style={styles.SubmitButton}>
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
    backgroundColor: colors.calltoaction,
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
