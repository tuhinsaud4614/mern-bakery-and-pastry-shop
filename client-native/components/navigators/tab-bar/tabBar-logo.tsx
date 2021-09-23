import React from "react";
import { Image, Pressable, View } from "react-native";

const TabBarLogo = ({ onPress }: { onPress(): void }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Pressable
        onPress={onPress}
        style={{ width: 150, justifyContent: "center" }}
      >
        <Image
          source={{ uri: require("../../../assets/logo.svg") }}
          resizeMode="center"
          style={{ height: 40 }}
        />
      </Pressable>
    </View>
  );
};
TabBarLogo.displayName = "TabBarLogo";
export default TabBarLogo;
