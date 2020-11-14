// import firebase from 'react-native-firebase'
// import type { Notification, NotificationOpen } from 'react-native-firebase'

// class FCMService {
    
//     register = (onRegister, onNotification, onOpenNotification) => {
//         this.checkPermission(onRegister)
//         this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
//     }

//     checkPermission = (onRegister) => {
//         firebase.messaging().hasPermission()
//         .then(enabled => {
//             if(enabled){
//                 // User has permission
//                 this.getToken(onRegister)
//             }else{
//                 // User does not have persmission
//                 this.requesPermission(onRegister)
//             }
//         }).catch(error => {
//             console.log("Permission rejected ", error)
//         })
//     }

//     getToken = (onRegister) => {
//         firebase.messaging().getToken()
//         .then(fcmToken => {
//             if(fcmToken){
//                 onRegister(fcmToken)
//             }else{
//                 console.log("User does not have a device token")
//             }
//         }).catch(error => {
//             console.log("getToken rejected ", error)
//         })
//     }

//     requesPermission = (onRegister) => {
//         firebase.messaging().requesPermission()
//         .then(() => {
//             this.getToken(onRegister)
//         }).catch(error => {
//             console.log("Request permission rejected ", error)
//         })
//     }

//     deleteToken = () => {
//         firebase.messaging().deleteToken()
//         .catch(error => {
//             console.log("Delete token error", error)
//         })
//     }

//     createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
//         //Trigger when a particular notification has been received in foreground
//         this.notificationListener = firebase.notifications()
//         .onNotification((notification: Notification) => {
//             onNotification(notification)
//         })
    


//         //If app is in background, listener when notification is tapped or opened
//         this.notificationOpenedListener = firebase.notification()
//         .onNotificationOpened((notificationOpen: NotificationOpen) => {
//             onOpenNotification(notification)
//         })


//         //If the app is closed, check the app was opened with a notification with click or tapped
//         firebase.notifications().getInitialNotification()
//         .then(notificationOpen =>  {
//             if(notificationOpen){
//                 const notification: Notification = notificationOpen.notification
//                 onOpenNotification(notification)
//             }
//         })

        
//         //triggered for data only payload in foreground
//         this.messageListener = firebase.messaging().onMessage((message) => {
//             onNotification(message)
//         })

//         //trigger when have a new token
//         this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
//             console.log("New token refesh: ", fcmToken)
//             onRegister(fcmToken)
//         })   

//     }

//     unRegister = () => {
//         this.notificationListener()
//          this.notificationOpenedListener()
//         this.messageListener()
//         this.onTokenRefreshListener()
//     }

//     buildChannel = (obj) => {
//         return new firebase.notification.Android.channel(
//             obj.channelID, obj.channelName
//             firebase.notification.Android.Importance.High)
//             .setDescription(obj.channelDes)
//     }

//     buildNotification = (obj) => {
//         // For Android
//         firebase.notifications().android.createChannel(obj.Channel)

//         //For Android and iOS
//         return firebase.notifications.Notification()
//         .setSound(obj.sound)
//         .setNotificationId(obj.dataId)
//         .setTitle(obj.title)
//         .setBody(obj.content)
//         .setData(obj.data)

//         //For android
//         .android.setChannelId(obj.channel.channelID)
//         .android.setLargeIcon(obj.largeIcon) //APP ICON from app/res/mipmap
//         .android.setSmallIcon(obj.smallIcon) //APP ICON from app/res/mipmap
//         .android.setColor(obj.colorBgIcon)
//         .android.setPriority(firebase.notifications.Android.Priority.High)
//         .android.setVibrate(obj.vibrate)
//         .android.setAutoCancel(true) //Autocancel after receive notification

//     }

//     scheduleNotification = (notification, days, minutes) => {
//         const date = new Date()
//         if(days){
//             date.setDate(date.getDate() + days)
//         }

//         if(minutes){
//             date.setMinutes(date.getMinutes() + miutes)
//         }

//         firebase.notifications()
//         .scheduleNotification(notification, {firebase: date.getTime()})

//     }


//     displayNotification = (notificaation) => {
//         firebase.notifications().displayNotification(notification)
//         .catch(error => {
//             console.log("Display notification error", error)
//         })
//     }

//     removeDeliveredNotification = (nofication) => {
//         firebase.notifications().removeDeliveredNotification(notificaiton.notifcationId)
//     }





// }

// export const fcmService = New FCMService()