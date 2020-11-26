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
import { SocketContext } from 'Collaap/src/SocketContext.js';

import helpers from 'Collaap/src/helpers.js'
import colors from 'Collaap/src/data/colors.js'
import categories from 'Collaap/src/data/categories.js'

import Loading from 'Collaap/src/components/general/Loading'
import Separator from 'Collaap/src/components/general/Separator'
import Element from 'Collaap/src/components/home/Element'
import PrimaryCalendar from 'Collaap/src/components/home/PrimaryCalendar'

import NoteController from 'Collaap/src/utils/NoteController'

import { promise_calendar_refresher } from 'Collaap/src/config/auto/refresh_calendar.js'

function mapStateToProps(state){
  return {
    calendar: state.calendar
  }
}

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

  /*
    DELETE BY OWNER: Fully delete this item
  */
  deleteThisItem = async (item) => {

    //Get the emitters reload from SocketContext
    const { emitReloadMyCalendar, emitReloadCollaapsCalendars } = this.context   

    const noteController = new NoteController(null)
    const response = await noteController.DeleteNote(item._id)

    if(response['error']){
      this.setState({ on_error: response['msg'] })
      return false

    //Reload everyone's calendars
    }else{
      emitReloadMyCalendar()
      emitReloadCollaapsCalendars(item.collaborators)
    }
    
  }

  /*
    DELETE BY COLLAAP: Only delete me from this item
  */
  deleteMyCollaap = async (item) => {

    //Get the emitters reload from SocketContext
    const { emitReloadMyCalendar, emitReloadOneCalendarById, emitReloadCollaapsCalendars } = this.context  

    const noteController = new NoteController(null)
    const response = await noteController.DeleteMeFromCollaaps(item._id)

    if(response['error']){
      this.setState({ on_error: response['msg'] })
      return false

    //Reload everyone's calendars
    }else{
      emitReloadMyCalendar()
      emitReloadOneCalendarById(item.user)
      emitReloadCollaapsCalendars(item.collaborators)
    }

  }

  /*
    REFRESH CONTROL: Drag down content
  */
  _onRefresh = () => {
    this.setState({ refreshing: true })
    
    promise_calendar_refresher().then((res) => {
      this.setState({
        refreshing: false,
        refresh_msg: res ? "New content updated" : "Already up to date"
      })

      setTimeout(() => this.setState({ refresh_msg: false }), 3500)
    })
  }

  render(){

    //CALENDAR IS NOT LOADED YET
    if(this.props.calendar.length === 0){
      return (<Loading />)
    }

    //Display content, not need to use in state
    const display_content_home = this.props.calendar[this.state.on_this_date].elements

    return (
      <SafeAreaView>
      
        {this.state.on_error !== null &&
        <View style={styles.OnError}>
          <Text style={styles.OnErrorText}>
            {this.state.on_error}
          </Text>
        </View>}
  
        {this.state.refresh_msg && <Text style={styles.MsgLoaded}>{this.state.refresh_msg}</Text>}

        <FlatList
          keyExtractor={item => item._id}
          data={display_content_home}
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
          ListFooterComponent={display_content_home.length > 0 &&
            <Pressable onPress={() => this.openNewScreen(this.state.on_this_date)}>
                <Text style={styles.AddMore}>New +</Text>
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

      </SafeAreaView>
    )

  }
}

const styles = StyleSheet.create({
  OnError: {
    paddingVertical: 8,
    backgroundColor: colors.error
  },
  OnErrorText: {
    color: colors.softwhite,
    textAlign: "center"
  },
  MsgLoaded: {
    fontSize: 12,
    paddingTop: 5,
    color: "#FFF",
    paddingBottom: 4,
    textAlign: "center",
    backgroundColor: colors.calltoaction
  },
  Separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4'
  },
  AddMore: {
    height: 50,
    fontSize: 18,
    color: '#bbb',
    marginTop: 10,
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: "#ececec",
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
