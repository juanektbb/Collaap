import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  Pressable,
  TextInput,
  StyleSheet
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

class InNote extends Component{

  state = {
    keyboard_open: false
  }

  render(){
    return(<>
      {this.state.keyboard_open &&
        <View style={styles.DoneBox}>
          <Pressable style={Platform.OS == "ios" ? styles.DoneButtonIOS : styles.DoneButtonAndroid} onPress={() => {
              this.mainTextInput.blur()
              this.setState({ keyboard_open: false })
            }}>
            <Text style={styles.DoneText}>Done</Text>
          </Pressable>
        </View>}

      <Pressable style={styles.MainBody} onPress={() => this.mainTextInput.focus()}>
        <TextInput
          multiline={true}
          style={styles.MainBodyInput}
          placeholder="What is happening?"
          value={this.props.value}
          ref={(input) => { this.mainTextInput = input }}
          onChangeText={(text) => this.props.apply_main_body(text)}
          onFocus={() => this.setState({ keyboard_open: true })}
          onBlur={() => this.setState({ keyboard_open: false })}
        />
      </Pressable>
    </>)
  }

}

const styles = StyleSheet.create({
  MainBody: {
    flex: 1,
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.softergrey,
    marginHorizontal: 10
  },
  MainBodyInput: {
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: Platform.OS == 'ios' ? 0 : 5,
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
    color: colors.white,
    fontSize: 15,
    lineHeight: 18
  }
})

export default InNote