import settings from 'Collaap/src/settings.js'

class AccountController{

    //UPDATE THIS ACCOUNT
    UpdateAccount = async (payload) => {
        const details = {
            method: 'PUT',
            headers: settings['REQUEST_HEADERS'],
            body: JSON.stringify(payload)
        }

        const response = await fetch(`${settings['API_URL']}/users/update`, details)
        return await response.json()
    }

}

export default AccountController