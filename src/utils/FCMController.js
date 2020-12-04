import AsyncStorage from '@react-native-community/async-storage'
import settings from 'Collaap/src/settings.js'

class FCMController{

    PushToken = async (fcm_token) => {
        const session_token = await AsyncStorage.getItem('session_token')

        const content_body = {
            "fcm_token": fcm_token
        }

        const headers = settings['REQUEST_HEADERS']
        headers['x-access-token'] = session_token

        const details = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(content_body)
        }

        const response = await fetch(`${settings['API_URL']}/users/submit_fcm_token`, details)
    }

}

export default FCMController