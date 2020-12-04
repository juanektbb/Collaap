
import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'

import SocketProvider, { SocketContext } from 'Collaap/src/auto/SocketContext.js'

import {
  setCustomText,
  setCustomTextInput
} from 'react-native-global-props'

import { Platform } from 'react-native'

import Loading from 'Collaap/src/components/General/Loading'
import Navigation from 'Collaap/src/components/Base/Navigation'
import LoginController from 'Collaap/src/utils/LoginController'

import PushNotifications from 'Collaap/src/config/PushNotifications'

const customTextProps = {
  style: { fontFamily: 'HKGrotesk-Regular' }
}
const customTextInputProps = {
  style: { fontFamily: 'HKGrotesk-Regular' }
}

setCustomText(customTextProps)
setCustomTextInput(customTextInputProps)


class App extends Component{

  constructor(props){
    console.log("APP STARTED")

    super(props)
    this.loginController = new LoginController()

    store.dispatch({
      type: "SET_CALENDAR",
      payload: {
        calendar: []
      }
    })

    //LOGIN IS LOADING
    store.dispatch({
      type: "SET_SESSION_TOKEN",
      payload: {
        session_status: 'loading',
        session_error: null,
        session_token: null,
      }
    })
  }

  async componentDidMount(){
    console.log("APP MOUNTED")

    store.dispatch({
      type: "SET_SESSION_TOKEN",
      payload: {
        icon_name: 'neuter_1',
        icon_image: require('Collaap/src/images/users/user-0.png')
      }
    })

    this.loginController.ObtainSessionToken()
  }

  componentDidUpdate(){
    console.log("APP UPDATED")
  }

  //TRIGGER BUTTON SAVING PROFILE
  onSaveProfile = async (username, icon_name) => {
    store.dispatch({
      type: "SET_SESSION_TOKEN",
      payload: {
        session_status: 'loading',
        session_error: null,
        session_token: null,
      }
    })

    this.loginController.LoginUser(username, "123456", icon_name, 'clicked')
  }

  render(){
    return(
      <Provider store={store}>
        <SocketProvider>
          <PersistGate
            loading={<Loading />}
            persistor={persistor}>
            <PushNotifications />
            <Navigation onSaveProfile={this.onSaveProfile}/>
          </PersistGate>
        </SocketProvider>
      </Provider>
    )
  }

}

export default App
