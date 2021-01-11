import { store } from 'Collaap/src/redux/store'
import * as Keychain from 'react-native-keychain'

const log_me_out = async () => {

  store.dispatch({
    type: "SET_CALENDAR",
    payload: null
  })

  store.dispatch({
    type: "SET_USER",
    payload: null
  })

  store.dispatch({
    type: "SET_COLLAAPS",
    payload: null
  })

  store.dispatch({
    type: "SET_SESSION_TOKEN",
    payload: {
      session_status: null,
      session_error: null,
      session_token: null
    }
  })

  await Keychain.resetGenericPassword()
}

export { log_me_out }