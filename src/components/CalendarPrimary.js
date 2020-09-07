import React, { Component } from 'react'

import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native'

import elements from '../data/elements.js'
import calendar from '../data/calendar.js'

import helpers from '../helpers.js'

import CalendarItem from './CalendarItem'



class CalendarPrimary extends Component{

  constructor(props){
    super(props)
    this.state = {
      onThisDate: this.props.onThisDate
    }
  }

  checkItToday = (date) => {
    if(this.state.onThisDate == date){
      return true
    }
    return false
  }

  render(){
    return (
      <FlatList
        horizontal
        keyExtractor={item =>item.key}
        data={calendar}
        style={styles.FlatList}
        ItemSeparatorComponent={() =>
          <View style={styles.Separator}/>}
        renderItem={({item}) =>
          <CalendarItem
            item={item}
            elements={elements}
            isToday={this.checkItToday(item.final)}
            clickOnCalendarCell={this.props.clickOnCalendarCell}

          />
        }
      />)
  }
}

const styles = StyleSheet.create({
  FlatList: {
    height: 110,
  },
  Separator: {
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  }
})

export default CalendarPrimary
