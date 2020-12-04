import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import { Platform } from 'react-native'

class LocalNotificationService{

    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function(token){
                console.log("[LNS] onRegister - Register token by LNS")
                // console.log("Device: " + token.token)
            },

            onNotification: function (notification) {
                console.log("[LNS] onNotification")

                if(!notification?.data){
                    return
                }
                
                notification.UserInteraction = true
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data)

                //When a remote is received or opened, also when local notification is opened
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

    //Unregister the token and listeners
    unRegister = () => {
        PushNotification.unregister()
    }

    //Notifications display
    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            
            //Android properties only
            ...this.buildAndroidNotification(id, title, message, data, options),

            //iOS and Android properties
            ...this.buildIOSNotification(id, title, message, data, options),

            //iOS and Android properties
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || "default",
            userInteraction: false //BOOL, the notification was opened by the user from the notifications

        })
    }

    //Android notifications layout
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
            importance: options.importance || "high", //Optional, set notification importance, default: high
            data: data
        }
    }

    //iOS notifications layout
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
    
    //Close all notifications in device
    cancelAllLocalNotifications = () => {
        if(Platform.OS === 'ios'){
            PushNotificationIOS.removeAllDeliveredNotifications()
        }else{
            PushNotification.cancelAllLocalNotifications()
        }
    }

    //Close all notifications in iOS
    removeAllDeliveredNotifications = (notificationId) => {
        PushNotification.cancelAllLocalNotifications({ id: `${notificationId}` })
    }

}

export const localNotificationService = new LocalNotificationService()