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
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import characters from 'Collaap/src/data/characters.js'
import colors from 'Collaap/src/data/colors.js'

import { connect } from 'react-redux'

function mapStateToProps(state){
  return {
    first_name_redux: state.first_name,
    icon_name_redux: state.icon_name,
    icon_image_redux: state.icon_image,
    username_redux: state.username,
    session_status: state.session_status,
    session_error: state.session_error,
    session_token: state.session_token
  }
}

class Profile extends Component{

  constructor(props){
    super(props)
    this.state = {
      first_name: this.props.first_name_redux,
      username: this.props.username_redux,
      icon_name: this.props.icon_name_redux,
      icon_image: this.props.icon_image_redux
    }
  }

  choose_icon = (icon_name, icon_image) => {
    this.setState({
      icon_name: icon_name,
      icon_image: icon_image
    })
  }

  changeUsername = (username) => {
    this.setState({ username: username })
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.ResponseBox}>
            {this.props.session_status === 'loading' &&
              <ActivityIndicator size="small" color={colors.maintone}/>}

            {this.props.session_status === 'error' &&
              <View style={styles.ResponseInner}>
                <Text style={styles.ErrorText}>{this.props.session_error}</Text>
              </View>}

            {this.props.session_status === 'awaiting' &&
              <View style={styles.ResponseInner}>
                <Text style={styles.WelcomeText}>Welcome to Collaap</Text>
                <Text style={styles.InstructionsText}>Login only with your username</Text>
              </View>}

            {this.props.session_status === 'obtained' &&
              <View style={styles.ResponseInner}>
                <Text style={styles.WelcomeText}>Welcome back {this.state.first_name}</Text>
              </View>}

            {this.props.session_status === 'clicked' &&
              <View style={styles.ResponseInner}>
                <Text style={styles.SuccessText}>Hey {this.state.first_name}, your profile was updated!</Text>
              </View>}
          </View>

          <View style={styles.ChooseCharacter}>
            <View style={styles.MainIconBox}>
              <Image source={this.state.icon_image} style={styles.MainIcon}/>
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
                  <Pressable onPress={() => this.choose_icon(item.name, item.icon)} style={styles.SlideIconOut}>
                    <Image source={item.icon} style={styles.SlideIcon}/>
                  </Pressable>}
              />
            </View>
          </View>

          <View style={styles.FormBody}>
            <TextInput
              value={this.state.username}
              placeholder="Username"
              style={styles.TextInput}
              onChangeText={(username) => this.changeUsername(username)}
            />

            <Pressable onPress={() => this.props.onSaveProfile(this.state.username, this.state.icon_name)}>
              <View style={styles.SubmitButton}>
                <Text style={styles.SubmitButtonText}>
                  {this.props.session_status === 'awaiting' && "Login"}
                  {this.props.session_status === 'error' && "Login"}
                  {this.props.session_status === 'obtained' && "Update account"}
                  {this.props.session_status === 'clicked' && "Update account"}
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{ flex : 1 }}/>
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
  ResponseBox: {
    alignItems: "center",
    marginTop: 5,
  },
  ResponseInner: {
    width: 320,
    paddingVertical: 10
  },
  ErrorText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.calltoaction
  },
  WelcomeText: {
    textAlign: "center",
    fontSize: 22,
    color: colors.secondtone
  },
  InstructionsText: {
    textAlign: "center",
    fontSize: 12,
    color: colors.secondtone
  },
  SuccessText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.greenaccept
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

export default connect(mapStateToProps)(Profile)
