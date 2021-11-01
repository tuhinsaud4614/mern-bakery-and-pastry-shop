import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { IOrder } from "../../../shared/utils/interfaces";

const OrderDetail = ({ order }: { order: IOrder }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return <View></View>;
};

OrderDetail.displayName = "Order.Detail";
export default OrderDetail;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: { marginTop: theme.spacing * 2 },
    header: {
      backgroundColor: theme.colors.palette.accent,
      padding: theme.spacing,
      borderTopLeftRadius: theme.spacing * 0.5,
      borderTopRightRadius: theme.spacing * 0.5,
    },
    body: {
      maxWidth: 700,
    },
  });
};
