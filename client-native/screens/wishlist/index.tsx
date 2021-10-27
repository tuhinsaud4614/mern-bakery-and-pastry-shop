import React from "react";
import { useTheme } from "react-native-paper";
import Grid from "../../components/grid";
import ProductBox from "../../components/product-box";
import ProductCard from "../../components/product-card";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import { dummyProducts } from "../../dummy-data";
import WishlistItems from "./items";
import SortAndFilter from "./sort-and-filter";

const RelatedProducts = () => {
  const theme = useTheme();
  return (
    <ProductBox
      classes={{ root: { marginTop: theme.spacing * 2 } }}
      title="related products"
    >
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

const WishlistScreen = () => {
  return (
    <TabScreenWrapper component="flat-list">
      <SortAndFilter />
      <WishlistItems />
      <RelatedProducts />
    </TabScreenWrapper>
  );
};
WishlistScreen.displayName = "WishlistScreen";
export default WishlistScreen;
