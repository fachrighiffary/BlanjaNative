import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../profile';
import MyOrder from '../profile/myOrder';
import ShippingAddress from '../profile/shipAddress';
import Setting from '../profile/setting';

const Stack = createStackNavigator();

export class ProfileNavigation extends Component {
    render() {
        return (
            <Stack.Navigator>
               <Stack.Screen 
                name='Profile' 
                component={Profile}
                options={{
                headerShown: false,
                }}/>
                <Stack.Screen 
                name='MyOrder' 
                component={MyOrder}
                options={{
                headerShown: false,
                }}/>
                <Stack.Screen 
                name='ShippingAddress' 
                component={ShippingAddress}
                options={{
                headerShown: false,
                }}/>
                <Stack.Screen 
                name='Setting' 
                component={Setting}
                options={{
                headerShown: false,
                }}/>
            </Stack.Navigator>
        )
    }
}

export default ProfileNavigation
