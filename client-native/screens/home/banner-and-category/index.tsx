import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Carousel from '../../../components/carousel';
import { dummyCategories } from '../../../dummy-data';
import { useBreakpointsWithDimensions } from '../../../shared/hooks';
import CategorySidebar from '../category-sidebar';

const BannerAndCategory = () => {
  const {
    breakpoints: [isSmUp, isMdUp, isLgUp],
    width,
  } = useBreakpointsWithDimensions(['sm', 'md', 'lg'], 'up');

  let imageSize: 'small' | 'medium' | 'large';

  if (isMdUp) {
    imageSize = 'medium';
  } else if (isLgUp) {
    imageSize = 'large';
  } else {
    imageSize = 'small';
  }

  const theme = useTheme();
  const bannerWidth = isSmUp
    ? width - theme.spacing * 4 - theme.spacing * 33
    : width - theme.spacing * 4;
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      {isSmUp && (
        <View style={styles.sidebar}>
          <CategorySidebar />
        </View>
      )}
      <View style={styles.carouselWrapper}>
        <Carousel
          data={dummyCategories.map((category) => category.image[imageSize])}
          itemWidth={bannerWidth}
          itemHeight={isSmUp ? 350 : 180}
          slide={(value) => (
            <Image
              source={value}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          )}
          classes={{
            wrapper: { flexBasis: '100%', flexShrink: 0 },
          }}
        />
      </View>
    </View>
  );
};
BannerAndCategory.displayName = 'BannerAndCategory';
export default BannerAndCategory;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: { flexDirection: 'row' },
    sidebar: {
      width: theme.spacing * 33,
      borderColor: theme.colors.palette.divider,
      borderWidth: 1,
      height: 350,
    },
    carouselWrapper: {
      flex: 1,
    },
    carouselImage: {
      width: '100%',
      height: '100%',
    },
  });
};
