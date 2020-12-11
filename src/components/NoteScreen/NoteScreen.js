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

import { SocketContext } from 'Collaap/src/auto/SocketContext.js'
import colors from 'Collaap/src/data/colors.js'

import NoteHeader from 'Collaap/src/components/NoteScreen/NoteHeader.js'
import NoteOptions from 'Collaap/src/components/NoteScreen/NoteOptions.js'
import InNote from 'Collaap/src/components/NoteScreen/InNote.js'
import InList from 'Collaap/src/components/NoteScreen/InList.js'
import Loading from 'Collaap/src/components/General/Loading'
import NoteController from 'Collaap/src/utils/NoteController'
import { withSafeAreaInsets } from 'react-native-safe-area-context'

import { 
  get_minimun_date,
  compute_start_date,
  compute_end_date,
  crop_screen_title
} from 'Collaap/src/helpers/note_screen_helpers.js'

class NoteScreen extends Component{

  static contextType = SocketContext

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
        list_items: [],
        list_bools: [],
        array_collaboratos: [],
        is_everyday: false,                      //Priority 1
        start_date: new Date(),                  //Priority 2
        use_secondary: null,                     //Priority 3 (null, date, time)
        end_date: get_minimun_date(new Date()),  //Priority 4
        time: new Date(),                        //Priority 4 too
      },
      min_end_date: null,
      loading: false,
      error: false,
      error_msg: ""
    }
  }

  //ITEM 1: Change title
  onChangeTitle = (text) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        title: text
      }
    }))

    //Change the title screen with the text given
    if(text !== ""){
      this.props.navigation.setOptions({ title: crop_screen_title(text) })
      this.setState({
        error: false,
        error_msg: ""
      })

    //Text not given, default title screen
    }else{
      this.props.navigation.setOptions({ title: "Untitled " + this.state.item.type })
    }
  }

  //ITEM 2: Change category
  onChangeCategory = (category) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        category: category
      }
    }))
  }

  //ITEM 3: Change everyday
  onChangeEveryday = () => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        is_everyday: !prevState.item.is_everyday
      }
    }))
  }

  //ITEM 4: Change start date
  apply_start_date = (timestamp) => {
    let to_start_date = new Date(timestamp)
    let to_min_end_date = get_minimun_date(to_start_date)
    let to_end_date = null

    //The new min start date is greater than end date
    if(this.state.item.end_date < to_min_end_date){
      to_end_date = to_min_end_date
    }

    //Update start, end and min end date
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        start_date: to_start_date,
        end_date: (to_end_date !== null) ? to_end_date : this.state.item.end_date
      },
      min_end_date: to_min_end_date
    }))
  }

  //ITEM 5: Change use secondary
  change_use_secondary = (value) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        use_secondary: value
      }
    }))
  }

  //ITEM 6: Change end date
  apply_end_date = (timestamp) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        end_date: new Date(timestamp)
      }
    }))
  }

  //ITEM 7: Change time
  apply_time = (timestamp) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        time: new Date(timestamp)
      }
    }))
  }

  //ITEM 8: Change array collaborators
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

  //ITEM 9: Change text body
  apply_main_body = (text) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        content: text
      }
    }))
  }

  //ITEM 10: Change lists
  apply_main_lists = (list_items, list_bools) => {
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        list_items: list_items,
        list_bools: list_bools
      }
    }))
  }

  /***************************************************************************/

  //LOAD AN ERROR IN SCREEN
  loadResponseError = (msg) => this.setState({ error: true, error_msg: msg })
  
  //LOADING ANIMATION TOGGLE
  toggleLoading = (bool) => this.setState({ loading: bool })

  /*
    SUBMIT: ITEM IS READY TO BE SENT FOR POST/PUT
  */
  submitItem = async () => {
    //Get the emitters reload from SocketContext
    const { emitReloadMyCalendar, emitReloadOneCalendarById, emitReloadCollaapsCalendars } = this.context  

    //There is no title in this element
    if(this.state.item.title === ""){
      this.loadResponseError("You need a title for this note!")
      return false
    }

    //Show loading animation
    this.toggleLoading(true)

    //NEW NOTE: POST - There is no item_id, so it is a new item
    if(this.state.item_id === null){

      //Create object and send to server
      const noteController = new NoteController(this.state.item)
      const response = await noteController.SaveNote()

      //Server response is an error, show to user
      if(response['error']){
        this.loadResponseError(response['msg'])
        this.toggleLoading(false)
        return false

      //Success from the server
      }else{

        //Get all collaaps in the note and reload their calendars
        const collaapsInvolved = noteController.CollaapsInvolved()
        emitReloadMyCalendar()
        emitReloadCollaapsCalendars(collaapsInvolved)
        
        //Take user to home screen
        this.toggleLoading(false)
        this.props.navigation.navigate('Home')

      }

    //UPDATE NOTE: PUT - There is item_id, so it is an existing item
    }else{

      //Update object and send to server
      const noteController = new NoteController(this.state.item)
      const response = await noteController.UpdateNote(this.state.item_id)

      //Server response is an error, show to user
      if(response['error']){
        this.loadResponseError(response['msg'])
        this.toggleLoading(false)
        return false

      //Success from the server
      }else{

        //Get all collaaps in the note and reload their calendars
        const collaapsInvolved = noteController.CollaapsInvolved()
        emitReloadMyCalendar()
        emitReloadOneCalendarById(this.state.item_user_id)
        emitReloadCollaapsCalendars(collaapsInvolved)

        //Take user to home screen
        this.toggleLoading(false)
        this.props.navigation.navigate('Home')

      }

    }
  }

  /*
    LOAD SOME DATA IN THIS NOTE
  */
  componentDidMount(){
    if(this.props.route.params !== undefined){

      //THIS SCREEN IS FOR UPDATING
      const { item } = this.props.route.params
      if(item !== undefined){

        this.setState(prevState => ({
          item_id: item._id,
          item_user_id: item.user,
          item: {
            ...prevState.item,
            type: item.type,
            title: item.title,
            content: item.content,
            list_items: item.list_items,
            list_bools: item.list_bools,
            category: item.category,
            array_collaboratos: item.collaborators,
            is_everyday: item.is_everyday,
            start_date: compute_start_date(item.is_everyday, item.start_date),
            use_secondary: item.use_secondary,
            end_date: compute_end_date(item.is_everyday, item.start_date, item.end_date),
            time: item.is_everyday ? new Date() : new Date(item.time)
          },

          //Compute the minimun end date
          min_end_date: get_minimun_date(
            compute_start_date(item.is_everyday, item.start_date)
          )
        }))
        
        //Set the title 
        this.props.navigation.setOptions({
          title: crop_screen_title(item.title)
        })
      }

      //This is for opening new item on start date
      const { open_date, type } = this.props.route.params
      if(open_date !== undefined && open_date !== null && type !== undefined && type !== null){
        this.props.navigation.setOptions({ title: "Untitled " + type })

        this.setState({
          item: {
            ...this.state.item,
            type: type,
            start_date: new Date(open_date),
            end_date: get_minimun_date(new Date(open_date))
          },
          min_end_date: get_minimun_date(new Date(open_date))
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

          <NoteHeader
            item={this.state.item}
            onChangeTitle={this.onChangeTitle}
            onChangeCategory={this.onChangeCategory} />

          {this.state.item.type === 'note' ?
            <InNote 
              value={this.state.item.content}
              apply_main_body={this.apply_main_body} />
            :
            <InList 
              list_items={this.state.item.list_items}
              list_bools={this.state.item.list_bools}
              apply_main_lists={this.apply_main_lists} />}

          <NoteOptions
            item={this.state.item}
            item_user_id={this.state.item_user_id}
            toggle_array_collaborators={this.toggle_array_collaborators}
            apply_start_date={this.apply_start_date}
            apply_end_date={this.apply_end_date}
            apply_time={this.apply_time}
            change_use_secondary={this.change_use_secondary}
            onChangeEveryday={this.onChangeEveryday}
            min_end_date={this.state.min_end_date} />

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
