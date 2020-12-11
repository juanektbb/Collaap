//FIND THE MINIMUN DATE FOR END_DATE
const get_minimun_date = (on_start) => {
    if(on_start === null)
        return null

    var plus_date = new Date(on_start)
    plus_date.setDate(plus_date.getDate() + 1)

    return plus_date
}

//FIND THE APPROPIATE DATE, WHEN NOTE EXISTS
const compute_start_date = (is_everyday, start_date) => {
    return is_everyday ? new Date() : new Date(start_date)
}

//FIND THE APPROPIATE DATE, WHEN NOTE EXISTS
const compute_end_date = (is_everyday, start_date, end_date) => {
    //If it is everyday, populate with day after
    if(is_everyday){ 
      return get_minimun_date(new Date())

    //If end day exists, provide it
    }else if(end_date !== null){
      return new Date(end_date)
    
    //If it is only one day, provide its next day
    }else{ 
      return get_minimun_date(new Date(start_date))
    }
}

//CROP LONG TITLE FOR SCREEN TITLE
const crop_screen_title = (title) => {
    if(title.length <= 27)
        return title
    else
        return title.substr(0, 24) + "..."
}

export {
    get_minimun_date,
    compute_start_date,
    compute_end_date,
    crop_screen_title
}