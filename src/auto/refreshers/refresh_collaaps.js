const _ = require('lodash')
import CollaapsController from 'Collaap/src/utils/CollaapsController'
import { store } from 'Collaap/src/redux/store.js'

let unsubscribe = store.subscribe(listener)
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
const main_refresher = async () => {
    const collaapsController = new CollaapsController()
    const data = await collaapsController.SimpleFecthCollaaps()

	// Compare both json and check if they are different
    const are_collaaps_equal = _.isEqual(data['data'], in_redux_collaaps)

	//Unsubscribe the store
	unsubscribe()

	// Load data in store with dispatch
    if(!are_collaaps_equal){
      	dispatcher(data['data'])
        return true
    }

    return false
}

// THIS IS THE SAME FUNCTION BUT AS A PROMISE TO HANDLE RefreshControl
const promise_collaaps_refresher = () => {
	return new Promise(function(resolve){
        resolve(main_refresher())
	})
}

export { main_refresher as collaaps_refresher, promise_collaaps_refresher }
