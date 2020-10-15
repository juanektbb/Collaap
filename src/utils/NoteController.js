import settings from 'Collaap/src/settings.js'

class NoteController{

  constructor(item){
    const { title, category, note, array_collaboratos, is_everyday,
      start_date, use_secondary, end_date, time } = item

    this.title =  title
    this.category = category
    this.note = note
    this.array_collaboratos = array_collaboratos
    this.is_everyday = is_everyday
    this.start_date = start_date
    this.use_secondary = use_secondary
    this.end_date = end_date
    this.time = time
  }

  SaveNote = () => {

    const content_body = {
      "type": "note",
      "title": this.title,
      "category": this.category,
      "note": this.note,
      "array_collaboratos": this.array_collaboratos,
      "is_everyday": this.is_everyday,
      "start_date": this.start_date,
      "use_secondary": this.use_secondary,
      "end_date": this.end_date,
      "time": this.time
    }

    const details = {
        method: 'POST',
        headers: settings['REQUEST_HEADERS'],
        body: JSON.stringify(content_body)
    }

    console.log(JSON.stringify(content_body))

    // const response = await fetch(`${settings['API_URL']}/users/login`, details)
    // const data = await response.json()

    // console.log(data)

    return true

  }

}

export default NoteController
