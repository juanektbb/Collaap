import AsyncStorage from '@react-native-community/async-storage'

import settings from 'Collaap/src/settings.js'
import { store } from 'Collaap/src/redux/store'

class CalendarController{

  constructor(from_login = false){
    this.from_login = from_login
    this.user_persist = null

    if(!from_login){
      import('Collaap/src/shared/user_persist.js').then(({ user_persist }) => {
        this.user_persist = user_persist
      })
    }
  }

  /*
    BASIC CALENDAR FETCH
  */
  SimpleFetchCalendar = async (first_call = true) => {
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'GET',
        headers: headers
    }

    const response = await fetch(`${settings['API_URL']}/elements`, details)

    //Give the response if it comes from login
    if(this.from_login){
      return await response.json()
    }

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await this.user_persist(first_call, response['status'], this.SimpleFetchCalendar)

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return await response.json()
    }
  }

  /* 
    BUILD AND GENERATE THE CALENDAR FROM BACKEND
  */
  BuildCalendar = async () => {
    const data = await this.SimpleFetchCalendar()

    //SERVER ERROR OCCURRED, NULL THE SESSION
    if(data['error']){
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: 'Unable to retrieve your calendar',
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

export default CalendarController
