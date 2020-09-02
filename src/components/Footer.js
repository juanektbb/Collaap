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
    borderColor: "red",
    borderWidth: 1,
    color: "blue",
    marginTop: 100,
    height: 80,

  }
})

export default Footer
