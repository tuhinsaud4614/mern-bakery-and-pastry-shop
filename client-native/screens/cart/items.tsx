import React from "react";
import { FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { dummyProducts } from "../../dummy-data";
import CartItem from "./item";

const CartItems = () => {
  const theme = useTheme();
  return (
    <FlatList
      showsVerticalScrollIndicator={Platform.OS === "web"}
      data={Array.from({ length: 10 }).map(() => ({
        ...dummyProducts[0],
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tempore ut perspiciatis, sed",
      }))}
      renderItem={({ item }) => (
        <CartItem
          classes={{ root: { marginBottom: theme.spacing * 2.5 } }}
          product={{
            ...dummyProducts[0],
            title:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tempore ut perspiciatis, sed",
          }}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

CartItems.displayName = "Cart.Items";
export default CartItems;
