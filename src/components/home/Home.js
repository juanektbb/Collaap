import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable
} from 'react-native';

import { connect } from 'react-redux'

import helpers from 'Collaap/src/utils/helpers.js'
import categories from 'Collaap/src/data/categories.js'

import PrimaryCalendar from './PrimaryCalendar'
import Separator from 'Collaap/src/components/general/Separator'
import Element from './Element'

function mapStateToProps(state){
  return {
    calendar: state.calendar
  }
}

class Home extends Component{

  loadNewItemScreen = (item) => {
    this.props.navigation.navigate('NewItemScreen', { item })
  }

  openAddScreen = () => {
    this.props.navigation.navigate('AddScreen')
  }

  constructor(props){
    super(props)
    this.state = {
      on_this_date: helpers.getToday(),
      home_elements: []
    }
  }

  clickOnCalendarCell = (yyyymmdd) => {
    this.setState({
      on_this_date: yyyymmdd,
      home_elements: this.props.calendar[yyyymmdd].elements
    })
  }

  componentDidMount(){
    this.setState({
      home_elements: this.props.calendar[this.state.on_this_date].elements
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
          <Element
            item={item}
            icon={categories[item.category].icon}
            loadNewItemScreen={this.loadNewItemScreen}
          />}
      />)
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(Home)
