import React, { Component } from 'react'

import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native'

import PrimaryCalendarItem from './PrimaryCalendarItem'



class PrimaryCalendar extends Component{

  constructor(props){
    super(props)
    this.state = {
      calendar: {}
    }
  }

  componentDidMount(){
    this.setState({
      calendar: this.props.calendar
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.calendar !== this.props.calendar)
      this.setState({ calendar: this.props.calendar })
  }

  render(){
    return (
      <FlatList
        horizontal
        keyExtractor={item => this.state.calendar[item].key}
        data={Object.keys(this.state.calendar)}
        style={styles.PrimaryCalendar}
        ItemSeparatorComponent={() =>
          <View style={styles.Separator} />}
        renderItem={({item}) =>
          <PrimaryCalendarItem
            item={this.state.calendar[item]}
            clickOnCalendarCell={this.props.clickOnCalendarCell}
            isActive={this.state.calendar[item].key === this.props.onThisDate}
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

export default PrimaryCalendar
