import React, { Component } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'
import helpers from 'Collaap/src/shared/helpers.js'

class HeaderPlus extends Component{

  openNewScreen = () => {
    this.props.navigation.navigate('NewScreen', { open_date: helpers.getToday() })
  }

  render(){
    return(
      <Pressable onPress={this.openNewScreen}>
        <View style={styles.Plus}>
          <Text style={styles.PlusText}>+</Text>
        </View>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  Plus: {
    flex: 1,
    width: 46,
    alignItems: 'center',
    justifyContent: "center"
  },
  PlusText: {
    fontSize: 40,
    lineHeight: 46,
    textAlign: 'center',
    color: colors.softestgrey
  }
})

export default HeaderPlus
