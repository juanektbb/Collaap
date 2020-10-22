import AsyncStorage from '@react-native-community/async-storage'
import { store } from 'Collaap/src/redux/store'

import settings from 'Collaap/src/settings.js'

class ElementsController{

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

    // if(data['error']){
    if(true){ 

      console.log("arrived")

      store.dispatch({
        type: "SET_CALENDAR",
        payload: {
          calendar: null
        }
      })

      console.log("HHH")

      // store.dispatch({
      //   type: "SET_SESSION_TOKEN",
      //   payload: {
      //     session_status: 'error',
      //     session_error: "Unexpected error happened, try again.",
      //     session_token: null
      //   }
      // })

    }else{
      store.dispatch({
        type: "SET_CALENDAR",
        payload: {
          calendar: data
        }
      })

    }

    return data
  }

}

export default ElementsController
