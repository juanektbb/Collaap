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
      isActive: false
    }
  }

  //Calculate the with of the line
  calculateWidth = (date, use_secondary, is_everyday) => {
    if(is_everyday || use_secondary !== 'time'){
      return "100%"
    }else{
      return "31%"
    }
  }

  //Calculate where the line starts
  calculateLeft = (time, use_secondary, is_everyday) => {
    if(is_everyday || use_secondary !== 'time'){
      return "0%"

    }else{
      const to_time = new Date(time)
      const hours = to_time.getUTCHours()
      const calcLeft = parseInt(hours) * 3

      return calcLeft.toString() + "%"
    }
  }

  componentDidMount(){
    this.setState({
      isActive: this.props.isActive
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.isActive !== this.state.isActive)
      this.setState({isActive: !this.state.isActive})
  }

  render(){
    return(
      <Pressable onPress={() => this.props.clickOnCalendarCell(this.props.item.key)}>
        <View style={[styles.CalendarPrimItem, (this.state.isActive) ? styles.IsSelected : null]}>
          <View style={styles.Number}>
              <Text style={styles.NumberText}>{this.props.item.day}</Text>
            <Text style={styles.NumberExtension}>{this.props.item.extension}</Text>
          </View>

          <View>
            <Text style={styles.Month}>{this.props.item.monthName}</Text>
          </View>

          <View style={styles.ElementsInCalendar}>
            <FlatList
              keyExtractor={item => item._id}
              data={this.props.item.elements}
              renderItem={({item}) =>
                <View style={[styles.ElementInCalendar, {
                  marginLeft: this.calculateLeft(item.time, item.use_secondary, item.is_everyday),
                  width: this.calculateWidth(item.date, item.use_secondary, item.is_everyday),
                  borderColor: helpers.getColorByCategory(item.category)
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
