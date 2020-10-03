function index(state = {}, action){
  switch (action.type) {

    case "SET_CALENDAR": {
      return {...state, ...action.payload}
    }
    case "SET_MENU": {
      return {...state, ...action.payload}
    }

    default:
      return state

  }

  return state
}

export default index
