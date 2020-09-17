import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

import IconCalendar from 'Collaap/src/images/icon-calendar.png'

class Footer extends Component{
  render(){
    return(
      <View style={styles.Footer}>
        <View style={styles.FooterOption}>
          <Image style={styles.Icon} source={require('Collaap/src/images/icon-all.png')} />
        </View>
        <View style={styles.FooterOption}>
          <Image style={styles.Icon} source={require('Collaap/src/images/icon-calendar.png')} />
        </View>
        <View style={styles.FooterOption}>
          <Image style={styles.Icon} source={require('Collaap/src/images/icon-listing.png')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flex: 1,
    height: 50,
    position: 'absolute',
    bottom: 0
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

export default Footer
