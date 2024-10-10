import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import Animated, { FadeInRight } from "react-native-reanimated";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
const SplashScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { navigate }: NavigationProp<SpalshNavigationType> = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate( 'Welcome');
    }, 2000);
  }, []);
  const blurhash = "L5H2EC=PM+yV0g-mq.wG9c010J}I";
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <StatusBar style="auto" />
      <View className="w-full px-4 items-center">
        <Animated.View className="flex-row justify-center items-center" entering={FadeInRight.duration(100).springify()} >
          <View className="pr-2">
            <View className="w-20 h-20 overflow-hidden">
              <Image
                source={require("../../../assets/images/logo.png")}
                contentFit="cover"
                placeholder={{ blurhash }}
                transition={2000}
                className="w-full h-full flex-1"
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View className="flex-row justify-center items-center" entering={FadeInRight.duration(100).delay(200).springify()}>
          <Text className="text-xl font-bold text-neutral-600 leading[60px] pl-1">STACKS</Text>
          <Text className="text-xl font-bold text-[#31aca3] leading[60px] pl-1" style={{fontFamily:"PlusJakartaSansBoldItalic"}}>CRYPTO</Text>
        </Animated.View>
      </View>
      
    </SafeAreaView>
  );
};

export default SplashScreen;
