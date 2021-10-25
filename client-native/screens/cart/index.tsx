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
    <TabScreenWrapper>
      <View style={styles.root}>
        <View
          style={[
            styles.left,
            isSmUp && {
              flexBasis: "70%",
              paddingRight: theme.spacing * 2,
              marginBottom: 0,
            },
          ]}
        >
          <CartItems />
        </View>
        <View style={[styles.right, isSmUp && { flexBasis: "30%" }]}>
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
    left: {
      flexBasis: "100%",
      marginBottom: theme.spacing * 2,
    },
    right: {
      flexBasis: "100%",
    },
  });
};
