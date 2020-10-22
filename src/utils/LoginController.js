import AsyncStorage from '@react-native-community/async-storage'
import { store } from 'Collaap/src/redux/store'

import helpers from 'Collaap/src/helpers.js'
import settings from 'Collaap/src/settings.js'

import CollaapsController from './CollaapsController'
import ElementsController from './ElementsController'

class LoginController{

  //COMMUNICATION WITH THE SERVER
  Auth = async (username, password, icon_name) => {
    const content_body = {
      "username": username,
      "password": password,
      "icon": icon_name
    }

    const details = {
        method: 'POST',
        headers: settings['REQUEST_HEADERS'],
        body: JSON.stringify(content_body)
    }

    const response = await fetch(`${settings['API_URL']}/users/login`, details)
    return await response.json()
  }

  //TRIGGER GATHERING A NEW SESSION TOKEN
  LoginUser = async (username, icon_name, way) => {
    await AsyncStorage.removeItem('session_token')
    await AsyncStorage.removeItem('username')

    const response = await this.Auth(username, "123456", icon_name)

    //Server gave an error
    if(response['error']){
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: response['msg'],
          session_token: null
        }
      })

    //Server provided a token
    }else{
      await AsyncStorage.setItem('username', username)
      await AsyncStorage.setItem('icon_name', icon_name)
      this.PersistSessionToken(response['token'], response['user'], way)
    }
  }

  //SAVE FINAL SESSION TOKEN IN REDUX STORE
  PersistSessionToken = async (session_token, user, way) => {
    try{
      await AsyncStorage.setItem('session_token', session_token)
      let this_icon_image = helpers.getIconByName(user['icon'])

      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          username: user['username'],
          session_status: way, // This is success data as [obtained, clicked] -> To show msg to the user
          session_error: null,
          session_token: session_token
        }
      })

      store.dispatch({
        type: "SET_USER",
        payload: {
          first_name: user['first_name'],
          icon_name: user['icon'],
          icon_image: this_icon_image
        }
      })

      this.Loaders(session_token)

    }catch(error){
      console.log("WORLD")
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: "Unexpected error happened, try again.",
          session_token: null
        }
      })
    }
  }

  //WHEN THE APP LOADS, FIND THE STORED SESSION TOKEN OR CREATE IT
  ObtainSessionToken = async () => {
    const username = await AsyncStorage.getItem('username')
    const icon_name = await AsyncStorage.getItem('icon_name')

    if(username !== null){
      this.LoginUser(username, icon_name, 'obtained')

    //Username does not exists either, set app to neuter
    }else{
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          username: "",
          session_status: 'awaiting',
          session_error: null,
          session_token: null
        }
      })
    }
  }

  //LOAD MORE DATA FROM SERVER
  Loaders = async (session_token) => {
    const collaapsController = new CollaapsController()
    await collaapsController.LoadCollaaps()

    const elementsController = new ElementsController()
    await elementsController.RetrieveCalendar()
  }

}

export default LoginController
