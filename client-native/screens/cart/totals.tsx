import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

const CartTotals = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      <Text>Total</Text>
    </View>
  );
};

CartTotals.displayName = "Cart.Totals";
export default CartTotals;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.background.default,
    },
  });
};
