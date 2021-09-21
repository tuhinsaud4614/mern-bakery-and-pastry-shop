import React from "react";
import { View } from "react-native";
import ProductCard from "../../components/product-card";

const HomeScreen = () => {
  return (
    <View>
      <ProductCard data="product" />
    </View>
  );
};
HomeScreen.displayName = "HomeScreen";
export default HomeScreen;
