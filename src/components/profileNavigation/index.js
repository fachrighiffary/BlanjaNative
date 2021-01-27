import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../profile';
import MyOrder from '../profile/order/myOrder';
import ShippingAddress from '../profile/address/shipAddress';
import Setting from '../profile/setting';
import EditAddress from '../profile/address/EditAddress';
import AddAddress from '../profile/address/AddAddress';
import MyProduct from '../profile/product/MyProduct';
import AddProduct from '../profile/product/AddProduct';
import EditProduct from '../profile/product/EditProduct';
import OrderDetail from '../profile/order/orderDetail';

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
                 <Stack.Screen 
                name='MyProduct' 
                component={MyProduct}
                options={{
                headerShown: false,
                }}
                />
                <Stack.Screen 
                name='AddProduct' 
                component={AddProduct}
                options={{
                headerShown: false,
                }}
                />
                <Stack.Screen 
                name='EditProduct' 
                component={EditProduct}
                options={{
                headerShown: false,
                }}
                />
                <Stack.Screen 
                name='OrderDetail' 
                component={OrderDetail}
                options={{
                headerShown: false,
                }}
                />
            </Stack.Navigator>
        )
    }
}




export default ProfileNavigation
