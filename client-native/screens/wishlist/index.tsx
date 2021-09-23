import React from "react";
import ProductCard from "../../components/product-card";
import ScreenSpacer from "../../components/screen-spacer";

const WishlistScreen = () => {
  return (
    <ScreenSpacer>
      <ProductCard data="product" />
    </ScreenSpacer>
  );
};
WishlistScreen.displayName = "WishlistScreen";
export default WishlistScreen;
