import React from 'react';
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/splash';
import Login from './src/screens/auth/login';


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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default appRouter