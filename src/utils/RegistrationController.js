import settings from 'Collaap/src/settings.js'

class RegistrationController{

    //GET A NEW CODE FROM SERVER
    GenerateCode = async () => {
        const details = {
            method: 'GET',
            headers: settings['REQUEST_HEADERS'],
        }

        const response = await fetch(`${settings['API_URL']}/users/generate_group`, details)
        return await response.json()
    }

    //CREATE A GROUP FROM SERVER
    CreateGroup = async (payload) => {
        const details = {
            method: 'POST',
            headers: settings['REQUEST_HEADERS'],
            body: JSON.stringify(payload)
        }

        const response = await fetch(`${settings['API_URL']}/users/generate_group`, details)
        return await response.json()
    }

    //REGISTER THIS USER
    Register = async (payload) => {
        const details = {
            method: 'POST',
            headers: settings['REQUEST_HEADERS'],
            body: JSON.stringify(payload)
        }

        const response = await fetch(`${settings['API_URL']}/users/register`, details)
        return await response.json()
    }

}

export default RegistrationController