import React from "react";
import { ImageSourcePropType, Pressable, View } from "react-native";
import Logo from "../../logo";

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
        style={{ width: 150, justifyContent: "center", height: 40 }}
      >
        <Logo />
      </Pressable>
    </View>
  );
};
TabBarLogo.displayName = "TabBarLogo";
export default TabBarLogo;
