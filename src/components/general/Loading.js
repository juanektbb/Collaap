import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

const Loading = (props) => {
  return(
    <View style={styles.IndicatorShape}>
      <ActivityIndicator size="large" color={colors.maintone}/>
      <Text style={styles.IndicatorText}>Collaap</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  IndicatorShape: {
    flex: 1,
    justifyContent: "center"
  },
  IndicatorText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    color: colors.secondtone
  }
})

export default Loading
