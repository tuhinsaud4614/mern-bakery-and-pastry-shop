import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Container from '../../components/container';
import Spacer from '../../components/spacer';
import { breakpointsWithDimensions } from '../../shared/utils';
import Aside from './aside';
import CategoryBanner from './banner';
import CategoryContainer from './container';

const CategoryScreen = () => {
  // const {
  //   params: { id, title },
  // } = useRoute<CategoryScreenRouteProp>();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isMdUp],
    height,
    width,
  } = breakpointsWithDimensions.up(['md']);
  const bannerWidth = isMdUp
    ? width - theme.spacing * 6 - theme.spacing * 32
    : width - theme.spacing * 4;
  const headerHeight = useHeaderHeight();

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
          <CategoryBanner width={bannerWidth} />
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
      width: theme.spacing * 32,
      flexShrink: 0,
      backgroundColor: theme.colors.palette.accent,
    },
    content: {
      flex: 1,
    },
  });
};
