import React from "react";
import ProductCard from "../../components/product-card";
import ScreenSpacer from "../../components/screen-spacer";

const UserScreen = () => {
  return (
    <ScreenSpacer>
      <ProductCard data="product" />
    </ScreenSpacer>
  );
};
UserScreen.displayName = "UserScreen";
export default UserScreen;
