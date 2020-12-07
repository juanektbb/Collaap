import React from 'react'
import { View } from 'react-native'

import colors from 'Collaap/src/data/colors.js'

const Separator = (props) => 
  <View style={{
    height: props.height, 
    backgroundColor: colors.ialpha
  }} />

export default Separator
