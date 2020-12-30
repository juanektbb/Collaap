import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import { connect } from 'react-redux'
import { store } from 'Collaap/src/redux/store'

import colors from 'Collaap/src/data/colors.js'

import LoginController from 'Collaap/src/utils/LoginController'

function mapStateToProps(state){
  return {
    username_redux: state.username,
    session_status: state.session_status,
    session_error: state.session_error,
    session_token: state.session_token
  }
}

class Login extends Component{

  constructor(props){
    super(props)
    this.loginController = new LoginController()

    this.state = {
      username: this.props.username_redux ?  this.props.username_redux : "",
      password: ""
    }
  }

  onOpenRegistation = () => {
    this.props.navigation.navigate("RegistrationScreen", {})
  }

  //TRIGGER LOGGING BUTTON
  onLoginUser = async (username, password) => {
    if(username === "" || password === ""){
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: "Both fields are required",
          session_token: null,
        }
      })

      return false
    }

    store.dispatch({
      type: "SET_SESSION_TOKEN",
      payload: {
        session_status: 'loading',
        session_error: null,
        session_token: null,
      }
    })

    this.loginController.LoginUser(username, password)
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.FullBackground}>
        <View style={styles.Content}>
          <Text style={styles.MainText}>Welcome to Collaap</Text>

          <Image 
            style={styles.MainLogo}
            source={require('Collaap/src/images/logo.png')} />

          {this.props.session_status === 'loading' &&
            <View style={styles.ResponseInner}>
              <ActivityIndicator size="small" color={colors.igamma}/>
            </View>}

          {this.props.session_status === 'error' &&
            <View style={styles.ResponseInner}>
              <Text style={styles.ErrorText}>{this.props.session_error}</Text>
            </View>}

          <TextInput
            value={this.state.username}
            placeholder="Email address"
            onSubmitEditing={() => this.passwordInput.focus()}
            style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
            onChangeText={(username) => this.setState({ username })}
          />

          <TextInput
            value={this.state.password}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
            ref={(ref) => { this.passwordInput = ref }}
            style={Platform.OS == 'ios' ? styles.TextInputIOS : styles.TextInputAndroid}
            onChangeText={(password) => this.setState({ password })}
          />

          <TouchableOpacity onPress={() => this.onLoginUser(this.state.username, this.state.password)}>
            <View style={styles.SubmitButton}>
              <Text style={styles.SubmitButtonText}>Sign In</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onOpenRegistation()}>
            <Text style={styles.RegistrationLink}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  FullBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ialpha
  },
  Content: {
    alignItems: "center",
    justifyContent: "center"
  },
  MainText: {
    fontSize: 26,
    color: colors.igamma
  },
  MainLogo: {
    width: 60,
    marginBottom: 5,
    alignItems: "center",
    resizeMode: 'contain'
  },
  ResponseInner: {
    width: 300,
    marginTop: -5,
    marginBottom: 10
  },
  ErrorText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.danger
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
  SubmitButton: {
    width: 300,
    height: 42,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
    backgroundColor: colors.calltoaction
  },
  SubmitButtonText: {
    fontSize: 20,
    color: "#f2f2f2",
    textAlign: "center",
  },
  RegistrationLink: {
    fontSize: 16,
    lineHeight: 16,
    paddingVertical: 10,
    color: colors.igamma,
    textDecorationLine: 'underline',
  }, 
})

export default connect(mapStateToProps)(Login)
