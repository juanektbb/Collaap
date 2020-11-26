import { store } from 'Collaap/src/redux/store.js'
const unsubscribe = store.subscribe(listener_builder)

const details = {}

function listener_builder(){
    const state = store.getState()

    details['user_id'] = state.user_id
    details['session_token'] = state.session_token
    details['first_name'] = state.first_name
    details['icon_name'] = state.icon_name
    details['icon_image'] = state.icon_image
}

const user_details = () => details

export default user_details
export { unsubscribe }