import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          PlusJakartaSans: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
          PlusJakartaSansExtrabold: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
          PlusJakartaSansBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
          PlusJakartaSansBoldItalic: require('../assets/fonts/PlusJakartaSans-BoldItalic.ttf'),
          PlusJakartaSansMedium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
          PlusJakartaSansMediumItalic: require('../assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
