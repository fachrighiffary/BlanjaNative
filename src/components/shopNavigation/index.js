import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Women from '../shop/women';
import Men from '../shop/men';
import Kids from '../shop/kids';

const Tab = createMaterialTopTabNavigator();

const ShopNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Women" component={Women} />
            <Tab.Screen name="Men" component={Men}  />
            <Tab.Screen name="Kids" component={Kids}  />
        </Tab.Navigator>
    )
}

export default ShopNavigation
