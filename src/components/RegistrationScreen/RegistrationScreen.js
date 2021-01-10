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
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import { store } from 'Collaap/src/redux/store'
import colors from 'Collaap/src/data/colors.js'

import Dash from 'react-native-dash'
import Clipboard from '@react-native-community/clipboard'

import { showMessage } from "react-native-flash-message"

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
      <ScrollView style={styles.FullBackground}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'position' : null}
          automaticallyAdjustContentInsets={false}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <View style={styles.Content}>
            <Text style={styles.MainText}>Create your account</Text>

            {this.state.registration_error !== null &&
              <View style={styles.ResponseInner}>
                <Text style={styles.ErrorText}>{this.state.registration_error}</Text>
              </View>}

            <View style={styles.ButtonsArea}>
              <View style={styles.SingleButton}>   
                <Text style={styles.ButtonLabel}>Create a group&hellip;</Text>       
                <Pressable 
                  onPress={() => this.setState({group_type: "new"})}
                  style={[styles.ButtonGroup, (this.state.group_type === "new" && styles.Selected)]}>
                  <Image source={require("Collaap/src/images/group_new.png")} style={styles.GroupIcon}/>
                </Pressable>
              </View>

              <View style={styles.SingleButton}>
                <Text style={styles.ButtonLabel}>Join a group&hellip;</Text>     
                <Pressable 
                  onPress={() => this.setState({group_type: "existing"})}
                  style={[styles.ButtonGroup, (this.state.group_type === "existing" && styles.Selected)]}>
                  <Image source={require("Collaap/src/images/group_existing.png")} style={styles.GroupIcon}/>
                </Pressable>
              </View>
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
          
            <Dash dashGap={6} dashColor={colors.softestgrey} style={styles.DashLine}/>

            <View style={styles.DoubleLineInput}>
              <View style={styles.IndivLine}>
                <Text style={styles.Label}>First name</Text>
                <TextInput
                  value={this.state.first_name}
                  placeholder="John"
                  style={[(Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid), styles.SingleInput]}
                  onChangeText={(first_name) => this.setState({ first_name, registration_error: null })}
                />
              </View>

              <View style={styles.SpaceBetween}/>

              <View style={styles.IndivLine}>
                <Text style={styles.Label}>Last name</Text>
                <TextInput
                  value={this.state.last_name}
                  placeholder="Doe"
                  style={[(Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid), styles.SingleInput]}
                  onChangeText={(last_name) => this.setState({ last_name, registration_error: null })}
                />
              </View>
            </View>

            <Text style={styles.Label}>Email</Text>
            <TextInput
              value={this.state.email}
              placeholder="john.doe@mail.com"
              style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
              onChangeText={(email) => this.setState({ email, registration_error: null })}
            />

            <Text style={styles.Label}>Password</Text>
            <TextInput
              value={this.state.password}
              placeholder="Password"
              secureTextEntry={true}
              textContentType="password"
              style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
              onChangeText={(password) => this.setState({ password, registration_error: null })}
            />

            <Text style={styles.Label}>Confirm password</Text>
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
              <ActivityIndicator size="large" color={colors.softestgrey}/>}    

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  FullBackground: {
    backgroundColor: colors.ialpha,
  },
  Content: {
    alignItems: "center",
  },
  MainText: {
    fontSize: 21,
    marginBottom: 10,
    color: colors.softestgrey,
  },
  ButtonsArea: {
    width: 300,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  SingleButton: {
    flexDirection: "column",
  },
  ButtonLabel: {
    fontSize: 11,
    marginBottom: 1,
    textAlign: "center",
    color: colors.softestgrey,
  },
  ButtonGroup: {
    width: 90,
    height: 90,
    borderRadius: 7,
    backgroundColor: colors.softestgrey,
    justifyContent: "center",
    alignItems: "center"
  },
  Selected: {
    borderWidth: 3,
    borderColor: colors.calltoaction
  },
  GroupIcon: {
    width: 74,
    height: 74
  },
  GroupType: {
    height: 67,
    marginTop: 25,
    justifyContent: "center"
  },
  GroupText: {
    marginBottom: 5,
    textAlign: "center",
    color: colors.softestgrey,
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
    color: colors.danger,
  },
  DoubleLineInput: {
    width: 300,
    flexDirection: "row",
  },
  IndivLine: {
    flex: 1,
    width: "auto",
  },
  Label: {
    padding: 0,
    width: 300,
    marginBottom: 2,
    textAlign: "left",
    color: colors.softestgrey
  },
  TextInputIOS: {
    width: 300,
    height: 42,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.softestgrey,
  },
  TextInputAndroid: {
    width: 300,
    height: 42,
    fontSize: 15,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.softestgrey,
  },
  SpaceBetween: {
    width: 20
  },
  SingleInput: {
    width: "auto",
  },
  SubmitButton: {
    width: 300,
    padding: 10,
    borderRadius: 5,
    marginTop: 18,
    backgroundColor: colors.calltoaction,
    marginBottom: Platform.OS == 'ios' ? 0 : 20,
  },
  SubmitButtonText: {
    fontSize: 20,
    color: colors.softestgrey,
    textAlign: "center",
  }, 
  FlashMessage: {
    textAlign: "center",
    backgroundColor: colors.ibeta,
  }
})

export default Registration