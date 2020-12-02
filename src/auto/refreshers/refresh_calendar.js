const _ = require('lodash')
import CalendarController from 'Collaap/src/utils/CalendarController'
import { store } from 'Collaap/src/redux/store.js'

let unsubscribe = store.subscribe(listener)
let in_redux_calendar = []

function select(state){
  	return state.calendar
}

function listener(){
  	in_redux_calendar = select(store.getState())
}

// Dispatcher in store to load new calendar
const dispatcher = (new_calendar) => {
  	store.dispatch({
		type: "SET_CALENDAR",
		payload: {
			calendar: new_calendar
		}
  	})
}

// MAIN REFRESHER
const main_refresher = async () => {
    const calendarController = new CalendarController()
    const data = await calendarController.SimpleFetchCalendar()

	// Compare both json and check if they are different
    const are_calendar_equal = _.isEqual(data, in_redux_calendar)

	//Unsubscribe the store
	unsubscribe()

	// Load data in store with dispatch
    if(!are_calendar_equal){
      	dispatcher(data)
		return true
    }

	return false
}

// THIS IS THE SAME FUNCTION BUT AS A PROMISE TO HANDLE RefreshControl
const promise_calendar_refresher = () => {
	return new Promise(function(resolve){
		resolve(main_refresher())
	})
}

export { main_refresher as calendar_refresher, promise_calendar_refresher }
