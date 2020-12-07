import React, { Component } from 'react'
import { Platform } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import { useEffect } from 'react'
import { fcmService } from 'Collaap/src/config/PushNotifications/FCMService'
import { localNotificationService } from 'Collaap/src/config/PushNotifications/LocalNotificationService'

export default function PushNotifications(){

    useEffect(() => {

        fcmService.registerAppWithFCM()
        fcmService.register(onRegister, onNotification, onOpenNotification)
        
        localNotificationService.configure(onOpenNotification)

        //Registration handled succesfully and received token
        async function onRegister(token){
            console.log("[App] onRegister - Register token by FCMService")
            await AsyncStorage.setItem('fcm_token', token)
        }

        //Method to run when the app is open
        function onNotification(notify){
            console.log("[App] onNotification - App is already open")

            const options = {
                soundName: 'default',
                playSound: true
            }

            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )

            //EDIT: Uncomment to show notification while app is open - This closes it automatically
            localNotificationService.cancelAllLocalNotifications()
        }

        //Method to happen when the notification opens the app
        function onOpenNotification(notify){
            console.log("[App] onOpenNotification - Notification launched the app")
            localNotificationService.cancelAllLocalNotifications()
            // alert("THIS IS OPEN")   
        }

        //Unregister tokens for both FCM and LNS
        return () => {
            console.log("[App] Unregister tokens from both FCMService & LNS")
            fcmService.unRegister()
            localNotificationService.unRegister()
        }

    }, [])

    return null

}