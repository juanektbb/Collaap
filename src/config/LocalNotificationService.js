import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import { Platform } from 'react-native'

class LocalNotificationService{

    configure = (onOpenNotification) => {

        PushNotification.configure({
            onRegister: function(token){
                console.log("[LNS] onRegister ", token)
            },
            onNotification: function (notification) {
                console.log("[LNS] onNotification", notification)
                if(!notification?.data){
                    return
                }
                notification.UserInteraction = true
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data)

                //called when a remote is received or opned, or local notification is opened
                if(Platform.OS === 'ios'){
                    notification.finish(PushNotificationIOS.FetchResult.NoData)
                }
            },

            //IOS ONLY (OPTIONAL): Default: all - Permissions to register
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
            * (optional) default: true
            * - Specified if permissions (ios) and token (android and ios) will requested or not,
            * - if not, you must call PushNotificationsHandler.requestPermissions() later
            * - if you are not using remote notification or do not have Firebase installed, use this:
            *     requestPermissions: Platform.OS === 'ios'
            */
            requestPermissions: true,
        })
    }

    unRegister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            //ANDROID ONLY PROPERTIES\
            ...this.buildAndroidNotification(id, title, message, data, options),

            //Iios and android properties
            ...this.buildIOSNotification(id, title, message, data, options),

            // IOS and android  properties
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || "default",
            userInteraction: false //BOOL if the notification was opened by the user from the notifications
        })
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high", //optional, set nofitication importance, default: high
            data: data
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || "view",
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }
    
    cancelAllLocalNotifications = () => {
        if(Platform.OS === 'ios'){
            PushNotificationIOS.removeAllDeliveredNotifications()
        }else{
            PushNotification.cancelAllLocalNotifications()
        }
    }

    removeAllDeliveredNotifications = (notificationId) => {
        console.log("[LNS] removeDelieveredNotificationByID: ", notificationId)
        PushNotification.cancelAllLocalNotifications({ id: `${notificationId}` })
    }

}

export const localNotificationService = new LocalNotificationService()