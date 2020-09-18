import React from 'react'

import elements from './elements2'

let findExtension = (day) => {
  if(day == 1 || day == 21 || day == 31)
    return "st"
  else if(day == 2 || day == 22)
    return "nd"
  else if(day == 3 || day == 23)
    return "rd"
  else
    return "th"
}

const calendar = () => {

  var calendar_array = {}
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  for(let i = -2; i <= 21; i++){
    let dt = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000)
    let day = dt.getDate()
    let dayZero = (day < 10) ? "0" + day : day
    let month = dt.getMonth() + 1
    let monthZero = (month < 10) ? "0" + month : month
    let year = dt.getFullYear()

    let key = year + "-" + monthZero + "-" + dayZero
    let extension = findExtension(day)


    let ielements = []
    if(elements[key] !== undefined){
      ielements = elements[key]
    }

    calendar_array[key] = {
      'key': key,
      'day': day,
      // 'month': month,
      // 'year': year,
      'extension': extension,
      'monthName': monthNames[dt.getMonth()],
      'elements': ielements
    }
  }

  return calendar_array
}

export default calendar()
