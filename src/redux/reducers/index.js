function index(state = {}, action){
  switch (action.type) {

    case "SET_CALENDAR": {
      return {...state, ...action.payload}
    }
    case "SET_MENU": {
      return {...state, ...action.payload}
    }
    case "SET_SESSION_TOKEN": {
      return {...state, ...action.payload}
    }
    case "SET_USER": {
      return {...state, ...action.payload}
    }
    case "SET_COLLAAPS": {
      return {...state, ...action.payload}
    }
    default:
      return state

  }
}

export default index
