import { Text, Pressable } from 'react-native'
import React from 'react'

interface ButtonProps {
  title:any;
  action?: () => void
}
const Button = ({title,action}:ButtonProps) => {

  return (
    <Pressable onPress={action} className='bg-[#2ab47c] rounded-lg justify-center items-center py-3 ' >
    <Text className='text-white font-bold text-lg '>{title}</Text>
    </Pressable>
  )

}

export default Button