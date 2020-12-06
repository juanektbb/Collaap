import React, { Component } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

class HeaderPlus extends Component{

  openNewScreen = () => {
    this.props.navigation.navigate('NewScreen')
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
    width: 46,
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  PlusText: {
    fontSize: 40,
    lineHeight: 46,
    textAlign: 'center',
    color: colors.igamma
  }
})

export default HeaderPlus
