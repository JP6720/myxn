import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Home from './src/components/Home';
import Reset from './src/components/Reset';

const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Home: Home,
    Reset: Reset,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#4958db',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <RootContainer />
  )
}