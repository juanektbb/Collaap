import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'

class FCMService {

    //
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    //
    registerAppWithFCM = async () => {
        if(Platform.OS === 'ios'){
            await messaging().registerDeviceForRemoteMessages()
            await messaging().setAutoInitEnabled(true)
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
        .then(enabled => {
            if(enabled){
                // User hs permissions
                this.getToken(onRegister)
            }else{
                this.requestPermission(onRegister)
            }
        }).catch(error => {
            console.log("[FCMService] Permission rejected ", error)
        })
    }


    getToken = (onRegister) => {
        messaging().getToken()
        .then(fcmToken => {
            if(fcmToken){
                onRegister(fcmToken)
            }else{
                console.error("[FCMService] This user does not have a device token")
            }
        }).catch(error => {
            console.error("[FCMService] getToken() rejected: ", error)
        })
    }

    
    requestPermission = (onRegister) => {
        messaging().requestPermission()
        .then(() => {
            this.getToken(onRegister)
        }).catch(error => {
            console.error("[FCMService] requestPermission() rejected: ", error)
        })
    }

    // Handle delete this token
    deleteToken = () => {
        messaging().deleteToken()
        .catch(error => {
            console.log("[FCMService] deleteToken() error: ", error)
        })
    }

    // ALL LISTENERS TRIGGER ON THE REGISTER
    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

        // LISTENER BACKGROUND: App is running in the background
        messaging()
        .onNotificationOpenedApp(remoteMessage => {
            console.log('FCMService] onNotificationOpenedApp Notification caused app to open from background state', remoteMessage)
            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                // this.removeDeliveredNotification(notification.notificationId)
            }
        })

        //When the appliction is opened from a quit state
        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            console.log("[FCMService] getInitialNotification Notification caused app to open from quit state: ", remoteMessage)

            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                // this.removeDeliveredNotification(notification.notificationId)
            }
        })

        // LISTENER FOREGROUND: App is running in the foreground
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMService] New msg in foreground", remoteMessage)

            if(remoteMessage){
                let notification = null
                if(Platform.OS === 'ios'){
                    notification = remoteMessage.data.notification
                }else{
                    notification = remoteMessage.notification
                }

                onNotification(notification)
            }
        })

        // LISTENER NEW TOKEN: A new token and latest was created
        messaging()
        .onTokenRefresh(fcmToken => {
            console.log("[FCMService] New token refresh: ", fcmToken)
            onRegister(fcmToken)
        })

    }

    unRegister = () => {
        this.messageListener()
    }

}

export const fcmService = new FCMService()