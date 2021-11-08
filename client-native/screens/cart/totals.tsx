/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button, Divider, useTheme } from 'react-native-paper';
import Typography from '../../components/typography';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import { boxShadow } from '../../shared/utils';
import { typographyStyles } from '../../shared/utils/common.styles';

const CartTotals = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [discountCode, setDiscountCode] = useState<string>('');
  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');
  return (
    <View style={styles.root}>
      <Typography
        variant={isSmUp ? 'h6' : 'body1'}
        style={{ color: theme.colors.palette.primary.main, fontWeight: '500' }}
      >
        Total Items (10)
      </Typography>
      <View style={[styles.textBox, { marginTop: theme.spacing }]}>
        <Typography
          variant={'h6'}
          style={{
            color: theme.colors.palette.text.secondary,
          }}
        >
          Subtotal:
        </Typography>
        <Typography
          variant={'h6'}
          style={{ color: theme.colors.palette.text.secondary }}
        >
          120৳
        </Typography>
      </View>
      <View style={[styles.textBox, { marginTop: theme.spacing }]}>
        <Typography
          variant={'h6'}
          style={{ color: theme.colors.palette.info.main }}
        >
          VAT (%):
        </Typography>
        <Typography
          variant={'h6'}
          style={{ color: theme.colors.palette.info.dark }}
        >
          10
        </Typography>
      </View>
      <View style={[styles.textBox, { marginTop: theme.spacing }]}>
        <Typography
          variant={'h6'}
          style={{ color: theme.colors.palette.success.main }}
        >
          Discount:
        </Typography>
        <TextInput
          style={styles.discountInput}
          value={discountCode}
          onChangeText={(value) => setDiscountCode(value)}
          placeholder="Promo code"
        />
      </View>
      <Divider style={{ marginVertical: theme.spacing }} />
      <View style={styles.textBox}>
        <Typography
          variant={'h5'}
          style={{ color: theme.colors.palette.primary.main }}
        >
          Total:
        </Typography>
        <Typography
          variant="h5"
          style={{ color: theme.colors.palette.primary.dark }}
        >
          120৳
        </Typography>
      </View>
      <View style={{ paddingTop: theme.spacing * 2 }}>
        <Button
          mode="contained"
          labelStyle={typographyStyles.h6}
          color={theme.colors.palette.secondary.main}
          onPress={() => console.log('Pressed')}
        >
          Proceed to checkout
        </Button>
      </View>
    </View>
  );
};

CartTotals.displayName = 'Cart.Totals';
export default CartTotals;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.background.default,
      padding: theme.spacing * 1.25,
      ...boxShadow(4, 3),
    },
    textBox: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    discountInput: {
      ...typographyStyles.body2,
      borderColor: theme.colors.palette.secondary.light,
      borderWidth: 1,
      padding: theme.spacing,
      borderRadius: theme.spacing * 0.5,
      width: 200,
    },
  });
};
