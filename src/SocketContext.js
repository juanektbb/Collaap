/*
    THIS IS A REACT CONTEXT OF WEBSOCKETS
    It is an instance of socket.io accesable in any level of the app.
    Tutorial: https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
 */

import React, { createContext } from 'react'
import io from 'socket.io-client'
import settings from 'Collaap/src/settings.js'
import { store } from 'Collaap/src/redux/store.js'

//Subscribe to store for retrieving session token
store.subscribe(listener)
let in_redux_session_token = null

function listener(){
  	in_redux_session_token = store.getState().session_token
}

//1st export - Context as it is
const SocketContext = createContext(null)
export { SocketContext }

//2nd export - Provider as default
export default ({ children }) => {
    let socket, context_load





    const callOtherDevices = (message) => {
        socket.emit("call_other_devices", "N/A")
    }




    //Socket is not defined, then create it
    if(!socket){

        //Connect and use jwt session token for permissions
        socket = io.connect(settings['SERVER_URL'], {
            query: `token=${in_redux_session_token}`
        })

        //Emit the room creation to server and listen on console for confirmation
        socket.emit("add_user_connected", in_redux_session_token)
        socket.on('registration_accepted', function(msg){
            console.log(Platform.OS + " -> " + msg)
        })

        //SOCKET LISTENERS:
        socket.on('to_single_device', function(msg){
            //TODO: dispatch the new calendar
            console.log(Platform.OS + " NEW calendar shoudl update here baby")
        })

        // ...


        //Load available for global usage
        context_load = {
            socket: socket,
            callOtherDevices
        }
    }

    return (
        <SocketContext.Provider value={context_load}>
            {children}
        </SocketContext.Provider>
    )
}