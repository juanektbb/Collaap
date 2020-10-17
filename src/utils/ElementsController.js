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

    // console.log("happens 222")
    // console.log(data)

    if(data['error']){
      console.log("toshaaaaa")
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
