import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Category from '../shop/category';
import Shop from '../shop';

const Stack = createStackNavigator();

class ShopStackScreen extends Component {
    render() {
        return (
            <Stack.Navigator>
               <Stack.Screen 
                    name='Shop' 
                    component={Shop}
                    options={{
                    headerShown: false,
                }}/>
                <Stack.Screen 
                    name='Category' 
                    component={Category}
                    options={{
                    headerShown: false,
                }}/>
            </Stack.Navigator>
        )
    }
}

export default ShopStackScreen
