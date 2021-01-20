import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Category from '../shop/category';
import Shop from '../shop';
import FilterProduct from '../shop/filterProduct';
import FilterData from '../shop/filter';
import SearchProduct from '../shop/searchProduct';

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
                 <Stack.Screen 
                    name='FilterProduct' 
                    component={FilterProduct}
                />
                <Stack.Screen 
                    name='FilterData' 
                    component={FilterData}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name='SearchProduct' 
                    component={SearchProduct}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        )
    }
}

export default ShopStackScreen
