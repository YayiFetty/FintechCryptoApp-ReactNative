import React, { useState } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import AuthNavigation from './AuthNavigation';
import { useUserStore } from   'store/useUserStore'

const Stack = createStackNavigator();

const RootNavigation = () => {
  // const { session } = useUserStore();
  const [session, setSession] = useState(true)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
        {session? (
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        ) : (
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;