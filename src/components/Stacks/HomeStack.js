import React from 'react'
import { Platform } from 'react-native'

import Header from 'Collaap/src/components/Base/Header'
import HeaderPlus from 'Collaap/src/components/Base/HeaderPlus'
import HomeScreen from 'Collaap/src/components/HomeScreen/HomeScreen'
import NewScreen from 'Collaap/src/components/NewScreen/NewScreen'
import NoteScreen from 'Collaap/src/components/NoteScreen/NoteScreen'

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import colors from 'Collaap/src/data/colors.js'

const HomeStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{ 
        headerStyle: { 
          elevation: 0,
          shadowColor: 'transparent',
          backgroundColor: colors.ialpha
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
          title: "New item",
          headerBackTitle: "Back",
          headerTintColor: colors.igamma,
          headerTruncatedBackTitle: "Back"
        }}
      />

      <Stack.Screen
        name="NewItemScreen"
        component={NoteScreen}
        options={{
          title: "Untitled item",
          headerBackTitle: "Back",
          headerTintColor: colors.igamma,
          headerTruncatedBackTitle: "Back"
        }}
      />
      
    </Stack.Navigator>
  )
}

export default HomeStack
