import React from 'react'

import Header from 'Collaap/src/components/base/Header'
import Profile from 'Collaap/src/components/profile/Profile'

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

const ProfileStack = (props) => {
  return(
    <Stack.Navigator
      screenOptions={{ 
        headerStyle: { 
          elevation: 0,
          borderBottomWidth: 1,
          backgroundColor: "#f8f8f8",
          borderBottomColor: "#ddd"
        } 
      }}>

      <Stack.Screen
        name="Profile"
        children={() => <Profile onSaveProfile={props.onSaveProfile}/>}
        options={({ navigation, route }) => ({
            headerTitle: props => <Header {...props} />,
            headerTitleAlign: 'center'
          })
        }/>
        
    </Stack.Navigator>
  )
}

export default ProfileStack
