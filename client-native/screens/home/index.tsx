import React from "react";
import { Button } from "react-native-paper";
import ProductCard from "../../components/product-card";
import ScreenSpacer from "../../components/screen-spacer";
import { TabsNavigationProps } from "../../shared/routes";

const HomeScreen = ({ navigation }: TabsNavigationProps) => {
  return (
    <ScreenSpacer>
      <Button onPress={() => navigation.navigate("Detail")}>Detail</Button>
      <ProductCard data="product" />
    </ScreenSpacer>
  );
};
HomeScreen.displayName = "HomeScreen";
export default HomeScreen;
