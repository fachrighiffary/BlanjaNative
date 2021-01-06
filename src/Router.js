import React from 'react';
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';


import Splash from './screens/splash';
import Login from './screens/auth/login';
import Register from './screens/auth/register';
import ForgotPassword from './screens/auth/forgotPassword';
import Homescreen from './screens/homescreen';
import DetailProduct from './screens/detail';


const Stack = createStackNavigator();

const appRouter = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='Splash' 
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
        name="HomeScreen"
        component={Homescreen}
        options = {{
          headerShown :false
        }} />
        <Stack.Screen
        name="Detail"
        component={DetailProduct}
        options = {{
          headerShown :false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default appRouter