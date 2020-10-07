import settings from 'Collaap/src/settings.js'

const fetchLogin = async (username, password, icon_name) => {

  const content_body = {
    "username": username,
    "password": password,
    "icon": icon_name
  }

  const details = {
      method: 'POST',
      headers: settings['REQUEST_HEADERS'],
      body: JSON.stringify(content_body)
  }

  const response = await fetch(`${settings['API_URL']}/users/login`, details)
  const data = await response.json()

  return(data)

}

export default fetchLogin
