import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import { useTheme } from "react-native-paper";
import { breakpoints } from "../shared/utils";
import Container from "./container";

const TabScreenWrapper = ({
  component,
  children,
  bounces,
}: {
  component?: "flat-list" | "scroll-view";
  bounces?: boolean;

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
      bounces={bounces}
      component={component}
    >
      {children}
    </Container>
  );
};
TabScreenWrapper.displayName = "Tab";
export default TabScreenWrapper;
