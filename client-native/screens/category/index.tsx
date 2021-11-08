import { useHeaderHeight } from '@react-navigation/elements';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Container from '../../components/container';
import Spacer from '../../components/spacer';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import { CategoryScreenRouteProp } from '../../shared/routes';
import Aside from './aside';
import CategoryBanner from './banner';
import CategoryContainer from './container';

const CategoryScreen = () => {
  const {
    params: { image },
  } = useRoute<CategoryScreenRouteProp>();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const headerHeight = useHeaderHeight();
  const {
    breakpoints: [isMdUp, isLgUp],
    width,
    height,
  } = useBreakpointsWithDimensions(['sm', 'md', 'lg'], 'up');

  const bannerWidth = isMdUp
    ? width - theme.spacing * 6 - theme.spacing * 31
    : width - theme.spacing * 4;

  let imageSize: string;

  if (isMdUp) {
    imageSize = image.medium;
  } else if (isLgUp) {
    imageSize = image.large;
  } else {
    imageSize = image.small;
  }

  return (
    <Container>
      <View style={styles.root}>
        {isMdUp && (
          <View
            style={[
              styles.aside,
              { height: height - (headerHeight + theme.spacing * 4) },
            ]}
          >
            <Aside />
          </View>
        )}
        <View
          style={[styles.content, isMdUp && { paddingLeft: theme.spacing * 2 }]}
        >
          <CategoryBanner width={bannerWidth} image={imageSize} />
          <Spacer direction="vertical" weight={24} />
          <CategoryContainer />
        </View>
      </View>
    </Container>
  );
};

CategoryScreen.displayName = 'CategoryScreen';
export default CategoryScreen;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
    },
    aside: {
      width: theme.spacing * 31,
      flexShrink: 0,
      backgroundColor: theme.colors.palette.accent,
    },
    content: {
      flex: 1,
    },
  });
};
