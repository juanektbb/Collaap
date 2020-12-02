import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
} from 'react-native'

class Header extends Component{
  render(){
    return(
      <View style={styles.Header}>
        <View style={styles.Logo}>
          <Image style={styles.LogoImage} source={require('Collaap/src/images/logo.png')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Header: {
    height: 46,
    marginLeft: -16,
    marginRight: -16,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  Logo: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5
  },
  LogoImage: {
    width: 34,
    height: 34,
  }
})

export default Header
