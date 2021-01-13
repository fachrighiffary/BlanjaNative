import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllCategory from  '../shop/allCategory';
import Men from '../shop/men';
import Kids from '../shop/kids';

const Tab = createMaterialTopTabNavigator();

const ShopNavigation = () => {
    return (
        <Tab.Navigator color="red">
            <Tab.Screen name="All Category" component={AllCategory} />
            <Tab.Screen name="Men" component={Men}  />
            <Tab.Screen name="Kids" component={Kids}  />
        </Tab.Navigator>
    )
}

export default ShopNavigation
