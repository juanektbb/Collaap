/*
    THIS IS A REACT CONTEXT OF WEBSOCKETS
    It is an instance of socket.io accesable in any level of the app.
    Tutorial: https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
 */

import React, { createContext, useState, useEffect } from 'react'
import { Platform } from 'react-native'

import io from 'socket.io-client'
import settings from 'Collaap/src/settings.js'
import { store } from 'Collaap/src/redux/store.js'

//1st export - Context as it is
const SocketContext = createContext(null)
export { SocketContext }

//2nd export - Provider as default
export default ({ children }) => {

    const [session_token, setSession_token] = useState(null)
    let socket, context_load
 
    //SUBSCRIBE TO REDUX-STORE FOR GATHERING SESSION TOKEN
    useEffect(() => {
        function listener(){
            let in_redux_session_token = store.getState().session_token
            setSession_token(in_redux_session_token) 
        }

        //Subscribe to store
        const unsubscribe = store.subscribe(listener)

        //Clean by unsubscribing the listener
        return (() => unsubscribe())
    }, [])

    //SOCKET EMITTERS:
    const emitReloadMyCalendar = () => {
        socket.emit("auto_reload_my_calendar", null)
    }

    const emitReloadOneCalendarById = (user_id) => {
        socket.emit("auto_reload_one_calendar_by_id", user_id)
    }

    const emitReloadCollaapsCalendars = (arr_collaaps_and_me) => {
        socket.emit("auto_reload_collaaps_calendars", arr_collaaps_and_me)
    }

    //...
    
    //Verbose: Socket is not defined, then create it
    if(!socket){
        //Verbose: Token must be something valid
        if(session_token !== null && session_token !== undefined){

            //Connect and use jwt session token for permissions
            socket = io.connect(settings['SERVER_URL'], {
                query: `token=${session_token}`
            })

            //Emit the room creation to server and listen on console for confirmation
            socket.emit("add_user_connected", session_token)
            socket.on('registration_accepted', function(msg){
                console.log(Platform.OS + " -> " + msg)
            })

            //SOCKET LISTENERS:
            socket.on('to_single_device', function(msg){
                //TODO: dispatch the new calendar
                alert(Platform.OS + " NEW calendar should update here baby")
            })
            
            //LISTENER: New calendar arrived and needs to be dispatched
            socket.on('reload_my_calendar', function(new_calendar){
                store.dispatch({
                type: "SET_CALENDAR",
                    payload: {
                        calendar: new_calendar
                    }
                })
            })

            // ...

            //Load available for global usage
            context_load = {
                socket: socket,
                emitReloadMyCalendar,
                emitReloadOneCalendarById,
                emitReloadCollaapsCalendars
            }
        }
    }

    return (
        <SocketContext.Provider value={context_load}>
            {children}
        </SocketContext.Provider>
    )
}