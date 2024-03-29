import characters from 'Collaap/src/data/characters.js'
import categories from 'Collaap/src/data/categories.js'

const helpers = {

  getToday: () => {
    let today = new Date()
    let day = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate()
    let monthTemp = today.getMonth() + 1
    let month = (monthTemp < 10) ? "0" + monthTemp : monthTemp
    let year = today.getFullYear()
    return year + "-" + month + "-" + day
  },

  convertToReadableDate: (date) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return weekDays[date.getDay()] + ", " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  },

  convertToReadableTime: (time) => {
    const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
    const mins = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    return hours + ":" + mins
  },

  getColorByCategory: (category) => {
    return categories[category]['mainColor']
  },

  getIconByName: (name) => {
    for(let i = 0; i < characters.length; i++){
      if(characters[i].name == name)
        return characters[i].icon
    }
  }

}

export default helpers
