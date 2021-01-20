import React from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import Router from './src/Router'
import store from './src/public/redux/store'

const App = () => {
       return (
              <Provider store={store}>
                     <Router />
              </Provider>
       )
}

export default App
