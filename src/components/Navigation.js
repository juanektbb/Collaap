import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Image } from 'react-native';
import { connect } from 'react-redux'

import HomeStack from 'Collaap/src/components/home/HomeStack'
import ProfileStack from 'Collaap/src/components/profile/ProfileStack'

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
        options={{
          tintColor: "red",
          style: {
            backgroundColor: 'red'
          },
        }}
        tabBarOptions = {{
          showLabel: false
        }}>

        <Tabs.Screen
          name="Profile"
          children={() => <ProfileStack onSaveProfile={props.onSaveProfile}/>}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image style={{width: 34, height: 34}} source={props.icon_navigation} />
            )
          }}/>

        {props.session_token !== null &&
          <Tabs.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({size, color}) => (
                <Image style={{width: 34, height: 34}} source={require('Collaap/src/images/icon-calendar.png')} />
              )
            }}/>}
      </Tabs.Navigator>
    </NavigationContainer>
  )
}

export default connect(mapStateToProps)(Navigation);
