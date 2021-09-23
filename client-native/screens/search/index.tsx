import React from "react";
import ProductCard from "../../components/product-card";
import ScreenSpacer from "../../components/screen-spacer";

const SearchScreen = () => {
  return (
    <ScreenSpacer>
      <ProductCard data="product" />
    </ScreenSpacer>
  );
};
SearchScreen.displayName = "SearchScreen";
export default SearchScreen;
