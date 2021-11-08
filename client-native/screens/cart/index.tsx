/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import TabScreenWrapper from '../../components/tab-screen-wrapper';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import CartItems from './items';
import CartTotals from './totals';

const CartScreen = () => {
  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');
  const theme = useTheme();
  const styles = makeStyles();
  return (
    <TabScreenWrapper component="flat-list">
      <View style={isSmUp && styles.root}>
        <View
          style={
            isSmUp && {
              flex: 1,
              paddingRight: theme.spacing * 2,
            }
          }
        >
          <CartItems />
        </View>
        <View style={isSmUp && { minWidth: 300 }}>
          <CartTotals />
        </View>
      </View>
    </TabScreenWrapper>
  );
};
CartScreen.displayName = 'CartScreen';
export default CartScreen;

const makeStyles = () => {
  return StyleSheet.create({
    root: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: '100%',
    },
  });
};
