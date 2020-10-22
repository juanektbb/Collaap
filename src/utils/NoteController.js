import AsyncStorage from '@react-native-community/async-storage'

import ElementsController from 'Collaap/src/utils/ElementsController'
import settings from 'Collaap/src/settings.js'

class NoteController{

  //CONSTRUCTOR WITH AN ITEM NOT NULL
  constructor(item){
    if(item !== null){
      const { title, category, content,
        array_collaboratos, is_everyday, start_date,
        use_secondary, end_date, time
      } = item

      this.title =  title
      this.category = category
      this.content = content
      this.array_collaboratos = array_collaboratos
      this.is_everyday = is_everyday
      this.start_date = start_date
      this.use_secondary = use_secondary
      this.end_date = end_date
      this.time = time
    }
  }

  //BUILD BODY FOR REQUEST
  contentBodyBuilder = () => {
    return {
      "type": "note",
      "title": this.title,
      "category": this.category,
      "content": this.content,
      "array_collaboratos": this.array_collaboratos,
      "is_everyday": this.is_everyday,
      "start_date": this.start_date,
      "use_secondary": this.use_secondary,
      "end_date": this.end_date,
      "time": this.time
    }
  }

  //SAVE A NEW NOTE 
  SaveNote = async () => {
    const content_body = this.contentBodyBuilder()
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(content_body)
    }

    const response = await fetch(`${settings['API_URL']}/elements`, details)
    const data = await response.json()

    if(!data['error'])
      await this.ReloadElements()

    return data
  }

  //UPDATE AN EXISTING NOTE
  UpdateNote = async (item_id) => {
    const content_body = this.contentBodyBuilder()
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(content_body)
    }

    const response = await fetch(`${settings['API_URL']}/elements/${item_id}`, details)
    const data = await response.json()

    if(!data['error'])
      await this.ReloadElements()

    return data
  }

  //DELETE AN EXISTING NOTE
  DeleteNote = async (item_id) => {
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'DELETE',
        headers: headers
    }

    const response = await fetch(`${settings['API_URL']}/elements/${item_id}`, details)
    const data = await response.json()

    if(!data['error'])
      await this.ReloadElements()

    return data
  }

  //HELPER CLASS FUNCTION
  ReloadElements = async () => {
    const elementsController = new ElementsController()
    await elementsController.RetrieveCalendar()
  }

}

export default NoteController
