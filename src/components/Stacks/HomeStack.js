import React from 'react'
import { Platform } from 'react-native'

import Header from 'Collaap/src/components/Base/Header'
import HeaderPlus from 'Collaap/src/components/Base/HeaderPlus'
import HomeScreen from 'Collaap/src/components/HomeScreen/HomeScreen'
import NewScreen from 'Collaap/src/components/NewScreen/NewScreen'
import NoteScreen from 'Collaap/src/components/NoteScreen/NoteScreen'

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
        component={HomeScreen}
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
