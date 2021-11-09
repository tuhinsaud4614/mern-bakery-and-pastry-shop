/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Typography from './typography';

const Item = ({
  index,
  title,
  left = true,
  right = true,
  leftActive = false,
  rightActive = false,
  activeColor,
}: {
  title: string;
  index: number;
  left?: boolean;
  right?: boolean;
  leftActive?: boolean;
  rightActive?: boolean;
  activeColor?: string;
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.item}>
      <View style={styles.badgeWrapper}>
        <View
          style={{
            backgroundColor: left
              ? leftActive
                ? activeColor || theme.colors.palette.secondary.main
                : theme.colors.palette.divider
              : 'transparent',
            flex: 1,
            height: 4,
          }}
        />
        <View
          style={[
            styles.badge,
            {
              backgroundColor: leftActive
                ? activeColor || theme.colors.palette.secondary.main
                : theme.colors.palette.grey[400],
            },
          ]}
        >
          <Typography
            variant="body1"
            style={{
              color:
                theme.colors.palette.common[leftActive ? 'white' : 'black'],
            }}
            numberOfLines={2}
            textTransform="capitalize"
          >
            {index}
          </Typography>
        </View>
        <View
          style={{
            backgroundColor: right
              ? rightActive
                ? activeColor || theme.colors.palette.secondary.main
                : theme.colors.palette.divider
              : 'transparent',
            flex: 1,
            height: 4,
          }}
        />
      </View>
      <View style={styles.titleWrapper}>
        <Typography variant="body1" textAlign="center">
          {title}
        </Typography>
      </View>
    </View>
  );
};

interface Props {
  items: string[];
  current: number;
  activeColor?: string;
}

const Stepper = memo(
  ({ items, current, activeColor }: Props) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const itemsLen = items.length;

    return (
      <View style={styles.root}>
        <View style={styles.container}>
          {items.map((item, index) => (
            <Item
              key={index}
              index={index + 1}
              title={item}
              left={index !== 0}
              right={index < itemsLen - 1}
              leftActive={current >= index}
              rightActive={index < current}
              activeColor={activeColor}
            />
          ))}
        </View>
      </View>
    );
  },
  (prev, next) => prev.current === next.current
);

export default Stepper;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      width: '100%',
    },

    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    item: {
      flex: 1,
    },
    badgeWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    badge: {
      width: theme.spacing * 3,
      height: theme.spacing * 3,
      borderRadius: theme.spacing * 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleWrapper: {
      alignItems: 'center',
      paddingHorizontal: theme.spacing * 0.5,
      paddingTop: theme.spacing,
    },
  });
};
