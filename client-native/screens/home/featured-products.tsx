import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Grid from "../../components/grid";
import ProductBox from "../../components/product-box";
import ProductCard from "../../components/product-card";
import { dummyProducts } from "../../dummy-data";

const FeaturedProducts = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <ProductBox classes={{ root: styles.root }} title="featured products">
      <Grid>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid
            xs={6}
            sm={4}
            md={3}
            item
            style={{ padding: theme.spacing }}
            key={index}
          >
            <ProductCard data={dummyProducts[0]} />
            {/* <ProductCardSkeleton /> */}
          </Grid>
        ))}
      </Grid>
    </ProductBox>
  );
};
FeaturedProducts.displayName = "FeaturedProducts";
export default FeaturedProducts;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      marginTop: theme.spacing * 2,
    },
  });
};
