import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import Animated, { FadeInDown } from "react-native-reanimated";
import numeral from "numeral";

import Avatar from "@src/components/Avatar";
import { useUserStore } from "store/useUserStore";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { fetchAllCoins } from "../../../../utils/cryptoApi";

interface Coin {
  name: string;
  symbol: string;
  iconUrl: string;
  price: string;
  marketCap: number;
  change: number;
  uuid: string;
}

const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const actionButtons = [
  { name: 'Send to', image: require('../../../../assets/images/money-send.png') },
  { name: 'Request', image: require('../../../../assets/images/money-receive.png') },
  { name: 'Top up', image: require('../../../../assets/images/card-add.png') },
  { name: 'More', image: require('../../../../assets/images/more.png') },
];

const HomeScreen = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [hasFetchedProfile, setHasFetchedProfile] = useState(false);
  const { getUserProfile } = useSupabaseAuth();
  const { session } = useUserStore();
  const navigation = useNavigation();

  const handleGetProfile = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error, status } = await getUserProfile();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error("Error getting profile", error);
    } finally {
      setLoading(false);
    }
  }, [getUserProfile]);

  useFocusEffect(
    useCallback(() => {
      if (session && !hasFetchedProfile) {
        handleGetProfile();
        setHasFetchedProfile(true);  // Prevent further calls
      }
    }, [session, handleGetProfile, hasFetchedProfile])
  );

  const { data: CoinsData, isLoading: isAllCoinsLoading } = useQuery({
    queryKey: ["allCoins"],
    queryFn: fetchAllCoins,
  });

  const renderItem = useCallback(({ item, index }: { item: Coin; index: number }) => (
    <Pressable 
      className="flex-row w-full py-4 px-4 items-center" 
      onPress={() => navigation.navigate("CoinDetails" , { coinUuid: item.uuid } )}
    >
      <Animated.View
        entering={FadeInDown.duration(100).delay(index * 200).springify()}
        className="w-full flex-row items-center"
      >
        <View className="w-[15%]">
          <View className="w-10 h-10">
            <Image
              source={{ uri: item.iconUrl }}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
              className="w-full h-full flex-1"
            />
          </View>
        </View>
        <View className="w-[54%] justify-start items-start">
          <Text className="font-bold text-lg">{item.name}</Text>
          <View className="flex-row justify-center items-center space-x-2">
            <Text>{numeral(parseFloat(item.price)).format("$0,0.00")} </Text>
            <Text
              className={`font-medium text-sm ${
                item.change < 0
                  ? "text-red-600"
                  : item.change > 0
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              {item.change}%
            </Text>
          </View>
        </View>
        <View className="w-[29%] justify-start items-end">
          <Text className="font-bold text-base">{item.symbol}</Text>
          <View className="flex-row justify-center items-center space-x-2">
            <Text className="font-medium text-sm text-neutral-500">
              {numeral(item.marketCap).format('0.0a')}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  ), [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="relative">
          {/* Header */}
          <View className="w-full flex-row justify-between items-center px-4">
            <View className="w-3/4 flex-row space-x-2">
              <View className="justify-center items-center">
                <View className="h-12 w-12 rounded-2xl overflow-hidden">
                  {loading ? (
                    <ActivityIndicator size="small" color="black" />
                  ) : (
                    <Avatar url={avatarUrl} size={50} />
                  )}
                </View>
              </View>
              <View>
                <Text className="text-lg font-bold">
                  {username || "User"}
                </Text>
                <Text className="text-sm text-neutral-500">Have a good day!</Text>
              </View>
            </View>
            <View className="py-6">
              <View className="bg-neutral-700 rounded-lg p-1">
                <Ionicons name="menu" size={25} color="white" />
              </View>
            </View>
          </View>

          {/* Balance */}
          <View className="mx-4 bg-[#011021f6] rounded-[36px] overflow-hidden my-4 px-4">
            <View className="bg-[#01141a] justify-center items-center py-6 rounded-[34px]">
              <Text className="text-white text-sm font-medium">
                Total Balance
              </Text>
              <Text className="text-3xl text-white font-extrabold">
                $542,455.00
              </Text>
            </View>
            <View className="justify-between items-center flex-row py-4">
              {/* Action buttons */}
              {actionButtons.map((action) => (
                <View key={action.name} className="w-1/4 justify-center items-center space-y-2">
                  <View className="w-10 h-10 overflow-hidden bg-red-950 rounded-full p-2">
                    <Image
                      contentFit="cover"
                      transition={1000}
                      className="w-full h-full flex-1"
                      source={action.image}
                    />
                  </View>
                  <Text className="text-white">{action.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Coins */}
          <View className="px-4">
            {isAllCoinsLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={CoinsData?.data?.coins || []}
                keyExtractor={(item) => item.uuid}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;