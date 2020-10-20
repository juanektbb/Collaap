
import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'

import {
  setCustomText,
  setCustomTextInput
} from 'react-native-global-props'

import LoginController from 'Collaap/src/utils/LoginController'
import ElementsController from 'Collaap/src/utils/ElementsController'
import Navigation from 'Collaap/src/components/general/Navigation'
import Loading from 'Collaap/src/components/general/Loading'

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
    this.loginController = new LoginController()
    this.elementsController = new ElementsController()
  }

  componentDidMount(){
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

  //Trigger when the user saves their profile
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
          loading={<Loading />}
          persistor={persistor}>
          <Navigation onSaveProfile={this.onSaveProfile}/>
        </PersistGate>
      </Provider>
    )
  }

}

export default App
