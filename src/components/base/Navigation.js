import React from 'react'
import { connect } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import NavBarIcon from 'Collaap/src/components/Base/NavBarIcon'
import HomeStack from 'Collaap/src/components/Stacks/HomeStack'
import ProfileStack from 'Collaap/src/components/Stacks/ProfileStack'

const Tabs = createBottomTabNavigator()

function mapStateToProps(state){
  return {
    icon_navigation: state.icon_image
  }
}

const Navigation = props => {
  return(
    <NavigationContainer>
      <Tabs.Navigator 
        initialRouteName={"Home"}
        tabBarOptions = {{
          showLabel: false,
          style: {
            elevation: 0,
          }
        }}>

        <Tabs.Screen
          name="Profile"
          children={() => <ProfileStack/>}
          options={{
            tabBarIcon: ({focused}) => (
              <NavBarIcon focused={focused} icon_navigation={props.icon_navigation}/>
            )
          }}
        />

        <Tabs.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused}) => (
              <NavBarIcon focused={focused} icon_navigation={require('Collaap/src/images/icon-calendar.png')}/>
            )
          }}
        />

      </Tabs.Navigator>
    </NavigationContainer>
  )
}

export default connect(mapStateToProps)(Navigation)
