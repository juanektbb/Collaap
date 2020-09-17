import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './Home'
import AddScreen from 'Collaap/src/components/add/AddScreen'
import NoteScreen from 'Collaap/src/components/add/NoteScreen'

import Header from 'Collaap/src/components/general/Header'

const Stack = createStackNavigator()

const HomeStack = () => {

  return(
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          headerTitle: props => <Header {...props} navigation={navigation} />
        })}
      />

      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
            title: "Add new item"
        }}
      />

      <Stack.Screen
        name="NoteScreen"
        component={NoteScreen}
      />
    </Stack.Navigator>
  )

}

export default HomeStack
