import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { dummyProducts } from "../../../dummy-data";
import FilteredProduct from "./filtered-product";

const FilteredProducts = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      {Array.from({ length: 10 }).map((item, index) => (
        <Fragment key={index}>
          <FilteredProduct product={dummyProducts[0]} />
          {index + 1 < 10 ? <Divider style={styles.divider} /> : null}
        </Fragment>
      ))}
    </View>
  );
};

FilteredProducts.displayName = "FilteredProducts";
export default FilteredProducts;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      zIndex: -1,
      marginTop: theme.spacing * 2,
    },
    divider: {
      marginVertical: theme.spacing * 2,
    },
  });
};
