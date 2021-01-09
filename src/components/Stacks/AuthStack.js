import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Header from 'Collaap/src/components/Base/Header'
import LoginScreen from 'Collaap/src/components/LoginScreen/LoginScreen'
import RegistrationScreen from 'Collaap/src/components/RegistrationScreen/RegistrationScreen'

import colors from 'Collaap/src/data/colors.js'

const Stack = createStackNavigator()

const AuthStack = (props) => {
  return(
    <NavigationContainer>
      <Stack.Navigator       
        screenOptions={{ 
          headerStyle: { 
            elevation: 0,
            shadowColor: 'transparent',
            backgroundColor: colors.ialpha
          } 
        }
      }>

        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ 
              headerShown: false
            }}
        />

        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            // headerTitle: props => <Header />,
            title: "",
            headerBackTitle: "Back",
            headerTintColor: colors.softestgrey,
            headerTruncatedBackTitle: "Back"
          }}
        />
          
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack
