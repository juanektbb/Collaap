import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

class FooterPrimary extends Component{
  render(){
    return(
      <View style={styles.FooterBar}>
        <View style={styles.FooterOption}>
          <Text>A</Text>
        </View>
        <View style={styles.FooterOption}>
          <Text>B</Text>
        </View>
        <View style={styles.FooterOption}>
          <Text>C</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  FooterBar: {
    flexDirection: 'row',

  },
  FooterOption: {
    flexBasis: '33%',
    height: 80,
    textAlign: 'center',
    borderColor: 'blue',
    borderWidth: 1
  }
})

export default FooterPrimary
