import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native'

import elements from '../data/elements.js'

import CalendarSubItem from './CalendarSubItem'


const CalendarSubsection = () => {
  const elements2 = []
  return (
    <FlatList
      keyExtractor={item =>item.id}
      data={elements}
      style={styles.FlatList}
      ListEmptyComponent={() =>
        <View>
          <Text style={styles.EmptyComponent}>Empty</Text>
          <Text style={styles.EmptyComponentPlus}>+</Text>
        </View>}
      ItemSeparatorComponent={() =>
        <View style={styles.Separator}></View>}
      renderItem={({item}) =>
        <CalendarSubItem key={item.key} item={item} />
      }
    />)
}

const styles = StyleSheet.create({
  FlatList: {
    borderWidth: 1,
    borderColor: 'blue',
    // height: 300,
    // overflow: 'scroll'
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

export default CalendarSubsection
