import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

const Separator = () => <View style={styles.Separator} />

const styles = StyleSheet.create({
  Separator: {
    height: 2,
    backgroundColor: colors.maintone,
    elevation: 3
  }
})

export default Separator
