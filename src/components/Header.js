import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text
} from 'react-native';

class Header extends Component{
  render(){
    return(
      <SafeAreaView style={styles.Header}>
        <View style={styles.Logo}>
          <Text>Logo</Text>
        </View>
        <View style={styles.Middle}>
          <Text style={styles.MiddleText}>This is my headerp</Text>
        </View>
        <View style={styles.Plus}>
          <Text style={styles.PlusText}>+</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  Header: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: "#ee6f57",
    borderBottomWidth: 1
  },
  Logo: {
    borderWidth: 1,
    width: 90
  },
  Middle: {
    flex: 1,
    marginHorizontal: 5
  },
  MiddleText: {
    textAlign: "center",
  },
  Plus: {
    width: 50,
  },
  PlusText: {
    fontSize: 50,
    lineHeight: 52,
    textAlign: 'center'
  }
})

export default Header
