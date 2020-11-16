import React, { Component } from 'react'

import {
  Text,
  View,
  Image,
  Button,
  Platform,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import { useEffect } from 'react'
import { fcmService } from '../../FCMService'
import { localNotificationService } from '../../LocalNotificationService'


export default function Trigger(){

    useEffect(() => {
        fcmService.registerAppWithFCM()
        fcmService.register(onRegister, onNotification, onOpenNotification)
        localNotificationService.configure(onOpenNotification)

        function onRegister(token){
            console.log("trigger, on register: ", token)
        }

        function onNotification(notify){
            console.log("trigger, onNoifcaiton: ", notify)
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
        }

        function onOpenNotification(notify){
            console.log("[Trigger], onOpenNotficaiton: ", notify)
            alert("open notification:: ", notify.body)
        }

        return () => {
            console.log("trigger, unRegister")
            fcmService.unRegister()
            localNotificationService.unRegister()
        }

    }, [])

    return (
        <View>
            <Button 
                title="Trigger"
                onPress={() => localNotificationService.cancelAllLocalNotifications()}  
            />
        </View>
    )

}