import React from 'react'
import {
  View,
  Image,
  StyleSheet
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

const NavBarIcon = (props) => {
  return(
    <View style={styles.normalTab}>
      <Image style={{width: 34, height: 34}} source={props.icon_navigation} />
      <View style={[styles.littleBall, (props.focused && styles.activeTab)]} />
    </View>
  )
}

const styles = StyleSheet.create({
  normalTab: {
    height: 42,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "space-between"
  },
  littleBall: {
    width: 10,
    height: 10,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
  activeTab: {
    borderColor: colors.igamma,
    backgroundColor: colors.igamma
  }
})

export default NavBarIcon
