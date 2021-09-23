import React from "react";
import ProductCard from "../../components/product-card";
import ScreenSpacer from "../../components/screen-spacer";

const HomeScreen = () => {
  return (
    <ScreenSpacer>
      <ProductCard data="product" />
    </ScreenSpacer>
  );
};
HomeScreen.displayName = "HomeScreen";
export default HomeScreen;
