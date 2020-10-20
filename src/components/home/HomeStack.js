import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './Home'
import NewScreen from 'Collaap/src/components/add/NewScreen'
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
          headerTitle: props => <Header {...props} plus={true} navigation={navigation} />
        })}
      />

      <Stack.Screen
        name="NewScreen"
        component={NewScreen}
        options={{
          title: "New Item"
        }}
      />

      <Stack.Screen
        name="NewItemScreen"
        component={NoteScreen}
        options={{
          title: "Untitled Item"
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
