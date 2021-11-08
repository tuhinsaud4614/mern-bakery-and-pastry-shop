import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Skeleton from '../../../components/skeleton';
import { deviceRange } from '../../../shared/utils';

export const BannerAndCategorySkeleton = () => {
  const { range } = deviceRange();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const isSmUp = range !== 'xs';
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { width: theme.spacing * (isSmUp ? 33 : 17) },
        ]}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            style={index !== 0 && { marginTop: theme.spacing }}
            percentageX
            animated
            width={100}
            height={isSmUp ? 30 : 17}
          />
        ))}
      </View>
      <View style={styles.wrapper}>
        <Skeleton
          variant="rectangular"
          width={100}
          height={100}
          percentageY
          percentageX
          animated
        />
      </View>
    </View>
  );
};

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: { flexDirection: 'row', maxHeight: 200 },
    container: {
      borderColor: theme.colors.palette.divider,
      borderWidth: 1,
      padding: theme.spacing,
    },
    wrapper: {
      flex: 1,
      height: '100%',
    },
  });
};

BannerAndCategorySkeleton.displayName = 'BannerAndCategory.Skeleton';
