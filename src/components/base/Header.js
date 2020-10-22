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

  openNewScreen = () => {
    this.props.navigation.navigate("NewScreen")
  }

  render(){
    return(
      <View style={styles.Header}>
        <View style={styles.Logo}>
          <Image style={styles.LogoImage} source={require('Collaap/src/images/logo.png')} />
          <Text style={styles.LogoText}>Collaap</Text>
        </View>
        {this.props.plus &&
          <Pressable onPress={this.openNewScreen}>
            <View style={styles.Plus}>
              <Text style={styles.PlusText}>+</Text>
            </View>
          </Pressable>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Header: {
    height: 56,
    marginLeft: -16,
    marginRight: -16,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.maintone,
  },
  Logo: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5
  },
  LogoImage: {
    width: 34,
    height: 34,
    borderWidth: 1
  },
  LogoText: {
    color: colors.softwhite,
    fontSize: 26,
    fontFamily: "HKGrotesk-Regular"
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
