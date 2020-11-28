import AsyncStorage from '@react-native-community/async-storage'
import user_persist from 'Collaap/src/shared/user_persist.js'
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

  CollaapsInvolved = () => {
    return this.array_collaboratos
  }

  /*
    SAVE A NEW NOTE 
  */
  SaveNote = async (first_call = true) => {
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

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.SaveNote)

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return data
    }
  }

  /* 
    UPDATE AN EXISTING NOTE
  */
  UpdateNote = async (item_id, first_call = true) => {
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

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.UpdateNote, { id: item_id })

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return data
    }
  }

  /* 
    DELETE AN EXISTING NOTE
  */
  DeleteNote = async (item_id, first_call = true) => {
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'DELETE',
        headers: headers
    }

    const response = await fetch(`${settings['API_URL']}/elements/${item_id}`, details)
    const data = await response.json()

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.DeleteNote, { id: item_id })

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return data
    }
  }

  /* 
    DELETE MYSELF FROM AN EXISTING NOTE
  */
  DeleteMeFromCollaaps = async (item_id, first_call = true) => {
    const session_token = await AsyncStorage.getItem('session_token')

    const headers = settings['REQUEST_HEADERS']
    headers['x-access-token'] = session_token

    const details = {
        method: 'DELETE',
        headers: headers
    }

    const response = await fetch(`${settings['API_URL']}/elements/${item_id}/myself`, details)
    const data = await response.json()

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.DeleteMeFromCollaaps, { id: item_id })

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return data
    }
  }

}

export default NoteController
