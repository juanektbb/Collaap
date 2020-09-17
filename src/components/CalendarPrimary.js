import React, { Component } from 'react'

import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native'

import calendar from '../data/calendar.js'

import helpers from '../helpers.js'

import CalendarItem from './CalendarItem'



class CalendarPrimary extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    // console.log(calendar)
  }

  render(){
    return (
      <FlatList
        horizontal
        keyExtractor={item => calendar[item].key}
        data={Object.keys(calendar)}
        style={styles.FlatList}
        ItemSeparatorComponent={() =>
          <View style={styles.Separator} />}
        renderItem={({item}) =>
          <CalendarItem
            item={calendar[item]}
            clickOnCalendarCell={this.props.clickOnCalendarCell}
            isActive={calendar[item].key === this.props.onThisDate}
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
