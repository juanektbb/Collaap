import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'

class FCMService{

    //Create a register 
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    //iOS register device with APNs to receive remote messages
    registerAppWithFCM = async () => {
        if(Platform.OS === 'ios'){
            //Auuto registration in IOS is enabled by default, following code is not required
            //await messaging().registerDeviceForRemoteMessages()
            await messaging().setAutoInitEnabled(true)
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //Check users permissions to register this device
    checkPermission = (onRegister) => {
        messaging().hasPermission()
        .then(enabled => {
            //This user has permissions to register device
            if(enabled){
                this.getToken(onRegister)

            //This user requires permissions to register device
            }else{
                this.requestPermission(onRegister)
            }
        }).catch(error => {
            console.error("[FCMService] Permission rejected ", error)
        })
    }

    //User with permissions retrieves token
    getToken = (onRegister) => {
        messaging().getToken()
        .then(fcmToken => {
            if(fcmToken){
                onRegister(fcmToken)
            }else{
                console.error("[FCMService] This user does not have a device token")
            }
        }).catch(error => {
            console.error("[FCMService] Token rejected: ", error)
        })
    }

    //This user is requestion permissions for registering device
    requestPermission = (onRegister) => {
        messaging().requestPermission()
        .then(() => {
            this.getToken(onRegister)
        }).catch(error => {
            console.error("[FCMService] requestPermission() rejected: ", error)
        })
    }

    //Delete the last token - Unused for now
    deleteToken = () => {
        messaging().deleteToken()
        .catch(error => {
            console.log("[FCMService] Delete token error: ", error)
        })
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //ALL LISTENERS
    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

        //LISTENER QUIT STATE: App is not running at all in device
        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            console.log("[FCMService] Listener from quit state")

            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                //this.removeDeliveredNotification(notification.notificationId)
            }
        })

        //LISTENER BACKGROUND: App is running in the background of device
        messaging()
        .onNotificationOpenedApp(remoteMessage => {
            console.log("[FCMService] Listener from background state")

            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                //this.removeDeliveredNotification(notification.notificationId)
            }
        })

        //LISTENER FOREGROUND: App is running in the foreground of device
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMService] Listener from foreground state")

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

        //LISTENER NEW TOKEN: A new token was dispatched
        messaging()
        .onTokenRefresh(fcmToken => {
            console.log("[FCMService] New token was created")
            onRegister(fcmToken)
        })

    }

    //Unregister the token and listeners
    unRegister = () => {
        this.messageListener()
    }

}

export const fcmService = new FCMService()