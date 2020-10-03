import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native'

import characters from 'Collaap/src/data/characters.js'
import colors from 'Collaap/src/data/colors.js'

class Profile extends Component{

  constructor(props){
    super(props)
    this.state = {
      details: {
        icon: require('Collaap/src/images/users/user-0.png')
      }
    }
  }

  choose_icon = (image) => {
    this.setState({
      details: {
        ...this.state.details,
        icon: image,
      }
    })
  }

  save_profile = () => {

  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.ChooseCharacter}>
            <View style={styles.MainIconBox}>
              <Image source={this.state.details.icon} style={styles.MainIcon}/>
            </View>
            <View style={styles.CharactersSelection}>
              <FlatList
                horizontal
                keyExtractor={item => item.name}
                data={characters}
                style={styles.Slide}
                ItemSeparatorComponent={() =>
                  <View style={styles.Separator} />}
                renderItem={({item}) =>
                  <Pressable onPress={() => this.choose_icon(item.icon)} style={styles.SlideIconOut}>
                    <Image source={item.icon} style={styles.SlideIcon}/>
                  </Pressable>}
              />
            </View>
          </View>
          <View style={styles.FormBody}>
            <TextInput placeholder="Username" style={styles.TextInput}/>
            <Pressable onPress={() => this.save_profile()}>
              <View style={styles.SubmitButton}>
                <Text style={styles.SubmitButtonText}>Save Profile</Text>
              </View>
            </Pressable>
          </View>
          <View style={{ flex : 1 }} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  ChooseCharacter: {
    alignItems: "center"
  },
  MainIconBox: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 126,
    height: 126,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 60
  },
  MainIcon: {
    width: 120,
    height: 120,
    borderRadius: 56
  },
  CharactersSelection: {
    height: 60
  },
  Slide: {
    borderWidth: 1,
    borderColor: "#ccc"
  },
  SlideIcon: {
    marginTop: 3,
    marginHorizontal: 3,
    width: 57,
    height: 57
  },
  Separator: {
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  },
  FormBody: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10
  },
  SubmitButton: {
    backgroundColor: colors.calltoaction,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5
  },
  SubmitButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#f2f2f2"
  }
})

export default Profile
