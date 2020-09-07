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

    height: 20,
    backgroundColor: '#ee6f57'
  }
})

export default Separator
