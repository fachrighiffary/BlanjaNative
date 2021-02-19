import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '.';
import Notification from './notification';

const Stack = createStackNavigator();

export class HomeStackScreen extends Component {
    render() {
        return (
           <Stack.Navigator>
               <Stack.Screen 
                name='Home' 
                component={Home}
                options={{
                headerShown: false,
                }}/>
                <Stack.Screen 
                name='Notification' 
                component={Notification}
                options={{
                headerShown: false,
                }}/>
           </Stack.Navigator>
        )
    }
}

export default HomeStackScreen
