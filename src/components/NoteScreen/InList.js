import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet
} from 'react-native'

import CheckBox from '@react-native-community/checkbox'
import colors from 'Collaap/src/data/colors.js'

class InList extends Component{

  constructor(props) {
    super(props);
    this.listEntryInput = {}

    this.state = {
      keyboard_open: false,
      keyboard_focused: null
    }
  }
  
  //Change the text of an entry
  onChangeListEntry = (text, index) => {
    const list_entry = this.props.list_items.slice()
    list_entry[index] = text

    this.props.apply_main_lists(list_entry, this.props.list_bools)
  }

  //Change the bool of an entry
  onToggleListEntry = (bool, index) => {
    const bool_entry = this.props.list_bools.slice()
    bool_entry[index] = bool

    this.props.apply_main_lists(this.props.list_items, bool_entry)
  } 

  //Add a entry (text and bool)
  onAddToList = (text) => {
    const list_entry = [...this.props.list_items]
    const bool_entry = [...this.props.list_bools]
    list_entry.push(text)
    bool_entry.push(false)

    this.props.apply_main_lists(list_entry, bool_entry)
  }

  //Delete an entry (text and bool)
  onDeleteListEntry = (index) => {
    const list_entry = [...this.props.list_items]
    const bool_entry = [...this.props.list_bools]
    list_entry.splice(index, 1)
    bool_entry.splice(index, 1)

    this.props.apply_main_lists(list_entry, bool_entry)
  }

  render(){
    return(<>
      {this.state.keyboard_open &&
        <View style={styles.DoneBox}>
          <Pressable style={Platform.OS == "ios" ? styles.DoneButtonIOS : styles.DoneButtonAndroid} onPress={() => {
              this.state.keyboard_focused.blur()
              this.setState({ keyboard_open: false })
            }}>
            <Text style={styles.DoneText}>Done</Text>
          </Pressable>
        </View>}

        <View style={styles.ListBody}>
          <FlatList 
            data={this.props.list_items}
            keyExtractor={(item, index) => index.toString()}

            ListEmptyComponent={() => 
              <View style={styles.ListEmpty}>
                <Text style={styles.ListEmptyText}>Write your first item below</Text>
              </View>}

            renderItem={({item, index}) => 
              <View style={styles.ListEntry}>
                <View style={styles.ListEntryCheckbox}>
                  <CheckBox
                    tintColors={{true: colors.calltoaction, false: "#ddd"}}
                    tintColor={"#ddd"}
                    lineWidth={1}
                    onTintColor={colors.calltoaction}
                    onCheckColor={colors.calltoaction}
                    animationDuration={0.25}
                    value={this.props.list_bools[index]}
                    onValueChange={(bool) => this.onToggleListEntry(bool, index)}
                  />
                </View>

                <TextInput
                  value={item}
                  maxLength={25}
                  placeholder="Empty"
                  style={styles.ListEntryInput}
                  ref={(input) => { this.listEntryInput[index] = input }}
                  onFocus={() => {
                    this.setState({
                      keyboard_open: true,
                      keyboard_focused: this.listEntryInput[index]
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      keyboard_open: false,
                      keyboard_focused: null
                    })
                  }}
                  onSubmitEditing={(target) => {
                    if(target.nativeEvent.text === ""){
                      this.onDeleteListEntry(index)
                    }
                    this.setState({
                      keyboard_open: false,
                      keyboard_focused: null
                    })
                  }}
                  onChangeText={(text) => this.onChangeListEntry(text, index)} />

                <Pressable style={styles.ListEntryDelete} onPress={() => this.onDeleteListEntry(index)}>
                  <Text style={styles.ListEntryCross}>&#10005;</Text>
                </Pressable>
              </View>}

            ListFooterComponent={
              <View style={styles.ListEntry}>
                <TextInput
                  maxLength={25}
                  placeholder="New item"
                  style={styles.ListEntryInput}
                  ref={(input) => { this.newItemInput = input }}
                  blurOnSubmit={false}
                  onFocus={() => {
                    this.setState({ 
                      keyboard_open: true,
                      keyboard_focused: this.newItemInput
                    })
                  }}
                  onBlur={(target) => {
                    if(target.nativeEvent.text && target.nativeEvent.text !== ""){
                      this.onAddToList(target.nativeEvent.text)
                      this.newItemInput.clear()
                    }

                    this.setState({
                      keyboard_open: false,
                      keyboard_focused: null
                    })
                  }}
                  onSubmitEditing={(target) => {
                    if(target.nativeEvent.text && target.nativeEvent.text !== ""){
                      this.onAddToList(target.nativeEvent.text)
                      this.newItemInput.clear()

                    }else{
                      this.newItemInput.blur()
                    }
                  }}
                />
              </View>}

            ref={ref => this.flatList = ref}
            onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          />
        </View>
    </>)
  }

}

const styles = StyleSheet.create({
  ListBody: {
    flex: 1,
    marginTop: 15,
  }, 
  ListEmpty: { 
    marginTop: 5,
    marginHorizontal: 10,
  },
  ListEmptyText: {
    textAlign: "center",
    color: "#bbb",
  },
  ListEntry: {
    height: 40,
    marginVertical: 5,
    marginHorizontal: 10,   
    flexDirection: "row"
  },
  ListEntryCheckbox: {
    width: 34,
    marginRight: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ListEntryInput: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  ListEntryDelete: {
    width: 40,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  ListEntryCross: {
    color: colors.calltoaction,
    fontSize: Platform.OS === "ios" ? 20 : 26,
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
    paddingVertical: 6,
    paddingHorizontal: 13,
    backgroundColor: colors.calltoaction,
  },
  DoneButtonAndroid: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: colors.calltoaction,
  },
  DoneText: {
    color: "white",
    fontSize: 15,
    lineHeight: 18
  }
})

export default InList