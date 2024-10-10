import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeInRight } from 'react-native-reanimated'

const Breaker = () => {
  return (
    <Animated.View
    className="flex-row justify-center items-center  w-full"
    entering={FadeInRight.duration(100).delay(500).springify()}>
      <View className='h-10 w-[40%] justify-center items-center' >
        <View className='border-t-2 border-gray-400 w-full'/>
        </View>

        <View className='w-[18%] justify-center items-center'>
            <Text className='text-base text-neutral-500'>Or</Text>
        </View>
      
        <View className='h-10 w-[40%] justify-center items-center' >
        <View className='border-t-2 border-gray-400 w-full'/>
        </View>

    </Animated.View>
  )
}

export default Breaker