import React from 'react'

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

  var calendar_array = []
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  for(let i = -2; i <= 31; i++){
    let dt = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000)
    let day = dt.getDate()
    let day2 = (dt.getDate() < 10) ? "0" + dt.getDate() : dt.getDate()
    let month1 = dt.getMonth() + 1
    let month2 = (month1 < 10) ? "0" + month1 : month1
    let year = dt.getFullYear()
    let final = year + "-" + month2 + "-" + day2

    let extension = findExtension(day)

    calendar_array.push({
      'key': final,
      'day': day,
      'extension': extension,
      'month': monthNames[dt.getMonth()],
      'final': final
    })
  }

  return calendar_array
}

export default calendar()
