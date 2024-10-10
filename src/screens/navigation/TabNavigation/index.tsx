import { View, Text } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNavigation from './HomeNavigation'
import MarketNavigation from './MarketNavigation'
import ProfileNavigation from './ProfileNavigation'
import SearchNavigation from './SearchNavigation'
import NewsNavigation from './NewsNavigation'
import { Ionicons } from '@expo/vector-icons'
import { TransitionPresets } from '@react-navigation/stack'

const Tab = createBottomTabNavigator()
const TabNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if(route.name === "Home"){
          iconName = "home"
        }
        else if(route.name === "Market"){
          iconName = "stats-chart-outline"
        }
        else if(route.name === "Search"){
          iconName = "search-outline"
        }
        else if(route.name === "News"){
          iconName = "newspaper-outline"
        }
        else if(route.name === "Profile"){
          iconName = "person-outline"
        }

        const customSize = 25;

        return(
          <Ionicons name={iconName} size={customSize} color={focused ? "#164b48" : "gray"} />
        )
      },
      tabBarActiveTintColor: "#164b48",
      tabBarInactiveTintColor: "gray",
      tabBarShowLabel:{
        fontSize:12,
        fontWeight:"bold"
      },
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
    })}>
        <Tab.Screen name="Home" component={HomeNavigation} />
        <Tab.Screen name ="Market" component={MarketNavigation} />
        <Tab.Screen name="Search" component={SearchNavigation} />
        <Tab.Screen name="News" component={NewsNavigation} />
        <Tab.Screen name="Profile" component={ProfileNavigation} />
       
      </Tab.Navigator>
  )
}

export default TabNavigation