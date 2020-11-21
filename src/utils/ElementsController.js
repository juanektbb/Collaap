import AsyncStorage from '@react-native-community/async-storage'

import settings from 'Collaap/src/settings.js'
import { store } from 'Collaap/src/redux/store'

class ElementsController{

  //BASIC CALENDAR FETCH
  SimpleRetriveCalendar = async () => {
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'GET',
        headers: headers
    }

    const response = await fetch(`${settings['API_URL']}/elements`, details)
    const data = await response.json()

    return data

  }

  //BUILD AND GENERATE THE CALENDAR FROM BACKEND
  RetrieveCalendar = async () => {
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'GET',
        headers: headers
    }

    const response = await fetch(`${settings['API_URL']}/elements`, details)
    const data = await response.json()

    //SERVER ERROR OCCURRED, NULL THE SESSION
    if(data['error']){
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: data['error'],
          session_token: null
        }
      })

    //STORE CALENDAR IN REDUX
    }else{
      store.dispatch({
        type: "SET_CALENDAR",
        payload: {
          calendar: data
        }
      })
    }
  }

}

export default ElementsController
