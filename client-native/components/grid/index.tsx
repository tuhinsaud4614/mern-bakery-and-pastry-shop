import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import GridProvider, { GridContext, GridPartitionValueType } from './context';

interface Props {
  xs?: GridPartitionValueType;
  sm?: GridPartitionValueType;
  md?: GridPartitionValueType;
  lg?: GridPartitionValueType;
  xl?: GridPartitionValueType;
  item?: boolean;
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  children?: ReactNode;
}

const Grid = ({
  lg,
  md,
  sm,
  xl,
  xs = 1,
  item = false,
  children,
  style,
}: Props) => {
  const styles = makeStyles();

  if (item) {
    return (
      <GridProvider xl={xl} lg={lg} md={md} sm={sm} xs={xs}>
        <GridContext.Consumer>
          {({ width }) => (
            <View
              style={StyleSheet.flatten([
                styles.item,
                { flexBasis: width },
                style,
              ])}
            >
              {children}
            </View>
          )}
        </GridContext.Consumer>
      </GridProvider>
    );
  }
  return (
    <View style={StyleSheet.flatten([styles.root, style])}>{children}</View>
  );
};

Grid.displayName = 'Grid';
export default Grid;

// eslint-disable-next-line no-undef
const makeStyles = () => {
  return StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    item: {
      flexGrow: 0,
    },
  });
};
