import React from "react";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";

const TabBarLogo = ({
  onPress,
  image,
}: {
  onPress(): void;
  image: ImageSourcePropType;
}) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Pressable
        onPress={onPress}
        style={{ width: 150, justifyContent: "center" }}
      >
        <Image source={image} resizeMode="center" style={{ height: 40 }} />
      </Pressable>
    </View>
  );
};
TabBarLogo.displayName = "TabBarLogo";
export default TabBarLogo;
