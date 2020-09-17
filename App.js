
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native';


import HomeStack from 'Collaap/src/components/home/HomeStack'

import Footer from 'Collaap/src/components/general/Footer.js'

class App extends Component<Props>{

  render(){
    return(
      <NavigationContainer>

        <HomeStack />
        <Footer />

      </NavigationContainer>
      )
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    position: 'relative',
    flex: 1
  },
})

export default App;
