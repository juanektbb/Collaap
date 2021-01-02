import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import { connect } from 'react-redux'
import { store } from 'Collaap/src/redux/store'
import * as Keychain from 'react-native-keychain'

import characters from 'Collaap/src/data/characters.js'
import colors from 'Collaap/src/data/colors.js'

import Clipboard from '@react-native-community/clipboard'
import { showMessage } from "react-native-flash-message"

import { log_me_out } from 'Collaap/src/shared/log_me_out.js'

import AccountController from 'Collaap/src/utils/AccountController'
import LoginController from 'Collaap/src/utils/LoginController'

function mapStateToProps(state){
  return {
    group_name_redux: state.group_name,
    group_code_redux: state.group_code,
    first_name_redux: state.first_name,
    last_name_redux: state.last_name,
    email_redux: state.email,
    username_redux: state.username,
    icon_name_redux: state.icon_name,
    icon_image_redux: state.icon_image,
  }
}

class Profile extends Component{
  
  constructor(props){
    super(props)

    this.state = {
      screen_status: null,
      update_error: null,
      group_name: this.props.group_name_redux,
      group_code: this.props.group_code_redux,
      first_name: this.props.first_name_redux,
      last_name: this.props.last_name_redux,
      email: this.props.email_redux,
      icon_name: this.props.icon_name_redux,
      icon_image: this.props.icon_image_redux
    }
  }

  //COPY TO CLIPBOARD
  onCopyCode = () => {
    Clipboard.setString(this.state.generated_group_code)

    showMessage({
      message: "Code copied to clipboard",
      description: "Share it with someone for them to join your group",
      type: "info"
    })
  }

  //SAVE PROFILE BUTTON IS PRESSED
  onSaveProfile = () => {
    const { first_name, last_name, email, group_name, icon_name } = this.state

    if(group_name === ""){
      this.setState({update_error: "The group's name is a required field", screen_status: "error"})
      return false
    }

    if(first_name === ""){
      this.setState({update_error: "First name field can't be empty", screen_status: "error"})
      return false
    }

    if(last_name === ""){
      this.setState({update_error: "Last name field can't be empty", screen_status: "error"})
      return false
    }

    if(email === ""){
      this.setState({update_error: "Email field can't be empty", screen_status: "error"})
      return false
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(email.toLowerCase())){
      this.setState({update_error: "Email format should be email@domain", screen_status: "error"})
      return false
    }  

    //All checks are good, the account can be updated
    return this.updateAccount({ first_name, last_name, email, group_name, icon_name })
  }

  //UPDATE THIS ACCOUNT
  updateAccount = async (payload) => {
    const accountController = new AccountController()
    const response = await accountController.UpdateAccount(payload)

    //Unable to update this account
    if(response['error']){
      this.setState({update_error: response['msg'], screen_status: "error"})
      return false

    //Account update successfully, then log in
    }else{
      const credentials = await Keychain.getGenericPassword({storage: Keychain.STORAGE_TYPE.AES})

      const loginController = new LoginController()
      await loginController.LoginUser(this.state.email, credentials.password)

      this.setState({screen_status: "success"})
      return true
    }
  }

  //CONTENT OF THE HEADER
  contentToShow(){
    switch(this.state.screen_status){
      case null:
        return (<View style={styles.ResponseInner}>
          <Text style={styles.WelcomeText}>Hey, {this.props.first_name_redux}</Text>
          <Text style={styles.InstructionsText}>You are logged in as {this.props.username_redux}</Text>
        </View>)
      break;
      case 'error':
        return (<View style={styles.ResponseInner}>
          <Text style={styles.ErrorText}>{this.state.update_error}</Text>
        </View>)
      break;
      case 'loading': 
        return (<ActivityIndicator size="small" color={colors.ialpha} style={styles.Loader} />)
      break;
      case 'success': 
        return (<View style={styles.ResponseInner}>
          <Text style={styles.SuccessText}>
             Your profile was updated successfully!
          </Text>
        </View>)
      break;
    }
  }

  render(){
    return(
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1}}>
          <View style={styles.Container}>
            <View style={styles.ResponseBox}>
              {this.contentToShow()}
            </View>

            <View style={styles.ChooseCharacter}>
              <View style={styles.MainIconBox}>
                <Image source={this.state.icon_image} style={styles.MainIcon} />
              </View>

              <View style={styles.CharactersSelection}>
                {characters.map((item, index) =>     
                  <Pressable onPress={() => this.setState({icon_name: item.name, icon_image: item.icon})} style={styles.SlideIconOut} key={index}>
                    <Image source={item.icon} style={styles.SlideIcon} />
                  </Pressable>
                )}
              </View>
            </View>

            <View style={styles.FormBody}>
              <Text style={styles.Label}>Group's name</Text>
              <TextInput
                value={this.state.group_name}
                placeholder="Doe's family"
                style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
                onChangeText={(group_name) => this.setState({ group_name, screen_status: null })}
              />

              <View style={styles.DoubleLineInput}>
                <View style={styles.IndivLine}>
                  <Text style={styles.Label}>First name</Text>
                  <TextInput
                    value={this.state.first_name}
                    placeholder="John"
                    style={[(Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid), styles.SingleInput]}
                    onChangeText={(first_name) => this.setState({ first_name, screen_status: null })}
                  />
                </View>

                <View style={styles.SpaceBetween}/>

                <View style={styles.IndivLine}>
                  <Text style={styles.Label}>Last name</Text>
                  <TextInput
                    value={this.state.last_name}
                    placeholder="Doe"
                    style={[(Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid), styles.SingleInput]}
                    onChangeText={(last_name) => this.setState({ last_name, screen_status: null })}
                  />
                </View>
              </View>

              <Text style={styles.Label}>Email</Text>
              <TextInput
                value={this.state.email}
                placeholder="john.doe@mail.com"
                style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
                onChangeText={(email) => this.setState({ email, screen_status: null })}
              />

              {this.state.screen_status !== 'loading' &&
                <Pressable onPress={() => {
                  this.setState({screen_status: "loading"})
                  this.onSaveProfile()
                }}>
                  <View style={styles.SubmitButton}>
                    <Text style={styles.SubmitButtonText}>Save changes</Text>
                  </View>
                </Pressable>}

              <View style={styles.GroupType}>
                <Text style={styles.GroupText}>
                  Share your group's code for other to join
                </Text>
                <Pressable style={styles.CodeGenerated} onPress={() => this.onCopyCode()}>
                  <Text style={styles.TextGenerated}>
                    {this.state.group_code}
                  </Text>
                </Pressable>
              </View>

              <Pressable style={styles.LogOutButton} onPress={() => log_me_out()}>
                <Text style={styles.LogOutButtonText}>Sign out</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  WelcomeText: {
    textAlign: "center",
    fontSize: 22,
    color: colors.ialpha
  },
  InstructionsText: {
    textAlign: "center",
    fontSize: 12,
    color: colors.ialpha
  },
  SuccessText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.success
  },
  ErrorText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.danger
  },
  Loader: {
    paddingVertical: 10
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
    borderColor: colors.softgrey,
    borderRadius: 60
  },
  MainIcon: {
    width: 120,
    height: 120,
    borderRadius: 56
  },
  CharactersSelection: {
    width: 317,
    height: 124,
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    borderColor: "#ddd"
  },
  SlideIcon: {
    marginTop: 3,
    marginHorizontal: 3,
    width: 57,
    height: 57
  },
  FormBody: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
  },
  Label: {
    padding: 0,
    width: 317,
    textAlign: "left",
    color: colors.softgrey
  },
  DoubleLineInput: {
    width: 317,
    flexDirection: "row"
  },
  IndivLine: {
    flex: 1,
    width: "auto",
  },
  TextInputIOS: {
    width: 317,
    height: 42,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  TextInputAndroid: {
    width: 317,
    height: 42,
    fontSize: 15,
    borderWidth: 1,
    lineHeight: 18,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 6,
    borderColor: "#ddd",
    paddingHorizontal: 10,
  },
  SingleInput: {
    width: "auto",
  },
  SpaceBetween: {
    width: 20
  },
  SubmitButton: {
    width: 317,
    backgroundColor: colors.calltoaction,
    padding: 10,
    marginTop: 8,
    marginHorizontal: 10,
    borderRadius: 5
  },
  SubmitButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#f2f2f2"
  },
  GroupType: {
    height: 67,
    marginTop: 40,
    marginBottom: 15,
    justifyContent: "center"
  },
  GroupText: {
    marginBottom: 5,
    textAlign: "center",
    color: colors.softgrey
  },
  CodeGenerated: {
    height: 43,
    width: 260,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "dashed",
    justifyContent: "center",
    borderColor: colors.calltoaction,
  },
  TextGenerated: {
    fontSize: 20,
    textAlign: "center",
    color: colors.calltoaction,
  },
  LogOutButton: {
    width: 90,
    marginTop: 20,
    paddingVertical: 8
  },
  LogOutButtonText: {
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
    color: colors.calltoaction
  }
})

export default connect(mapStateToProps)(Profile)
