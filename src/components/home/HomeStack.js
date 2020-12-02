import React from 'react'
import { Platform } from 'react-native'

import Header from 'Collaap/src/components/base/Header'
import HeaderPlus from 'Collaap/src/components/base/HeaderPlus'
import Home from 'Collaap/src/components/home/Home'
import NewScreen from 'Collaap/src/components/add/NewScreen'
import NoteScreen from 'Collaap/src/components/add/NoteScreen'

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

const HomeStack = () => {
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
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          headerTitle: props => <Header {...props}   />,
          headerRight: props => <HeaderPlus navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />

      <Stack.Screen
        name="NewScreen"
        component={NewScreen}
        options={{
          title: "New Note",
          headerBackTitle: "Back",
          headerTruncatedBackTitle: "Back"
        }}
      />

      <Stack.Screen
        name="NewItemScreen"
        component={NoteScreen}
        options={{
          title: "Untitled Note",
          headerBackTitle: "Back",
          headerTruncatedBackTitle: "Back"
        }}
      />
      
    </Stack.Navigator>
  )
}

export default HomeStack
