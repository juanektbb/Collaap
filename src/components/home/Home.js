import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable
} from 'react-native';

import helpers from 'Collaap/src/helpers.js'
import categories from 'Collaap/src/data/categories.js'

// import builder from '../../data/builder'

import calendar from 'Collaap/src/data/calendar.js'

import PrimaryCalendar from './PrimaryCalendar'
import Separator from 'Collaap/src/components/general/Separator'
import ElementItem from 'Collaap/src/components/ElementItem'

class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
      on_this_date: helpers.getToday(),
      calendar: {},
      home_elements: []
    }
  }

  openAddScreen = () => {
    this.props.navigation.navigate('AddScreen')
  }

  loadNewItemScreen = (item) => {
    this.props.navigation.navigate('NewItemScreen', { item })
  }


  clickOnCalendarCell = (yyyymmdd) => {
    this.setState({
      on_this_date: yyyymmdd,
      home_elements: this.state.calendar[yyyymmdd].elements
    })
  }

  componentDidMount(){
    this.setState({
      calendar: calendar,
      home_elements: calendar[this.state.on_this_date].elements
    })
  }


  render(){
    return (
      <FlatList
        keyExtractor={item => item.id}
        data={this.state.home_elements}
        style={styles.Home}
        ListHeaderComponent={<>
          <PrimaryCalendar
            calendar={this.state.calendar}
            onThisDate={this.state.on_this_date}
            clickOnCalendarCell={this.clickOnCalendarCell}/>
          <Separator />
        </>}
        ListEmptyComponent={() =>
          <Pressable onPress={this.openAddScreen}>
            <View>
              <Text style={styles.EmptyComponent}>Empty</Text>
              <Text style={styles.EmptyComponentPlus}>+</Text>
            </View>
          </Pressable>}
        ItemSeparatorComponent={() =>
          <View style={styles.Separator}></View>}
        renderItem={({item}) =>
          <ElementItem
            item={item}
            icon={categories[item.category].icon}
            loadNewItemScreen={this.loadNewItemScreen}
          />
        }
      />)
  }
}

const styles = StyleSheet.create({
  Home: {

  },
  Separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4'
  },
  EmptyComponent: {
    textAlign: 'center',
    marginTop: 30,
    color: '#bbb',
    fontSize: 24
  },
  EmptyComponentPlus: {
    textAlign: 'center',
    color: '#bbb',
    marginTop: -8,
    fontSize: 36
  }
})

export default Home
