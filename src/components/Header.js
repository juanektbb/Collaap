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
      <SafeAreaView style={style.Header}>
        <Text>This is my headerp</Text>
        <View style={style.Plus}>
          <Text>+</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  Header: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'green',
    borderWidth: 1,
    height: 60
  },
  Plus: {
    borderColor: 'blue',
    borderWidth: 1,
    width: 50,
  }
})

export default Header
