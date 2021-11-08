import React from 'react';
import { useTheme } from 'react-native-paper';
import Grid from '../../components/grid';
import ProductCard from '../../components/product-card';
import { dummyProducts } from '../../dummy-data';

const CategoryContainer = () => {
  const theme = useTheme();
  return (
    <Grid>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid
          xs={6}
          sm={6}
          md={4}
          lg={3}
          item
          style={{ padding: theme.spacing }}
          key={index}
        >
          <ProductCard data={dummyProducts[0]} />
          {/* <ProductCardSkeleton /> */}
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryContainer;
