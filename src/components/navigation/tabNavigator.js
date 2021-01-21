import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

import Bag from '../bag'
import Favorites from '../Favorites'
import Home from '../home'
import Profile from '../profile'
import Shop from '../shop'
import ProfileNavigation from '../profileNavigation';
import ShopStackScreen from '../shopStackScreen';
import { connect } from 'react-redux';

const Tab = createBottomTabNavigator()

const TabNavigator = (props) => {
    let componentTabNavigator
    if(props.level == 2) {
      componentTabNavigator = 
      <> 
       <Tab.Screen 
            name="Bag" 
            component={Bag}
            options={{
                
                tabBarLabel: 'Bag',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="shopping-bag" color={color} size={size} />
                ),
              }} 
            />
       
               <Tab.Screen 
            name="Favorites"
            component={Favorites} 
            options={{
                tabBarLabel: 'Favorites',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="heart" color={color} size={size} />
                ),
              }} 
            />
            
      </>
    }else{
      componentTabNavigator = 
      <>
      </>
    }
    return (
            <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
            >
            <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home" color={color} size={size} />
                ),
              }}
             />
              <Tab.Screen 
            name="ShopStackScreen" 
            component={ShopStackScreen}
            options={{
                tabBarLabel: 'Shop',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="shopping-cart" color={color} size={size} />
                ),
              }} 
              />
            
              {componentTabNavigator}
             
           
            <Tab.Screen 
            name="ProfileNavigation" 
            component={ProfileNavigation} 
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="user" color={color} size={size} />
                ),
              }} 
            />
        </Tab.Navigator>
    )
}

const mapStateToProps = ({auth}) => {
  return (
    auth
  )
}

export default connect(mapStateToProps)(TabNavigator)
