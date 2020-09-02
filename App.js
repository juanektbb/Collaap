
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import Header from './src/components/Header.js'
import Home from './src/screens/Home.js'

import CalendarPrimary from './src/components/CalendarPrimary.js'
import CalendarSubsection from './src/components/CalendarSubsection.js'

import Footer from './src/components/Footer.js'

class App extends Component<Props>{
  render(){
    return(
      <SafeAreaView style={styles.SafeAreaView}>
        <Header />


        <CalendarPrimary />
        <CalendarSubsection />

        <Footer type="primary"/>
      </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    position: 'relative',
    borderColor: 'green',
    borderWidth: 2
  },
  Footer: {
    position: 'absolute',
    bottom: 0
  }
})

export default App;
