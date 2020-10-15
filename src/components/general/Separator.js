import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

const Separator = () => <View style={styles.Separator} />

const styles = StyleSheet.create({
  Separator: {
    height: 10,
    backgroundColor: colors.maintone
  }
})

export default Separator
