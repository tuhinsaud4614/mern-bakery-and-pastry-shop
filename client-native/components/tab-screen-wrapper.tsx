import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import { useTheme } from "react-native-paper";
import { breakpoints } from "../shared/utils";
import Container from "./container";

const TabScreenWrapper = ({
  keyBoardAvoiding = false,
  children,
}: {
  keyBoardAvoiding?: boolean;
  children?: ReactNode;
}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const isSmUp = breakpoints.up("sm");
  const theme = useTheme();

  return (
    <Container
      contentContainerStyle={
        !!tabBarHeight &&
        isSmUp && { paddingTop: tabBarHeight + theme.spacing * 3 }
      }
      keyBoardAvoiding={keyBoardAvoiding}
    >
      {children}
    </Container>
  );
};
TabScreenWrapper.displayName = "Tab";
export default TabScreenWrapper;
