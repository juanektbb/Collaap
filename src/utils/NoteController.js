import AsyncStorage from '@react-native-community/async-storage'
import { user_persist } from 'Collaap/src/shared/user_persist.js'
import settings from 'Collaap/src/settings.js'

class NoteController{

  //CONSTRUCTOR WITH AN ITEM NOT NULL
  constructor(item){

    //An item is an existing note
    if(item !== null){
      const { 
        type, 
        title, 
        category, 
        content, 
        list_items, 
        list_bools, 
        array_collaboratos, 
        is_everyday, 
        start_date, 
        use_secondary, 
        end_date, 
        time 
      } = item

      this.type = type
      this.title = title
      this.category = category
      this.content = content
      this.list_items = list_items
      this.list_bools = list_bools
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
      "type": this.type,
      "title": this.title,
      "category": this.category,
      "content": this.content,
      "list_items": this.list_items,
      "list_bools": this.list_bools,
      "array_collaboratos": this.array_collaboratos,
      "is_everyday": this.is_everyday,
      "start_date": this.start_date,
      "use_secondary": this.use_secondary,
      "end_date": this.end_date,
      "time": this.time
    }
  }

  //All collaaps involved in this note
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

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.SaveNote)

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return await response.json()
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

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.UpdateNote, { id: item_id })

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return await response.json()
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

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.DeleteNote, { id: item_id })

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return await response.json()
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

    //Time to check if the user's token is still valid, or needs to persits it 
    const is_dynamically_persisted = await user_persist(first_call, response['status'], this.DeleteMeFromCollaaps, { id: item_id })

    //Persist was necessary and return its contents
    if(is_dynamically_persisted){
      return is_dynamically_persisted
    }else{
      return await response.json()
    }
  }

}

export default NoteController
