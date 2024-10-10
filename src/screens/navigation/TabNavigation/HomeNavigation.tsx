import { View, Text } from 'react-native'
import React from 'react'
import {TransitionPresets, createStackNavigator} from "@react-navigation/stack"
import CoinDetailsScreen from '../../stacks/CoinDetailsScreen';
import HomeScreen from '../../tabs/home/HomeScreen';



const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false,
      ...TransitionPresets.SlideFromRightIOS,
      animationEnabled:true,
      gestureEnabled:true,
      gestureDirection:'horizontal',
    }}>

      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name="CoinDetails" component={CoinDetailsScreen} options={{headerShown:false}} />

      </Stack.Navigator>
  )
}

export default HomeNavigation