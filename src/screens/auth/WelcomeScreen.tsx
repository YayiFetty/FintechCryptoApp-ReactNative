import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import ButtonOutline from "@src/components/ButtonOutline";
import Buttons from "@src/components/Button";
import Button from "@src/components/Button";
import Breaker from "@src/components/Breaker";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { NavigationProp, useNavigation } from "@react-navigation/native";


const WelcomeScreen = () => {
  const {navigate: navigateAuth}:NavigationProp<AuthNavigationType> = useNavigation();
  return (
    <SafeAreaView className="flex-1 justify-between items-center bg-white">
      <StatusBar style="auto" />
      <View className="w-full px-4 items-center justify-center space-y-6 h-full">
        {/* logo */}
        <View className="w-full px-4 items-center ">
          <Animated.View
          className="flex-row justify-center items-center"
          entering={FadeInRight.duration(100).springify()}>
            <View>
              <View className="w-20 h-20 overflow-hidden">
                <Image source={require("../../../assets/icon.png")}
                contentFit="cover"
                transition={1000}
                className="w-full h-full flex-1"/>
              </View>
            </View>
          </Animated.View>
        </View>
        {/* welcom text */}
        <View className="justify-center items-center">
          <Animated.Text
            entering={FadeInDown.duration(100).delay(200).springify()}
            className="text-neutral-800 text-3xl font-medium leading-[60px] "
            style={{ fontFamily: "PlusJakartaSansBold" }}
          >
            Welcome
          </Animated.Text>
        </View>

        {/* login & signup */}
        <View className="w-full justify-start">
          <Animated.View
          className="pb-6"
            entering={FadeInDown.duration(100).delay(400).springify()}
          >
            <Button title="Log in" action={() => navigateAuth("Login")}/>
            
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(100).delay(400).springify()}
          >
            
            <ButtonOutline title="Sign Up" action={() => navigateAuth("Register")} />
          </Animated.View>
        </View>

        {/* breaker line */}
        <View>
          <Breaker/>
        </View>

        {/* 3rd party auth */}
        <View className="w-full justify-normal">
        <Animated.View
          className="border border-white  pb-4"
            entering={FadeInDown.duration(100).delay(600).springify()}
          >
            <ButtonOutline title="Continue with Google">
              <AntDesign name="google" color="gray" size={20}/>
            </ButtonOutline>
            
          </Animated.View>
        <Animated.View
          className="border border-white  pb-4"
            entering={FadeInDown.duration(100).delay(600).springify()}
          >
            <ButtonOutline title="Continue with Apple">
              <AntDesign name="apple1" color="gray" size={20}/>
            </ButtonOutline>
            
          </Animated.View>
        <Animated.View
          className="border border-white  pb-4"
            entering={FadeInDown.duration(100).delay(600).springify()}
          >
            <ButtonOutline title="Continue with Github">
              <AntDesign name="github" color="gray" size={20}/>
            </ButtonOutline>
            
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
