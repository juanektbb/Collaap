import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Profile from './Profile'
import Header from 'Collaap/src/components/general/Header'

const Stack = createStackNavigator()

const ProfileStack = () => {

  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          headerTitle: props => <Header {...props} plus={false} navigation={navigation} />
        })}
       />
    </Stack.Navigator>
  )
}

export default ProfileStack
