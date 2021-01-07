import React from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import TabNavigator from '../../components/navigation/tabNavigator'


const HomeScreen = ({Route}) => {
  return (
      <TabNavigator Route={Route} />
  )
}

export default HomeScreen
