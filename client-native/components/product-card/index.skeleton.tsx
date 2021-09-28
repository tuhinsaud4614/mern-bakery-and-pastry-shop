import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, useTheme } from "react-native-paper";
const ProductCardSkeleton = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Card>
      <View style={{ width: "100%" }}></View>
    </Card>
  );
};

ProductCardSkeleton.displayName = "ProductCard.Skeleton";
export default ProductCardSkeleton;

const makeStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    image: {
      backgroundColor: theme.colors.palette.action.disabledBackground,
    },
  });
