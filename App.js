
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';

import Header from './src/components/Header.js'
import Footer from './src/components/Footer.js'

import Home from './src/screens/Home.js'

class App extends Component<Props>{



  render(){
    return(
      <SafeAreaView style={styles.SafeAreaView, {flex: 1}}>

        <Header />



        <Home />


        <View style={styles.Footer}>
          <Footer type="primary"/>
        </View>


      </SafeAreaView>
      )
  }
}

const contentHeight = Dimensions.get('window').height - 80 - 60 - 24

const styles = StyleSheet.create({
  SafeAreaView: {
    position: 'relative',
  },
  Content: {
    // height: contentHeight
  },
  Footer: {
    borderWidth: 2,
    position: 'absolute',
    bottom: 0

  }
})

export default App;
