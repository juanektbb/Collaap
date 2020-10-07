
import React, { Component } from 'react'

import auth from 'Collaap/src/handlers/auth.js'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'
import AsyncStorage from '@react-native-community/async-storage'

import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import calendar from 'Collaap/src/data/calendar.js'
import colors from 'Collaap/src/data/colors.js'
import characters from 'Collaap/src/data/characters.js'

import Navigation from 'Collaap/src/components/Navigation'

class App extends Component<Props>{

  constructor(props){
    super(props)
  }

  getIconByName = (name) => {
    for(let i = 0; i < characters.length; i++){
      if(characters[i].name == name)
        return characters[i].icon
    }
  }




  //TRIGGER WHEN THE USER SAVES HIS PROFILE
  onSaveProfile = async (username, icon_name) => {
    store.dispatch({
      type: "SET_SESSION_TOKEN",
      payload: {
        session_status: 'loading',
        session_error: null,
        session_token: null,
      }
    })

    this.LoginUser(username, icon_name, 'clicked')
  }



  //TRIGGER GATHERING A NEW SESSION TOKEN
  LoginUser = async (username, icon_name, way) => {
    const response = await auth(username, "123456", icon_name)

    await AsyncStorage.removeItem('session_token')
    await AsyncStorage.removeItem('username')

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
      let this_icon_image = this.getIconByName(user['icon'])

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

    }catch(error){
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















  componentDidMount(){
    store.dispatch({
      type: "SET_CALENDAR",
      payload: {
        calendar
      }
    })

    store.dispatch({
      type: "SET_SESSION_TOKEN",
      payload: {
        icon_name: 'neuter_1',
        icon_image: require('Collaap/src/images/users/user-0.png')
      }
    })

    this.ObtainSessionToken()
  }







  render(){
    return(
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={styles.IndicatorShape}>
              <ActivityIndicator size="large" color={colors.maintone}/>
              <Text style={styles.IndicatorText}>Collaap</Text>
            </View>}
          persistor={persistor}>

          <Navigation onSaveProfile={this.onSaveProfile}/>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  IndicatorShape: {
    flex: 1,
    justifyContent: "center"
  },
  IndicatorText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    color: colors.secondtone
  }
})

export default App
