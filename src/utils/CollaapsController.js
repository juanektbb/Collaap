import AsyncStorage from '@react-native-community/async-storage'

import settings from 'Collaap/src/settings.js'
import { store } from 'Collaap/src/redux/store'

class CollaapsController{

  //GET ALL COLLAAPS FROM DB
  FecthCollaaps = async () => {
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'GET',
        headers: headers
    }

    console.log("There is a call")

    const response = await fetch(`${settings['API_URL']}/users/collaaps`, details)
    return await response.json()
  }

  //LOAD COLLAAPS IN REDUX
  LoadCollaaps = async () => {
    const data = await this.FecthCollaaps()

    //SERVER ERROR OCCURRED, NULL THE SESSION
    if(data['error']){
      store.dispatch({
        type: "SET_SESSION_TOKEN",
        payload: {
          session_status: 'error',
          session_error: data['msg'],
          session_token: null
        }
      })

    //STORE COLLAAPS IN REDUX
    }else{
      store.dispatch({
        type: "SET_COLLAAPS",
        payload: {
          collaaps: data['data']
        }
      })
    }
  }

}

export default CollaapsController
