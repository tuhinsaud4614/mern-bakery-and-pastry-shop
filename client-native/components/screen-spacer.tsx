import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { breakpoints } from "../shared/utils";

const ScreenSpacer = ({ children }: { children?: ReactNode }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const theme = useTheme();
  const isSmUp = breakpoints.up("sm");

  return (
    <View
      style={{
        flex: 1,
        ...(isSmUp && { paddingTop: tabBarHeight + theme.spacing }),
      }}
    >
      {children}
    </View>
  );
};
ScreenSpacer.displayName = "ScreenSpacer";
export default ScreenSpacer;
