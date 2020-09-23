
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView
} from 'react-native';


import HomeStack from 'Collaap/src/components/home/HomeStack'
import ProfileStack from 'Collaap/src/components/profile/ProfileStack'


const Tabs = createBottomTabNavigator()

class App extends Component<Props>{

  render(){
    return(
      <NavigationContainer>
        <Tabs.Navigator
          options={{
            tintColor: "red",
            style: {
              backgroundColor: "#ff0000"
            },

          }}
          tabBarOptions = {{
            showLabel: false
        }}
        >

        <Tabs.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image style={{width: 30, height: 30}} source={require('Collaap/src/images/icon-profile.png')} />
            )
          }}
        />

          <Tabs.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({size, color}) => (
                <Image style={{width: 30, height: 30}} source={require('Collaap/src/images/icon-calendar.png')} />
              )
            }}
          />


        </Tabs.Navigator>
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
