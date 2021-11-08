import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Carousel from '../../components/carousel';
import ProductBox from '../../components/product-box';
import ProductCard from '../../components/product-card';
import { dummyProducts } from '../../dummy-data';
import { breakpointsWithDimensions } from '../../shared/utils';
import { IProduct } from '../../shared/utils/interfaces';

const FeaturedProducts = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp, isMdUp],
    width,
  } = breakpointsWithDimensions.up(['sm', 'md']);
  let itemPerSlide = 2;
  if (isSmUp) {
    itemPerSlide = 3;
  } else if (isMdUp) {
    itemPerSlide = 4;
  }
  const data = Array.from({ length: 4 }, () => dummyProducts[0]);
  return (
    <ProductBox classes={{ root: styles.root }} title="featured products">
      <Carousel
        data={data}
        itemWidth={width - theme.spacing * 6}
        itemPerSlide={itemPerSlide}
        slide={(value) => {
          const newValue = value as IProduct;
          return <ProductCard data={newValue} />;
        }}
        classes={{
          wrapper: { flexBasis: '100%', flexShrink: 0 },
          actionBtn: {
            top: !isMdUp && !isMdUp ? 118 : 138,
            ...(itemPerSlide === data.length && { display: 'none' }),
          },
          actionLeft: {
            left: -theme.spacing * 1.5,
          },
          actionRight: {
            right: -theme.spacing * 1.5,
          },
          slide: {
            padding: theme.spacing,
            height: '100%',
          },
        }}
      />
    </ProductBox>
  );
};
FeaturedProducts.displayName = 'FeaturedProducts';
export default FeaturedProducts;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      marginTop: theme.spacing * 2,
    },
  });
};
