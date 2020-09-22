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
        array_collaboratos: [],
        starred: false,
        reminder: false,

        is_everyday: false,
        start_date: new Date(),
        end_date: new Date(),
        time: new Date(),

      },
      backgroundColor: colors.softwhite
    }
  }

  onChangeTitle = (text) => {
    this.setState({
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

  onChangeReminder = () => {



  }



  apply_start_date = (timestamp) => {
    this.setState({
      item: {
        ...this.state.item,
        start_date: new Date(timestamp)
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

    return;
  }










  submitItem = () => {
    console.log(this.state.item)
  }

  componentDidMount(){

    //This screen is loading data
    if(this.props.route.params !== undefined){
      const { item } = this.props.route.params

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
          <AddOptions
            item={this.state.item}
            toggle_array_collaborators={this.toggle_array_collaborators}
            apply_start_date={this.apply_start_date}
            apply_end_date={this.apply_end_date}
            apply_time={this.apply_time}

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
    marginBottom: 50,
  },
  MainBody: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1
  },
  MainBodyInput: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 9
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
