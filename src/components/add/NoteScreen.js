import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'



import AddHeader from './AddHeader.js'
import AddOptions from './AddOptions.js'

import NoteController from 'Collaap/src/utils/NoteController'

class NoteScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      item: {
        type: "note",
        title: "",
        category: "shopping",
        note: "",
        list_stuff: [],
        array_collaboratos: [],
        is_everyday: false,     //Priority 1
        start_date: new Date(), //Priority 2
        use_secondary: null,    //Priority 3 (null, date, time)
        end_date: new Date(),   //Priority 4
        time: new Date(),       //Priority 4 too
      },
      backgroundColor: colors.softwhite,
      error: false,
      error_msg: ""
    }
  }

  onChangeTitle = (text) => {
    this.setState({
      item: {
        ...this.state.item,
        title: text
      }
    })

    if(text !== ""){
      this.props.navigation.setOptions({ title: text })
      this.setState({
        error: false,
        error_msg: ""
      })
    }else{
      this.props.navigation.setOptions({ title: "Untitled Item" })
    }
  }

  onChangeCategory = (category, backgroundColor) => {
    this.setState({
      item: {
        ...this.state.item,
        category: category
      },
      backgroundColor: backgroundColor
    })
  }

  onChangeEveryday = () => {
    this.setState({
      item: {
        ...this.state.item,
        is_everyday: !this.state.item.is_everyday
      }
    })
  }

  apply_start_date = (timestamp) => {
    this.setState({
      item: {
        ...this.state.item,
        start_date: new Date(timestamp)
      },
    })
  }

  change_use_secondary = (value) => {
    this.setState({
      item: {
        ...this.state.item,
        use_secondary: value
      },
    })
  }

  apply_end_date = (timestamp) => {
    this.setState({
      item: {
        ...this.state.item,
        end_date: new Date(timestamp)
      },
    })
  }

  apply_time = (timestamp) => {
    this.setState({
      item: {
        ...this.state.item,
        time: new Date(timestamp)
      },
    })
  }

  toggle_array_collaborators = (collaborator) => {
    let array = this.state.item.array_collaboratos

    //It exists in array, remove it
    if(array.includes(collaborator)){
      let index = array.indexOf(collaborator)
      array.splice(index, 1)

    //It does not exists in array, add it
    }else{
      array.push(collaborator)
    }

    this.setState({
      item: {
        ...this.state.item,
        array_collaboratos: array
      }
    })
  }

  submitItem = async () => {

    if(this.state.item.title === ""){
      this.setState({
        error: true,
        error_msg: "You need to write a title for this note"
      })
      return false
    }

    const noteController = new NoteController(this.state.item)
    const savenote = await noteController.SaveNote()

    if(savenote['error']){
      this.setState({
        error: true,
        error_msg: savenote['msg']
      })
      return false

    }else{
      this.props.navigation.navigate('Home')
    }

  }

  componentDidMount(){

    //This screen is loading data
    if(this.props.route.params !== undefined){

      const { item } = this.props.route.params
      if(item!== undefined){
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

      const { open_date } = this.props.route.params
      if(open_date !== undefined && open_date !== null){
        this.setState({
          item: {
            ...this.state.item,
            start_date: new Date(open_date)
          },
        })
      }
    }
  }

  apply_main_body = (text) => {
    this.setState({
      item: {
        ...this.state.item,
        note: text
      }
    })
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
        <View style={[styles.NoteScreen, {backgroundColor: this.state.backgroundColor}]}>

          {this.state.error &&
            <View style={styles.MsgBox}>
              <Text style={styles.ErrorMsg}>{this.state.error_msg}</Text>
            </View>}

          <AddHeader
            item={this.state.item}
            onChangeTitle={this.onChangeTitle}
            onChangeCategory={this.onChangeCategory}
          />

          <Pressable style={styles.MainBody} onPress={() => this.mainTextInput.focus()}>
            <TextInput
              multiline={true}
              style={styles.MainBodyInput}
              placeholder="What is happening?"
              ref={(input) => { this.mainTextInput = input }}
              onChangeText={(text) => this.apply_main_body(text)}
            />
          </Pressable>

          <AddOptions
            item={this.state.item}
            toggle_array_collaborators={this.toggle_array_collaborators}
            apply_start_date={this.apply_start_date}
            apply_end_date={this.apply_end_date}
            apply_time={this.apply_time}
            change_use_secondary={this.change_use_secondary}
            onChangeEveryday={this.onChangeEveryday}
          />

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
  },
  MainBody: {
    flex: 1,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 10
  },
  MainBodyInput: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 9
  },
  MsgBox: {
    marginTop: 10,
    alignItems: "center"
  },
  ErrorMsg: {
    color: colors.calltoaction
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
