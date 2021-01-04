import React from 'react';
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';


import Splash from './screens/splash';
import Login from './screens/auth/login';
import Register from './screens/auth/register';
import ForgotPassword from './screens/auth/forgotPassword';
import Home from './screens/home';


const Stack = createStackNavigator();

const appRouter = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='Splah' 
        component={Splash}
        options={{
          headerShown: false,
        }}/>
        <Stack.Screen
        name="Login"
        component={Login}
        options = {{
          headerShown :false
        }} />
        <Stack.Screen
        name="Register"
        component={Register}
        options = {{
          headerShown :false
        }} />
        <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options = {{
          headerShown :false
        }} />
        <Stack.Screen
        name="Home"
        component={Home}
        options = {{
          headerShown :false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default appRouter