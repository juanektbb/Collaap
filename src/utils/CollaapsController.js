import AsyncStorage from '@react-native-community/async-storage'

import settings from 'Collaap/src/settings.js'
import { store } from 'Collaap/src/redux/store'

class CollaapsController{

  FecthCollaaps = async () => {

    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'GET',
        headers: headers
    }

    const response = await fetch(`${settings['API_URL']}/users/collaaps`, details)
    const data = await response.json()

    headers['x-access-token'] = "this"

    return data
  }

  LoadCollaaps = async () => {
    const response = await this.FecthCollaaps()

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

    }else{
      console.log("here")
      console.log(response['data'])
      store.dispatch({
        type: "SET_COLLAAPS",
        payload: {
          collaaps: response['data']
        }
      })
    }
  }

}

export default CollaapsController
