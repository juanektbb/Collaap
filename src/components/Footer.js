import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import FooterPrimary from './FooterPrimary'

const Footer = (props) => {

  if(props.type == 'primary'){
    return (
      <View style={styles.Footer}>
        <FooterPrimary />
      </View>)
  }

}

const styles = StyleSheet.create({
  Footer:{
    flex: 1,
    height: 80,
    position: 'absolute',
    bottom: 0
  }
})

export default Footer
