import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../profile';
import MyOrder from '../profile/myOrder';
import ShippingAddress from '../profile/shipAddress';
import Setting from '../profile/setting';
import EditAddress from '../profile/EditAddress';
import AddAddress from '../profile/AddAddress';

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
                />
                <Stack.Screen 
                name='EditAddress' 
                component={EditAddress}
                />
                <Stack.Screen 
                name='AddAddress' 
                component={AddAddress}
                />
                <Stack.Screen 
                name='Setting' 
                component={Setting}
                options={{
                headerShown: false,
                }}
                />
            </Stack.Navigator>
        )
    }
}

export default ProfileNavigation