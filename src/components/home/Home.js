import React, { Component, useContext } from 'react';
import {
  Text,
  View,
  Platform,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl
} from 'react-native';

import { connect } from 'react-redux'

import helpers from 'Collaap/src/helpers.js'
import colors from 'Collaap/src/data/colors.js'
import categories from 'Collaap/src/data/categories.js'

import Separator from 'Collaap/src/components/general/Separator'
import Element from 'Collaap/src/components/home/Element'
import PrimaryCalendar from 'Collaap/src/components/home/PrimaryCalendar'

import NoteController from 'Collaap/src/utils/NoteController'


import { promise_calendar_refresher } from 'Collaap/src/config/auto/refresh_calendar.js'
import refresh_collaaps from 'Collaap/src/config/auto/refresh_collaaps.js'

function mapStateToProps(state){
  return {
    calendar: state.calendar
  }
}


import { calendar_refresher } from 'Collaap/src/config/auto/refresh_calendar.js'

import { SocketContext } from 'Collaap/src/SocketContext.js';


class Home extends Component{

  static contextType = SocketContext

  state = {
    on_this_date: helpers.getToday(),
    on_error: null,
    loading: false,
    refreshing: false,
    refresh_msg: false
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

  
  //Functionality for RefreshControl component
  _onRefresh = () => {
    this.setState({ refreshing: true })
    
    promise_calendar_refresher().then((res) => {
      this.setState({
        refreshing: false,
        refresh_msg: res ? "New content updated" : "Already up to date"
      })

      setTimeout(() => this.setState({ refresh_msg: false }), 3500)
    });
  }





  triggerBaby(){
      const { callOtherDevices } = this.context    

      callOtherDevices("devices")
      console.log("trigger me")

  }



  render(){
    const content_to_show = this.props.calendar[this.state.on_this_date] !== undefined ? this.props.calendar[this.state.on_this_date].elements : []

    return (
      <SafeAreaView style={styles.container}>


      <Pressable onPress={() => this.triggerBaby()}>
        <Text style={{height: 50, backgroundColor: "red"}}>SEND MESSAGE TO OTHER DEVICES</Text>
      </Pressable>

      

      {this.state.on_error !== null &&
      <View style={styles.OnError}>
        <Text style={styles.OnErrorText}>
          {this.state.on_error}
        </Text>
      </View>}


      {this.state.refresh_msg && <Text style={styles.MsgLoaded}>{this.state.refresh_msg}</Text>}


      <FlatList
        keyExtractor={item => item._id}
        data={content_to_show}
        style={styles.Home}

        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}

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


    </SafeAreaView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },



  OnError: {
    paddingVertical: 10
  },
  OnErrorText: {
    color: colors.calltoaction,
    textAlign: "center"
  },

  MsgLoaded: {
    fontSize: 12,
    paddingTop: 5,
    color: "#FFF",
    paddingBottom: 4,
    textAlign: "center",
    backgroundColor: "#E94560"
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
