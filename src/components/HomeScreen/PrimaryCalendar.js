import React from 'react'
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native'

import { connect } from 'react-redux'
import PrimaryCalendarElement from './PrimaryCalendarElement'

function mapStateToProps(state){
  return{
    calendar: state.calendar
  }
}

const PrimaryCalendar = (props) => {
  return(
    <FlatList
      horizontal
      keyExtractor={item => props.calendar[item].key}
      data={Object.keys(props.calendar)}
      style={styles.PrimaryCalendar}
      ItemSeparatorComponent={() =>
        <View style={styles.Separator} />}
      renderItem={({item}) =>
        <PrimaryCalendarElement
          item={props.calendar[item]}
          clickOnCalendarCell={props.clickOnCalendarCell}
          isActive={props.calendar[item].key === props.onThisDate}
        />}
    />)
}

const styles = StyleSheet.create({
  PrimaryCalendar: {
    height: 110,
  },
  Separator: {
    borderRightWidth: 1,
    borderRightColor: '#f2f2f2'
  }
})

export default connect(mapStateToProps)(PrimaryCalendar)
