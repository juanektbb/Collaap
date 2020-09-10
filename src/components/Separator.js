import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

class Separator extends Component{
  render(){
    return (<View style={styles.Separator}/>)
  }
}

const styles = StyleSheet.create({
  Separator: {
    height: 15,
    backgroundColor: '#ee6f57',
    elevation: 2
  }
})

export default Separator
