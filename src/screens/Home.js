import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList
} from 'react-native';

import helpers from '../helpers.js'

import CalendarPrimary from '../components/CalendarPrimary.js'

import Separator from '../components/Separator.js'

import elements from '../data/elements.js'
import ElementItem from '../components/ElementItem'

class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
      on_this_date: helpers.getToday()
    }
  }

  clickOnCalendarCell = (yyyymmdd) => {
    console.log(yyyymmdd)
    this.setState({
      on_this_date: yyyymmdd
    })
  }

  componentDidUpdate(){
    // alert(this.state.on_this_date)
    // alert("ettoo")
  }

  render(){
    return (
      <FlatList
        keyExtractor={item =>item.id}
        data={elements}
        style={styles.FlatList}
        ListHeaderComponent={<>
          <CalendarPrimary
            onThisDate={this.state.on_this_date}
            clickOnCalendarCell={this.clickOnCalendarCell}
          />
          <Separator />
        </>}
        ListEmptyComponent={() =>
          <View>
            <Text style={styles.EmptyComponent}>Empty</Text>
            <Text style={styles.EmptyComponentPlus}>+</Text>
          </View>}
        ItemSeparatorComponent={() =>
          <View style={styles.Separator}></View>}
        renderItem={({item}) =>
          <ElementItem key={item.key} item={item} />
        }
      />)
  }
}

const styles = StyleSheet.create({
  FlatList: {
    marginBottom: 80
  },
  Separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4'
  },
  EmptyComponent: {
    textAlign: 'center',
    color: '#333',
    fontSize: 26
  },
  EmptyComponentPlus: {
    textAlign: 'center',
    color: '#333',
    fontSize: 26,
  }
})

export default Home
