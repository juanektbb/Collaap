import AsyncStorage from '@react-native-community/async-storage'
import * as Keychain from 'react-native-keychain'
import { store } from 'Collaap/src/redux/store'

import settings from 'Collaap/src/settings.js'
import helpers from 'Collaap/src/shared/helpers.js'

import CollaapsController from './CollaapsController'
import CalendarController from './CalendarController'
import FCMController from 'Collaap/src/utils/FCMController.js'

class LoginController{

  /*
    COMMUNICATION WITH THE SERVER
  */
  Auth = async (username, password) => {
    const content_body = {
      "username": username,
      "password": password
    }

    const details = {
        method: 'POST',
        headers: settings['REQUEST_HEADERS'],
        body: JSON.stringify(content_body)
    }

    const response = await fetch(`${settings['API_URL']}/users/login`, details)
    return response.json()
  }

  /* 
    TRIGGER GATHERING A NEW SESSION TOKEN
  */
  LoginUser = async (username, password) => {
    
    //Clearing the session token and make a new server request
    await AsyncStorage.removeItem('session_token')
    const response = await this.Auth(username, password)

    //Server gave an error, like wrong username or password
    if(response['error']){
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: response['msg'],
          session_token: null
        }
      })

      await Keychain.resetGenericPassword()
      return false

    //Server provided a token
    }else{
      return this.PersistSessionToken(response['token'], password, response['user'])
    }
  }

  /* 
    SAVE FINAL SESSION TOKEN IN REDUX STORE
  */
  PersistSessionToken = async (session_token, password, user) => {
    try{
      await AsyncStorage.setItem('session_token', session_token)
      await Keychain.setGenericPassword(user['username'], password, {storage: Keychain.STORAGE_TYPE.AES })

      let this_icon_image = helpers.getIconByName(user['icon'])

      //Save session details
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'collaap',
          session_error: null,
          session_token: session_token
        }
      })

      //Save user details
      store.dispatch({
        type: "SET_USER",
        payload: {
          user_id: user['id'],
          username: user['username'],
          first_name: user['first_name'],
          last_name: user['last_name'],
          email: user['email'],
          group_name: user['group_name'],
          group_code: user['group_code'],
          icon_name: user['icon'],
          icon_image: this_icon_image
        }
      })

      this.Loaders(session_token)
      return true

    //An strange error happened
    }catch(error){
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: "Unexpected error happened, login again please",
          session_token: null
        }
      })

      return false
    }
  }

  /* 
    WHEN THE APP LOADS, FIND THE STORED SESSION TOKEN OR CREATE IT
  */
  ObtainSessionToken = async () => {
    try{
      const credentials = await Keychain.getGenericPassword({storage: Keychain.STORAGE_TYPE.AES})

      if(credentials){
        return this.LoginUser(credentials.username, credentials.password)

      }else{
        store.dispatch({
          type: "SET_SESSION_TOKEN",
          payload: {
            session_status: null,
            session_error: null,
            session_token: null
          }
        })
      }

      return false

    }catch(error){
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: "Unable to log you in automatically",
          session_token: null
        }
      })

      return false
    }
  }

  //LOAD MORE DATA FROM SERVER
  Loaders = async (session_token) => {
    const collaapsController = new CollaapsController(from_login = true)
    await collaapsController.BuildCollaaps()

    const calendarController = new CalendarController()
    await calendarController.BuildCalendar()

    const token = await AsyncStorage.getItem('fcm_token')
    const fcmController = new FCMController()
    await fcmController.PushToken(token)
  }

}

export default LoginController
