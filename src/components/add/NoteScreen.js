import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

import AddHeader from './AddHeader.js'
import AddOptions from './AddOptions.js'
import Loading from 'Collaap/src/components/general/Loading'
import NoteController from 'Collaap/src/utils/NoteController'
import { withSafeAreaInsets } from 'react-native-safe-area-context'

class NoteScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      item_id: null,
      item_user_id: null,
      item: {
        type: "note",
        title: "",
        category: "general",
        content: "",
        list_stuff: [],
        array_collaboratos: [],
        is_everyday: false,     //Priority 1
        start_date: new Date(), //Priority 2
        use_secondary: null,    //Priority 3 (null, date, time)
        end_date: new Date(),   //Priority 4
        time: new Date(),       //Priority 4 too
      },
      loading: false,
      error: false,
      error_msg: "",
      keyboard_open: false
    }
  }

  //Item 1: Change title
  onChangeTitle = (text) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        title: text
      }
    }))

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

  //Item 2: Change category
  onChangeCategory = (category) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        category: category
      }
    }))
  }

  //Item 3: Change everyday
  onChangeEveryday = () => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        is_everyday: !prevState.item.is_everyday
      }
    }))
  }

  //Item 4: Change start date
  apply_start_date = (timestamp) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        start_date: new Date(timestamp)
      }
    }))
  }

  //Item 5: Change use secondary
  change_use_secondary = (value) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        use_secondary: value
      }
    }))
  }

  //Item 6: Change end date
  apply_end_date = (timestamp) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        end_date: new Date(timestamp)
      }
    }))
  }

  //Item 7: Change time
  apply_time = (timestamp) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        time: new Date(timestamp)
      }
    }))
  }

  //Item 8: Change array collaborators
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

    this.setState(prevState => ({
      item: {
        ...prevState.item,
        array_collaboratos: array
      }
    }))
  }

  //Item 9: Change text body
  apply_main_body = (text) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        content: text
      }
    }))
  }

  loadResponseError = (msg) => {
    this.setState({ error: true, error_msg: msg })
  }

  toggleLoading = (bool) => {
    this.setState({ loading: bool })
  }

  //ITEM IS READY TO BE SENT
  submitItem = async () => {
    this.toggleLoading(true)

    //There is no title in this element
    if(this.state.item.title === ""){
      this.loadResponseError("You need to write a title for this note")
      return false
    }

    //There is no item_id, so new item
    if(this.state.item_id === null){
      const noteController = new NoteController(this.state.item)
      const response = await noteController.SaveNote()

      if(response['error']){
        this.loadResponseError(response['msg'])
        this.toggleLoading(false)
        return false

      }else{
        this.toggleLoading(false)
        this.props.navigation.navigate('Home')
      }

    //There is item_id, so update item
    }else{
      const noteController = new NoteController(this.state.item)
      const response = await noteController.UpdateNote(this.state.item_id)

      if(response['error']){
        this.loadResponseError(response['msg'])
        return false

      }else{
        this.toggleLoading(false)
        this.props.navigation.navigate('Home')
      }
    }
  }

  //LOAD SOME DATA IN THIS NOTE
  componentDidMount(){
    if(this.props.route.params !== undefined){

      //This screen is for updating
      const { item } = this.props.route.params
      if(item !== undefined){

        this.setState(prevState => ({
          item_id: item._id,
          item_user_id: item.user,
          item: {
            ...prevState.item,
            title: item.title,
            content: item.content,
            category: item.category,
            array_collaboratos: item.collaborators,
            is_everyday: item.is_everyday,
            start_date: item.is_everyday ? new Date() : new Date(item.start_date),
            use_secondary: item.use_secondary,
            end_date: item.is_everyday ? new Date() : new Date(item.end_date),
            time: item.is_everyday ? new Date() : new Date(item.time)
          }
        }))

        this.props.navigation.setOptions({
          title: item.title
        })
      }

      //This is for opening new item on start date
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

  render(){
    return(<>
      {this.state.loading && <Loading />}

      {!this.state.loading &&
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
        <View style={styles.NoteScreen}>

          {this.state.error &&
            <View style={styles.MsgBox}>
              <Text style={styles.ErrorMsg}>{this.state.error_msg}</Text>
            </View>}

          <AddHeader
            item={this.state.item}
            onChangeTitle={this.onChangeTitle}
            onChangeCategory={this.onChangeCategory}/>

          {this.state.keyboard_open &&
          <View style={styles.DoneBox}>
            <Pressable style={Platform.OS == "ios" ? styles.DoneButtonIOS : styles.DoneButtonAndroid} onPress={() => {
                this.mainTextInput.blur()
                this.setState({ keyboard_open: false })
              }
            }>
              <Text style={styles.DoneText}>Done</Text>
            </Pressable>
          </View>}

          <Pressable style={styles.MainBody} onPress={() => this.mainTextInput.focus()}>
            <TextInput
              multiline={true}
              style={styles.MainBodyInput}
              placeholder="What is happening?"
              value={this.state.item.content}
              ref={(input) => { this.mainTextInput = input }}
              onChangeText={(text) => this.apply_main_body(text)}
              onFocus={() => {
                this.setState({ keyboard_open: true })
              }}
            />
          </Pressable>

          



          <AddOptions
            item={this.state.item}
            item_user_id={this.state.item_user_id}
            toggle_array_collaborators={this.toggle_array_collaborators}
            apply_start_date={this.apply_start_date}
            apply_end_date={this.apply_end_date}
            apply_time={this.apply_time}
            change_use_secondary={this.change_use_secondary}
            onChangeEveryday={this.onChangeEveryday}/>

          <TouchableOpacity onPress={this.submitItem} style={styles.SubmitButton}>
            <Text style={styles.SubmitButtonText}>
              {this.state.item_id === null ? "Save Note" : "Update Note"}
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>}
    </>)
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
    lineHeight: 20,
    paddingVertical: 0,
    paddingHorizontal: 9
  },
  DoneBox:{
    marginTop: 10,
    marginBottom: -10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "flex-end"
  },
  DoneButtonIOS: {
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 13,
    backgroundColor: colors.calltoaction,
  },
  DoneButtonAndroid: {
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 13,
    backgroundColor: colors.calltoaction,
  },
  DoneText: {
    color: "white",
    fontSize: 15,
    lineHeight: 18
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
