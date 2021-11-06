import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Container from '../../components/container';
import { breakpointsWithDimensions } from '../../shared/utils';
import Aside from './aside';

const CategoryScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isMdUp],
    height,
  } = breakpointsWithDimensions.up(['md']);
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
        <View style={styles.content} />
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
      width: 300,
      flexShrink: 0,
      backgroundColor: theme.colors.palette.accent,
    },
    content: {
      flex: 1,
    },
  });
};
