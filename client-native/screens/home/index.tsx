import React from "react";
import { Button } from "react-native-paper";
import ProductCard from "../../components/product-card";
import ScreenSpacer from "../../components/screen-spacer";
import { dummyProducts } from "../../dummy-data";
import { TabsNavigationProps } from "../../shared/routes";

const HomeScreen = ({ navigation }: TabsNavigationProps) => {
  return (
    <ScreenSpacer>
      <Button
        onPress={() =>
          navigation.navigate("Detail", {
            categoryId: dummyProducts[0].category.id,
            productId: dummyProducts[0].id,
            title: dummyProducts[0].title,
          })
        }
      >
        Detail
      </Button>
      <ProductCard data={dummyProducts[0]} />
    </ScreenSpacer>
  );
};
HomeScreen.displayName = "HomeScreen";
export default HomeScreen;
