import React from 'react'

import Header from 'Collaap/src/components/Base/Header'
import ProfileScreen from 'Collaap/src/components/ProfileScreen/ProfileScreen'

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import colors from 'Collaap/src/data/colors.js'

const ProfileStack = (props) => {
  return(
    <Stack.Navigator
      screenOptions={{ 
        headerStyle: { 
          elevation: 0,
          shadowColor: 'transparent',
          backgroundColor: colors.ialpha,
        } 
      }}>

      <Stack.Screen
        name="Profile"
        children={() => <ProfileScreen />}
        options={({ navigation, route }) => ({
            headerTitle: props => <Header {...props} />,
            headerTitleAlign: 'center'
          })
        }/>
        
    </Stack.Navigator>
  )
}

export default ProfileStack
