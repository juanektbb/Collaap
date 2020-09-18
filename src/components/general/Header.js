import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable
} from 'react-native';

import colors from 'Collaap/src/data/colors.js'

class Header extends Component{

  openAddScreen = () => {
    this.props.navigation.navigate("AddScreen")
  }

  render(){
    return(
      <View style={styles.Header}>
        <View style={styles.Logo}>
          <Image style={styles.LogoImage} source={require('Collaap/src/images/logo.png')} />
        </View>
        <Pressable onPress={this.openAddScreen}>
          <View style={styles.Plus}>
            <Text style={styles.PlusText}>+</Text>
          </View>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: colors.sexyred,
    borderBottomWidth: 1,
    borderColor: colors.wine,
    marginLeft: -16,
    marginRight: -16
  },
  Logo: {
    width: 90
  },
  LogoImage: {
    width: 90,
    height: 60
  },
  Plus: {
    width: 36,
  },
  PlusText: {
    fontSize: 36,
    lineHeight: 50,
    textAlign: 'center',
    color: colors.softwhite
  }
})

export default Header
