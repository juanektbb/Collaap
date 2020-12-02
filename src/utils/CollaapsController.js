import AsyncStorage from '@react-native-community/async-storage'
import user_persist from 'Collaap/src/shared/user_persist.js'

import settings from 'Collaap/src/settings.js'
import { store } from 'Collaap/src/redux/store'

class CollaapsController{

  /*
    BASIC COLLAAPS FETCH
  */
  SimpleFecthCollaaps = async (first_call = true) => {
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'GET',
        headers: headers
    }

    const response = await fetch(`${settings['API_URL']}/users/collaaps`, details)

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.SimpleFecthCollaaps)

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return await response.json()
    }
  }

  /* 
    BUILD AND GENERATE THE COLLAAPS FROM BACKEND
  */
  BuildCollaaps = async () => {
    const data = await this.SimpleFecthCollaaps()

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
