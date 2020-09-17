import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable
} from 'react-native';

import helpers from 'Collaap/src/helpers.js'

import builder from '../../data/builder'

import CalendarPrimary from 'Collaap/src/components/CalendarPrimary.js'
import Separator from 'Collaap/src/components/Separator.js'

import elements from 'Collaap/src/data/elements.js'
import ElementItem from 'Collaap/src/components/ElementItem'

class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
      on_this_date: helpers.getToday(),
      data_display: []
    }
  }

  openAddScreen = () => {
    this.props.navigation.navigate('AddScreen')
  }


  clickOnCalendarCell = (yyyymmdd) => {
    this.setState({
      on_this_date: yyyymmdd
    })
  }

  filterElements = (yyyymmdd) => {

    let temp_elements = []
    elements.forEach((item, i) => {
      if(item.date === yyyymmdd || item.date === 'Everyday'){
        temp_elements.push(item)
      }
    })

    this.setState({
      data_display: temp_elements
    })

  }

  componentDidMount(){
    this.filterElements(this.state.on_this_date)
  }

  componentDidUpdate(){

  }

  render(){
    return (
      <FlatList
        keyExtractor={item =>item.id}
        data={this.state.data_display}
        style={styles.FlatList}
        ListHeaderComponent={<>
          <CalendarPrimary
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
          <ElementItem key={item.key} item={item} />
        }
      />)
  }
}

const styles = StyleSheet.create({
  FlatList: {
    marginBottom: 50
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
