import React, { Component } from 'react'

import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native'

import PrimaryCalendarItem from './PrimaryCalendarItem'

import { connect } from 'react-redux'

function mapStateToProps(state){
  return{
    calendar: state.calendar
  }
}

class PrimaryCalendar extends Component{

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <FlatList
        horizontal
        keyExtractor={item => this.props.calendar[item].key}
        data={Object.keys(this.props.calendar)}
        style={styles.PrimaryCalendar}
        ItemSeparatorComponent={() =>
          <View style={styles.Separator} />}
        renderItem={({item}) =>
          <PrimaryCalendarItem
            item={this.props.calendar[item]}
            clickOnCalendarCell={this.props.clickOnCalendarCell}
            isActive={this.props.calendar[item].key === this.props.onThisDate}
          />}
      />)
  }
}

const styles = StyleSheet.create({
  PrimaryCalendar: {
    height: 110,
  },
  Separator: {
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  }
})

export default connect(mapStateToProps)(PrimaryCalendar)
