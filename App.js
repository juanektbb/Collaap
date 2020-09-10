
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import Header from './src/components/Header.js'
import Footer from './src/components/Footer.js'

import Home from './src/screens/Home.js'
import Add from './src/screens/Add.js'
import Note from './src/screens/Note.js'

class App extends Component<Props>{

  render(){
    return(
      <SafeAreaView style={styles.SafeAreaView}>

        <Note />

        <Footer type="primary"/>
      </SafeAreaView>
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
