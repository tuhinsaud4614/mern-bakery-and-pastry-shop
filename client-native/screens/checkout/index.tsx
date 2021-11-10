import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Container from '../../components/container';
import Grid from '../../components/grid';
import Stepper from '../../components/stepper';
import OrderSummary from './order-summary';
import ShippingAddress from './shipping-address';

const CheckoutScreen = () => {
  const [current, setCurrent] = useState(0);
  const theme = useTheme();

  return (
    <Container>
      <Stepper
        current={current}
        items={['Shipping address', 'Payment', 'place order']}
        activeColor={theme.colors.palette.primary.main}
      />
      <Grid>
        <Grid xs={12} md={7} item style={{ padding: theme.spacing }}>
          <View
            style={{
              backgroundColor: theme.colors.palette.accent,
              borderRadius: theme.spacing,
            }}
          >
            {current === 0 && (
              <ShippingAddress onComplete={() => setCurrent(1)} />
            )}
          </View>
        </Grid>
        <Grid xs={12} md={5} item style={{ padding: theme.spacing }}>
          <OrderSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutScreen;
