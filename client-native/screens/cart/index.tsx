import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import { breakpointsWithDimensions } from "../../shared/utils";
import CartItems from "./items";
import CartTotals from "./totals";

const CartScreen = () => {
  const {
    breakpoints: [isSmUp],
  } = breakpointsWithDimensions.up(["sm"]);
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <TabScreenWrapper component="flat-list">
      <View style={isSmUp && styles.root}>
        <View
          style={
            isSmUp && {
              flex: 1,
              paddingRight: theme.spacing * 2,
            }
          }
        >
          <CartItems />
        </View>
        <View style={isSmUp && { minWidth: 300 }}>
          <CartTotals />
        </View>
      </View>
    </TabScreenWrapper>
  );
};
CartScreen.displayName = "CartScreen";
export default CartScreen;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      flexWrap: "wrap",
      flexDirection: "row",
      width: "100%",
    },
  });
};
