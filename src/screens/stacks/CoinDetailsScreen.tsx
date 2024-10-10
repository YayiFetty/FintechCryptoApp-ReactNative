import { View, Text } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the type for your route params
type RootStackParamList = {
  CoinDetails: {
    coinUuid: string;
    HomeS:undefined;
  };
};

// Define the type for the route prop
type CoinDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CoinDetails'>;

const CoinDetailsScreen = () => {
  // Use the route prop with the defined type
  const route = useRoute<CoinDetailsScreenRouteProp>();
  const { coinUuid } = route.params;

  return (
    <SafeAreaView>
      <View>
        <Text> CoinDetailsScreen {coinUuid}</Text>
      </View>
    </SafeAreaView>
  );
};
 

export default CoinDetailsScreen;
