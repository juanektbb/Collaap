import React, { Component } from 'react'
import { Platform, StatusBar } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'Collaap/src/redux/store'

import SocketProvider, { SocketContext } from 'Collaap/src/auto/SocketContext.js'
import PushNotifications from 'Collaap/src/config/PushNotifications'

import {
  setCustomText,
  setCustomTextInput
} from 'react-native-global-props'
import FlashMessage from "react-native-flash-message"

import colors from 'Collaap/src/data/colors.js'

import Loading from 'Collaap/src/components/General/Loading'
import NavigationHall from 'Collaap/src/components/Base/NavigationHall'
import LoginController from 'Collaap/src/utils/LoginController'

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
    super(props)

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
    const loginController = new LoginController()
    await loginController.ObtainSessionToken()
  }

  render(){
    return(
      <Provider store={store}>
        <SocketProvider>
          <PersistGate
            loading={<Loading />}
            persistor={persistor}>
            <PushNotifications />
            <StatusBar backgroundColor={colors.jalpha} barStyle='light-content' />
            <NavigationHall />
            <FlashMessage 
              position="top" 
              duration={2800}
              animationDuration={400}
              titleStyle={{ textAlign: "center" }}
              textStyle={{ textAlign: "center" }}
              style={{ backgroundColor: colors.ibeta }} />
          </PersistGate>
        </SocketProvider>
      </Provider>
    )
  }

}

export default App
