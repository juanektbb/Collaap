// const server_url = 'https://stage-collaap.herokuapp.com'
const server_url = 'http://192.168.0.12:4000'

const settings = {
  "SERVER_URL": server_url,
  "API_URL": `${server_url}/api`,
  "REQUEST_HEADERS": {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
}

export default settings
