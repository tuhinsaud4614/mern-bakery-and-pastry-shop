import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTheme } from "react-native-paper";
import Container from "../../components/container";
import { TabsNavigationProps } from "../../shared/routes";
import { breakpoints } from "../../shared/utils";
import BannerAndCategory from "./banner-and-category";
import FeaturedProducts from "./featured-products";

const HomeScreen = ({ navigation }: TabsNavigationProps) => {
  const tabBarHeight = useBottomTabBarHeight();
  const isSmUp = breakpoints.up("sm");
  const theme = useTheme();
  return (
    <Container
      contentContainerStyle={
        isSmUp && { paddingTop: tabBarHeight + theme.spacing * 3 }
      }
    >
      <BannerAndCategory />
      <FeaturedProducts />
    </Container>
  );
};
HomeScreen.displayName = "HomeScreen";
export default HomeScreen;
