import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

class Home extends Component{

  render(){
    return(
      <SafeAreaView style={style.Header}>
        <Text>The homes</Text>
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  Header: {
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid"
  }
})

export default Home
