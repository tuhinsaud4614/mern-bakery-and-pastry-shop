import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { dummyProducts } from "../../dummy-data";
import CartItem from "./item";

const CartItems = () => {
  const theme = useTheme();
  //   const styles = makeStyles(theme);
  return (
    <View>
      {Array.from({ length: 10 }).map((_, index) => (
        <CartItem
          key={index}
          classes={{
            root: index !== 9 && { marginBottom: theme.spacing * 2.5 },
          }}
          product={{
            ...dummyProducts[0],
            title:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tempore ut perspiciatis, sed",
          }}
        />
      ))}
    </View>
  );
};

CartItems.displayName = "Cart.Items";
export default CartItems;

// const makeStyles = (theme: ReactNativePaper.Theme) => {
//   return StyleSheet.create({
//     root: {
//       backgroundColor: theme.colors.palette.background.default,
//     },
//   });
// };
