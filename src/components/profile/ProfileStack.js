import React from 'react'

import Profile from './Profile'
import Header from 'Collaap/src/components/general/Header'

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

const ProfileStack = (props) => {

  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        children={() => <Profile onSaveProfile={props.onSaveProfile}/>}
        options={({ navigation, route }) => ({
          headerTitle: props => <Header {...props} plus={false} navigation={navigation} />
        })}
       />
    </Stack.Navigator>
  )
}

export default ProfileStack
