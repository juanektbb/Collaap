const helpers = {

  getToday: () => {
    let today = new Date()
    let day = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate()
    let monthTemp = today.getMonth() + 1
    let month = (monthTemp < 10) ? "0" + monthTemp : monthTemp
    let year = today.getFullYear()
    return year + "-" + month + "-" + day
  },

  getColorByCategory: (category) => {
    switch(category){
      case "food":
        return 'green'
        break
      case "party":
        return "blue"
        break
      default:
        return "red"
    }
  }

}

export default helpers;
