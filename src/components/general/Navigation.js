import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  View,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux'

import HomeStack from 'Collaap/src/components/home/HomeStack'
import ProfileStack from 'Collaap/src/components/profile/ProfileStack'
import NavBarIcon from 'Collaap/src/components/general/NavBarIcon'

const Tabs = createBottomTabNavigator()

function mapStateToProps(state){
  return {
    icon_navigation: state.icon_image,
    session_token: state.session_token
  }
}

const Navigation = props => {
  return(
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions = {{
          showLabel: false
        }}>

        <Tabs.Screen
          name="Profile"
          children={() => <ProfileStack onSaveProfile={props.onSaveProfile}/>}
          options={{
            tabBarIcon: ({focused}) => (
              <NavBarIcon focused={focused} icon_navigation={props.icon_navigation}/>
            )
          }}/>

        {props.session_token !== null &&
          <Tabs.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({focused}) => (
                <NavBarIcon focused={focused} icon_navigation={require('Collaap/src/images/icon-calendar.png')}/>
              )
            }}/>}
      </Tabs.Navigator>
    </NavigationContainer>
  )
}

export default connect(mapStateToProps)(Navigation);
