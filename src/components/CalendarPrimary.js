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
            clickOnCalendarCell={this.props.clickOnCalendarCell}
            isActive={item.key === this.props.onThisDate}
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
