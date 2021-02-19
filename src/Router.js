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
import Checkout from './components/bag/checkout';
import ShippingAddress from './components/bag/shipaddress';
import Success from './components/bag/success';
import RatingReview from './components/ratingReview';
import GetOtp from './screens/auth/getOtp';
import CheckOtp from './screens/auth/checkOtp';
import ResetPassword from './screens/auth/resetPassword';
import ListChat from './components/profile/listChat';
import ChatRoom from './components/profile/chatRoom';
import { SocketProvider } from './public/context/SocketProvider';
import {useSelector} from 'react-redux'


const Stack = createStackNavigator();

const Router = () => {
  const user_id = useSelector((state) => state.auth.id)
  return(
    <SocketProvider id={user_id}>
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
        name="getOtp"
        component={GetOtp}
        options = {{
          headerShown :false
        }} />
        <Stack.Screen
        name="checkOtp"
        component={CheckOtp}
        options = {{
          headerShown :false
        }} />
        <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
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
        <Stack.Screen
        name="Checkout"
        component={Checkout}
       />
       <Stack.Screen
        name="ShippingAddress"
        component={ShippingAddress}
       />
       <Stack.Screen
        name="Success"
        component={Success}
        options = {{
          headerShown :false
        }} />
         <Stack.Screen
        name="RatingReview"
        component={RatingReview}
        options = {{
          headerShown :false
        }} />
        <Stack.Screen
        name="listChat"
        component={ListChat}
        options = {{
          headerShown :false
        }} />
        <Stack.Screen
        name="chatRoom"
        component={ChatRoom}
        options = {{
          headerShown :false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </SocketProvider>
  )
}

export default Router