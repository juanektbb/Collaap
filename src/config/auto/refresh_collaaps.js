const _ = require('lodash')
import CollaapsController from 'Collaap/src/utils/CollaapsController'
import { store } from 'Collaap/src/redux/store.js'

store.subscribe(listener)
let in_redux_collaaps = []

function select(state){
  	return state.collaaps
}

function listener(){
  	in_redux_collaaps = select(store.getState())
}

// Dispatcher in store to load new collaaps
const dispatcher = (new_collaaps) => {
  	store.dispatch({
        type: "SET_COLLAAPS",
        payload: {
            collaaps: new_collaaps
        }
  	})
}

// MAIN REFRESHER
const refresher = async () => {
    const collaapsController = new CollaapsController()
    const data = await collaapsController.FecthCollaaps()

	// Compare both json and check if they are different
    const are_calendar_equal = _.isEqual(data['data'], in_redux_collaaps)

	// Load data in store with dispatch
    if(!are_calendar_equal){
      	dispatcher(data['data'])
        return true
    }

    return false
}

export { refresher as collaaps_refresher }
