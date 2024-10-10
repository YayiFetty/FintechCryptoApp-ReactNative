import { Text, Pressable, View } from "react-native";
import React from "react";

interface ButtonOutlineProps {
  title: any;
  action?: () => void;
  children?: React.ReactNode;
}
const ButtonOutline = ({ title, action, children }: ButtonOutlineProps) => {
  return (
    <Pressable
      onPress={action}
      className="border-2 border-neutral-400  rounded-lg justify-center items-center  py-3 flex-row"
    >
      {children  &&  <View>{children}</View>}
      <Text className="text- font-bold text-lg ml-3 ">{title}</Text>
    </Pressable>
  );
};

export default ButtonOutline;
