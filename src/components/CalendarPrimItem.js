import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList
} from 'react-native'

import helpers from '../helpers.js'

class CalendarPrimItem extends Component{

  constructor(props){
    super(props)
    this.state = {
      data: {},
      elements: {}
    }
  }

  calculateWidthElementInCalendar = (date) => {
    if(date == 'Everyday'){
      return "100%"
    }else{
      return "31%"
    }
  }

  calculateLeftElementInCalendar = (date, time) => {
    if(date == 'Everyday'){
      return "0%"
    }else{
      let subTime = time.substring(0, 3)
      let calcLeft = parseInt(subTime) * 3
      return calcLeft.toString() + "%"
    }
  }

  componentDidMount(){
    let elementsDate = []
    let elementsEveryday = []

    this.setState({
      data: this.props.item,
    })

    //Loop and find remiders of this date and applicatable
    this.props.elements.forEach((item) => {
      if(this.props.item.final == item.date){
        item.width = this.calculateWidthElementInCalendar(item.date)
        item.Left = this.calculateLeftElementInCalendar(item.date, item.time)
        item.catColor = helpers.getColorByCategory(item.category)
        elementsDate.push(item)

      }else if(item.date == 'Everyday'){
        item.width = this.calculateWidthElementInCalendar(item.date)
        item.Left = this.calculateLeftElementInCalendar(item.date, item.time)
        item.catColor = helpers.getColorByCategory(item.category)
        elementsEveryday.push(item)
      }
    })

    let elements = elementsDate.concat(elementsEveryday)

    this.setState({
      elements: elements
    })
  }

  render(){
    return(
      <View style={[styles.CalendarPrimItem,
        (this.props.isToday) ? styles.IsToday : null
      ]}
        onPress={() => this.props.clickOnCalendarCell("20")}
      >
        <View style={styles.Number}>
          <Text style={styles.NumberText}>{this.state.data.day}</Text>
          <Text style={styles.NumberExtension}>{this.state.data.extension}</Text>
        </View>
        <View>
          <Text style={styles.Month}>{this.state.data.month}</Text>
        </View>
        <View style={styles.ElementsInCalendar}>
          <FlatList
            keyExtractor={item =>item.id}
            data={this.state.elements}
            renderItem={({item}) =>
              <View style={[styles.ElementInCalendar, {
                  marginLeft: item.Left,
                  width: item.width,
                  borderColor: item.catColor
                }]} />
            }/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  CalendarPrimItem: {
    height: 110,
    width: Math.round(Dimensions.get('window').width) / 5 - 1,
    backgroundColor: '#eee'
  },
  IsToday: {
    borderWidth: 1,
    borderColor: '#5b8bc7',
    backgroundColor: '#e6f1ff'
  },
  Number: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  NumberText: {
    fontSize: 40,
    textAlign: 'center'
  },
  NumberExtension: {
    fontSize: 10,
    lineHeight: 34,
    marginLeft: 1
  },
  Month: {
    fontSize: 10,
    color: '#777',
    textAlign: 'center'
  },
  ElementsInCalendar: {
    marginTop: 8,
    marginBottom: 2,
    marginHorizontal: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  ElementInCalendar: {
    borderWidth: 1,
    marginTop: 2
  }
})

export default CalendarPrimItem
