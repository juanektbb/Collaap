import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable
} from 'react-native'

import helpers from 'Collaap/src/utils/helpers.js'
import colors from 'Collaap/src/data/colors.js'

class PrimaryCalendarItem extends Component{

  constructor(props){
    super(props)
    this.state = {
      data: {},
      elements: {},
      isActive: false
    }
  }

  calculateWidthElementInCalendar = (date) => {
    if(date == 'Everyday')
      return "100%"
    else
      return "31%"
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
    let elements = []

    //Loop and find remiders of this date and apply applicables
    this.props.item.elements.forEach((item) => {
        item.width = this.calculateWidthElementInCalendar(item.date)
        item.Left = this.calculateLeftElementInCalendar(item.date, item.time)
        item.catColor = helpers.getColorByCategory(item.category)
        elements.push(item)
    })

    this.setState({
      data: this.props.item,
      isActive: this.props.isActive,
      elements: elements
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.isActive !== this.state.isActive)
      this.setState({isActive: !this.state.isActive})
  }

  render(){
    return(
      <Pressable onPress={() => this.props.clickOnCalendarCell(this.state.data.key)}>
        <View style={[styles.CalendarPrimItem, (this.state.isActive) ? styles.IsSelected : null]}>
          <View style={styles.Number}>
            <Text style={styles.NumberText}>{this.state.data.day}</Text>
            <Text style={styles.NumberExtension}>{this.state.data.extension}</Text>
          </View>

          <View>
            <Text style={styles.Month}>{this.state.data.monthName}</Text>
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
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  CalendarPrimItem: {
    height: 110,
    width: Math.round(Dimensions.get('window').width) / 5 - 1,
    backgroundColor: colors.softwhite
  },
  IsSelected: {
    backgroundColor: '#c4ecfd',
    borderColor: "#aed7e9",
    borderWidth: 1
  },
  Number: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  NumberText: {
    fontSize: 40,
    textAlign: 'center',
    color: colors.softdark
  },
  NumberExtension: {
    fontSize: 10,
    lineHeight: 34,
    marginLeft: 1
  },
  Month: {
    fontSize: 12,
    color: '#777',
    marginTop: -3,
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

export default PrimaryCalendarItem
