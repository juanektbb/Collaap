
import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'

import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import {
  setCustomText,
  setCustomTextInput
} from 'react-native-global-props';

import calendar from 'Collaap/src/data/calendar.js'
import colors from 'Collaap/src/data/colors.js'

import LoginController from 'Collaap/src/utils/LoginController'
import ElementsController from 'Collaap/src/utils/ElementsController'
import Navigation from 'Collaap/src/components/general/Navigation'

const customTextProps = {
  style: { fontFamily: 'HKGrotesk-Regular' }
}
const customTextInputProps = {
  style: { fontFamily: 'HKGrotesk-Regular' }
}

setCustomText(customTextProps)
setCustomTextInput(customTextInputProps)

class App extends Component<Props>{

  constructor(props){
    super(props)

    this.state = {
      calendar: null
    }

    this.loginController = new LoginController()
    this.elementsController = new ElementsController()
  }

  buildCalendar = async () => {
  }

  async componentDidMount(){

    store.dispatch({
      type: "SET_SESSION_TOKEN",
      payload: {
        icon_name: 'neuter_1',
        icon_image: require('Collaap/src/images/users/user-0.png')
      }
    })

    this.loginController.ObtainSessionToken()
    this.elementsController.RetrieveCalendar()





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

    this.loginController.LoginUser(username, icon_name, 'clicked')
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
