import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

import IconCalendar from '../images/icon-calendar.png'

class FooterPrimary extends Component{
  render(){
    return(
      <View style={styles.FooterBar}>
        <View style={styles.FooterOption}>
          <Image style={styles.Icon} source={require('../images/icon-all.png')} />
        </View>
        <View style={styles.FooterOption}>
          <Image style={styles.Icon} source={require('../images/icon-calendar.png')} />
        </View>
        <View style={styles.FooterOption}>
          <Image style={styles.Icon} source={require('../images/icon-listing.png')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  FooterBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  FooterOption: {
    flexBasis: '33.33%',
    height: 50,
    textAlign: 'center',
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: 'center',
  },
  Icon: {
    height: 48,
    marginHorizontal: "auto"
  }
})

export default FooterPrimary
