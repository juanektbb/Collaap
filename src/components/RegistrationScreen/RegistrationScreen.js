import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import { store } from 'Collaap/src/redux/store'
import colors from 'Collaap/src/data/colors.js'

import Dash from 'react-native-dash'
import Clipboard from '@react-native-community/clipboard'

import { showMessage, hideMessage } from "react-native-flash-message"

import LoginController from 'Collaap/src/utils/LoginController'
import RegistrationController from 'Collaap/src/utils/RegistrationController'

class Registration extends Component{

  state = {
    loading: false,
    registration_error: null,

    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    
    group_type: "",
    given_group_code: "",
    generated_group_code: "",

    registrationController: new RegistrationController()
  }

  //ON PRESS REGISTER BUTTON
  onRegisterUser = async () => {
    const { first_name, last_name, email, password, confirm_password, group_type, given_group_code, generated_group_code } = this.state

    if(group_type === ""){
      this.setState({registration_error: "Choose a group type", loading: false})
      return false
    }

    if(group_type === "existing" && given_group_code === ""){
      this.setState({registration_error: "Group's code field is required", loading: false})
      return false
    }

    if(first_name === ""){
      this.setState({registration_error: "First name field is required", loading: false})
      return false
    }

    if(last_name === ""){
      this.setState({registration_error: "Last name field is required", loading: false})
      return false
    }

    if(email === ""){
      this.setState({registration_error: "Email field is required", loading: false})
      return false
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(email.toLowerCase())){
      this.setState({registration_error: "Email format should be email@domain", loading: false})
      return false
    }       

    if(password === ""){
      this.setState({registration_error: "Password field is required", loading: false})
      return false
    }

    if(confirm_password === ""){
      this.setState({registration_error: "Confirm password field is required", loading: false})
      return false
    }

    if(password.length < 8){
      this.setState({registration_error: "Your password needs to be at least 8 characters long", loading: false})
      return false
    }

    if(password !== confirm_password){
      this.setState({registration_error: "Password does not match the confirmation", loading: false})
      return false
    }

    //NEW GROUP REQUIRES ITS CREATION
    if(group_type === "new"){
      const is_group_created = await this.createGroup({ 
        name: first_name + "'s group", 
        code: generated_group_code 
      })

      //Ready to create the account
      if(is_group_created){
        await this.createAccount({ group_code: generated_group_code, first_name, last_name, email, password })
      }

    //EXISTING GROUP WILL BE CHECK IN SERVER CREATION
    }else if(group_type === "existing"){
      await this.createAccount({ group_code: given_group_code, first_name, last_name, email, password })

    //SOMETHING WENT WRONG
    }else{
      this.setState({registration_error: "There was an error locating your group", loading: false})
      return false
    }
  }

  //CREATE A GROUP AND STATE IT
  createGroup = async (payload) => {
    const response = await this.state.registrationController.CreateGroup(payload)

    //Unable to create this group
    if(response['error']){
      this.setState({registration_error: response['msg'], loading: false})
      return false

    //Save the successful code in state
    }else{
      this.setState({generated_group_code: response["code"]})
      return true
    }
  }

  //READY TO REGISTER ACCOUNT
  createAccount = async (payload) => {
    const response = await this.state.registrationController.Register(payload)

    //Unable to create this account
    if(response['error']){
      this.setState({registration_error: response['msg'], loading: false})
      return false

    //Account created successfully, then log in
    }else{
      this.onLoginUser(this.state.email, this.state.password)
    }
  }

  //LOG THIS USER IN
  onLoginUser = async (username, password) => {
    store.dispatch({
      type: "SET_SESSION_TOKEN",
      payload: {
        session_status: 'loading',
        session_error: null,
        session_token: null,
      }
    })

    const loginController = new LoginController()
    const loginUser = await loginController.LoginUser(username, password)

    //Redirect the user to login
    if(!loginUser)
      this.props.navigation.navigate("LoginScreen", {})
  }

  //COPY TO CLIPBOARD
  onCopyCode = () => {
    Clipboard.setString(this.state.generated_group_code)

    showMessage({
      message: "Code copied to clipboard",
      description: "You will always have access to this code",
      type: "info"
    })
  }

  async componentDidMount(){
    const generated = await this.state.registrationController.GenerateCode()
    this.setState({ generated_group_code: generated['code'] })
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.FullBackground}>
        <View style={styles.Content}>
          <Text style={styles.MainText}>Your account</Text>

          {this.state.registration_error !== null &&
            <View style={styles.ResponseInner}>
              <Text style={styles.ErrorText}>{this.state.registration_error}</Text>
            </View>}

          <Text style={styles.DoYouHaveGroup}>Do you have a group?</Text>
          <View style={styles.ButtonBox}>
            <Pressable style={styles.ButtonGroup} onPress={() => this.setState({group_type: "new"})}>
              <Text>NEW</Text>
            </Pressable>

            <Pressable style={styles.ButtonGroup} onPress={() => this.setState({group_type: "existing"})}>
              <Text>EXISTING</Text>
            </Pressable>
          </View>

          {this.state.group_type === "existing" &&
            <View style={styles.GroupType}>
              <Text style={styles.GroupText}>Enter an existing group's code</Text>
              <TextInput
                value={this.state.given_group_code}
                placeholder="Group's code"
                style={[(Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid), { marginBottom: 0 }]}
                onChangeText={(given_group_code) => this.setState({ given_group_code, registration_error: null })}
              />
            </View>}

          {this.state.group_type === "new" &&
            <View style={styles.GroupType}>
              <Text style={styles.GroupText}>
                New freshly generated group code
              </Text>
              <Pressable style={styles.CodeGenerated} onPress={() => this.onCopyCode()}>
                <Text style={styles.TextGenerated}>
                  {this.state.generated_group_code}
                </Text>
              </Pressable>
            </View>}
        
          <Dash dashColor={colors.igamma} style={styles.DashLine}/>

          <View style={styles.DoubleLineInput}>
            <TextInput
              value={this.state.first_name}
              placeholder="First name"
              style={[(Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid), styles.SingleInput]}
              onChangeText={(first_name) => this.setState({ first_name, registration_error: null })}
            />

            <View style={styles.SpaceBetween}/>

            <TextInput
              value={this.state.last_name}
              placeholder="Last name"
              style={[(Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid), styles.SingleInput]}
              onChangeText={(last_name) => this.setState({ last_name, registration_error: null })}
            />
          </View>

          <TextInput
            value={this.state.email}
            placeholder="Email"
            style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
            onChangeText={(email) => this.setState({ email, registration_error: null })}
          />

          <TextInput
            value={this.state.password}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
            style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
            onChangeText={(password) => this.setState({ password, registration_error: null })}
          />

          <TextInput
            value={this.state.confirm_password}
            placeholder="Confirm password"
            secureTextEntry={true}
            textContentType="password"
            style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
            onChangeText={(confirm_password) => this.setState({ confirm_password, registration_error: null })}
          />

          {!this.state.loading &&  
            <TouchableOpacity onPress={() => {
                this.setState({registration_error: null, loading: true})
                this.onRegisterUser()
              }}>
              <View style={styles.SubmitButton}>
                  <Text style={styles.SubmitButtonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>}

          {this.state.loading &&  
            <ActivityIndicator size="large" color={colors.igamma}/>}    

        </View>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  FullBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.ialpha,
  },
  Content: {
    alignItems: "center",
  },
  MainText: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.igamma,
  },
  DoYouHaveGroup: {
    marginBottom: 10,
    color: colors.igamma,
  },
  ButtonBox: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  ButtonGroup: {
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: colors.igamma,
  },
  GroupType: {
    height: 67,
    marginTop: 25,
    justifyContent: "center"
  },
  GroupText: {
    marginBottom: 5,
    textAlign: "center",
    color: colors.igamma,
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
  DashLine: {
    height: 1,
    width: 300, 
    marginVertical: 25
  },
  ResponseInner: {
    width: 300,
    marginTop: -5,
    marginBottom: 10
  },
  ErrorText: {
    fontSize: 16,
    textAlign: "center",
    color: colors.danger
  },
  DoubleLineInput: {
    width: 300,
    flexDirection: "row",
  },
  TextInputIOS: {
    width: 300,
    height: 42,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.igamma,
  },
  TextInputAndroid: {
    width: 300,
    height: 42,
    fontSize: 15,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.igamma,
  },
  SpaceBetween: {
    width: 20
  },
  SingleInput: {
    flex: 1,
    width: "auto",
  },
  SubmitButton: {
    width: 300,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.calltoaction,
  },
  SubmitButtonText: {
    fontSize: 20,
    color: "#f2f2f2",
    textAlign: "center",
  }, 
  FlashMessage: {
    textAlign: "center",
    backgroundColor: colors.ibeta,
  }
})

export default Registration
