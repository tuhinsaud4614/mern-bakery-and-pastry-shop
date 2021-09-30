import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Grid from "../../components/grid";
import ProductBox from "../../components/product-box";
import ProductCard from "../../components/product-card";
import { dummyProducts } from "../../dummy-data";

const CategorizedProducts = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Fragment>
      <ProductBox classes={{ root: styles.root }} title="pastry">
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
      <ProductBox classes={{ root: styles.root }} title="cake">
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
    </Fragment>
  );
};
CategorizedProducts.displayName = "CategorizedProducts";
export default CategorizedProducts;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      marginTop: theme.spacing * 2,
      backgroundColor: theme.colors.palette.background.default,
    },
  });
};
