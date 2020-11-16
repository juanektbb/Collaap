import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable
} from 'react-native';

import { connect } from 'react-redux'

import helpers from 'Collaap/src/helpers.js'
import colors from 'Collaap/src/data/colors.js'
import categories from 'Collaap/src/data/categories.js'

import Separator from 'Collaap/src/components/general/Separator'
import Element from 'Collaap/src/components/home/Element'
import PrimaryCalendar from 'Collaap/src/components/home/PrimaryCalendar'

import NoteController from 'Collaap/src/utils/NoteController'

function mapStateToProps(state){
  return {
    calendar: state.calendar
  }
}

class Home extends Component{

  state = {
    on_this_date: helpers.getToday(),
    on_error: null,
    loading: false
  }

  loadNewItemScreen = (item) => {
    this.props.navigation.navigate('NewItemScreen', { item })
  }

  openNewScreen = (date) => {
    this.props.navigation.navigate('NewScreen', { open_date: date })
  }

  clickOnCalendarCell = (yyyymmdd) => {
    this.setState({ on_this_date: yyyymmdd })
  }

  deleteThisItem = async (_id) => {
    const noteController = new NoteController(null)
    const response = await noteController.DeleteNote(_id)

    if(response['error']){
      this.setState({ on_error: response['msg'] })
      return false
    }
  }

  deleteMyCollaap = async (_id) => {
    const noteController = new NoteController(null)
    const response = await noteController.DeleteMeFromCollaaps(_id)

    if(response['error']){
      this.setState({ on_error: response['msg'] })
      return false
    }
  }

  render(){
    const content_to_show = this.props.calendar[this.state.on_this_date] !== undefined ? this.props.calendar[this.state.on_this_date].elements : []

    return (<>
      {this.state.on_error !== null &&
      <View style={styles.OnError}>
        <Text style={styles.OnErrorText}>
          {this.state.on_error}
        </Text>
      </View>}

      <FlatList
        keyExtractor={item => item._id}
        data={content_to_show}
        style={styles.Home}
        ListHeaderComponent={<>
          <PrimaryCalendar
            onThisDate={this.state.on_this_date}
            clickOnCalendarCell={this.clickOnCalendarCell}/>
          <Separator height={10} />
        </>}
        ListEmptyComponent={() =>
          <Pressable onPress={() => this.openNewScreen(this.state.on_this_date)}>
            <View>
              <Text style={styles.EmptyComponent}>Empty</Text>
              <Text style={styles.EmptyComponentPlus}>+</Text>
            </View>
          </Pressable>}
        ListFooterComponent={content_to_show.length > 0 &&
          <Pressable onPress={() => this.openNewScreen(this.state.on_this_date)}>
            <View>
              <Text style={styles.AddMore}>Add more +</Text>
            </View>
          </Pressable>}
        ItemSeparatorComponent={() =>
          <View style={styles.Separator}></View>}
        renderItem={({item}) =>
          <Element
            item={item}
            icon={categories[item.category].icon}
            deleteThisItem={this.deleteThisItem}
            deleteMyCollaap={this.deleteMyCollaap}
            loadNewItemScreen={this.loadNewItemScreen}
          />}
      />
    </>)
  }
}

const styles = StyleSheet.create({
  OnError: {
    paddingVertical: 10
  },
  OnErrorText: {
    color: colors.calltoaction,
    textAlign: "center"
  },
  Separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4'
  },
  AddMore: {
    height: 50,
    fontSize: 18,
    color: '#bbb',
    lineHeight: 50,
    textAlign: 'center'
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
