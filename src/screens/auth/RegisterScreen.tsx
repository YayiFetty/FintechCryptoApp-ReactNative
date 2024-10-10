import { supabase } from "lib/supabase";
import Breaker from "@src/components/Breaker";
import Button from "@src/components/Button";
import ButtonOutline from "@src/components/ButtonOutline";
import { AntDesign } from "@expo/vector-icons";
import {
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { height } = Dimensions.get("window");

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { navigate: navigateAuth }: NavigationProp<AuthNavigationType> =
    useNavigation();

  // To register a new user
  async function signUpWithEmail() {
    setIsLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setIsLoading(false)
  }

  return (
    <View className="flex-1">
      {isLoading && (
        <View className="absolute z-50 h-full w-full justify-center items-center">
          <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]"></View>
          <View className="absolute">
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      )}

      <View className="justify-center items-center relative flex-1">
        <View
          className="justify-center w-full px-4 space-y-4"
          style={{ height: height * 0.75 }}
        >
          {/* Welcome text */}
          <Animated.View
            className="justify-center items-center"
            entering={FadeInDown.duration(100).springify()}
          >
            <Text
              className="text-neutral-600 text-2xl leading=[60px] mb-5"
              style={{ fontFamily: "PlusJakartaSansBold" }}
            >
              Register to join us
            </Text>
            <Text className="text-neutral-500 text-sm font-medium">
              Welcome Back! Please enter your details
            </Text>
          </Animated.View>

          {/* Email & Password input */}
          <View>
            <Animated.View
              className="py-8 space-y-8"
              entering={FadeInDown.duration(100).delay(200).springify()}
            >
              {/* Email input */}
              <View className="border-2 border-gray-400 rounded-lg">
                <TextInput
                  className="p-4"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="Email"
                  placeholderTextColor="grey"
                  autoCapitalize="none"
                />
              </View>

              {/* Password input */}
              <View className="border-2 border-gray-400 rounded-lg">
                <TextInput
                  className="p-4"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  placeholder="Password"
                  placeholderTextColor="grey"
                />
              </View>
            </Animated.View>
          </View>

          {/* Register button */}
          <Animated.View
            className="w-full justify-start"
            entering={FadeInDown.duration(100).delay(300).springify()}
          >
            <Button title="Register" action={() => signUpWithEmail()} />
          </Animated.View>

          {/* Breaker line */}
          <View>
            <Breaker />
          </View>

          {/* Third-party auth options */}
          <View className="w-full justify-normal">
            <Animated.View
              className="border border-white  pb-4"
              entering={FadeInDown.duration(100).delay(600).springify()}
            >
              <ButtonOutline title="Continue with Google">
                <AntDesign name="google" color="gray" size={20} />
              </ButtonOutline>
            </Animated.View>
            <Animated.View
              className="border border-white  pb-4"
              entering={FadeInDown.duration(100).delay(600).springify()}
            >
              <ButtonOutline title="Continue with Apple">
                <AntDesign name="apple1" color="gray" size={20} />
              </ButtonOutline>
            </Animated.View>
            <Animated.View
              className="border border-white  pb-4"
              entering={FadeInDown.duration(100).delay(600).springify()}
            >
              <ButtonOutline title="Continue with Github">
                <AntDesign name="github" color="gray" size={20} />
              </ButtonOutline>
            </Animated.View>
          </View>

          {/* Already have an account? */}
          <Animated.View className="flex-row  justify-center items-center space-x-2">
            <Text
              className="text-neutral-500 text-lg font-medium loadiing-[138px]"
              style={{ fontFamily: "PlusJakartaSansMedium" }}
            >
              Have an Account?
            </Text>

            <Pressable onPress={() => navigateAuth("Login")}>
              <Text
                className="text-neutral-500 text-lg font-medium loadiing-[138px]"
                style={{ fontFamily: "PlusJakartaSansBold" }}
              >
                Login
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
