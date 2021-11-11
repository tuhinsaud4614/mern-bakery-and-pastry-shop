import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Container from '../../components/container';
import Grid from '../../components/grid';
import Spacer from '../../components/spacer';
import Stepper from '../../components/stepper';
import OrderPlace from './order-place';
import OrderSummary from './order-summary';
import ShippingAddress from './shipping-address';

const CheckoutScreen = () => {
  const [current, setCurrent] = useState(2);
  const theme = useTheme();

  return (
    <Container>
      <Stepper
        current={current}
        items={['Shipping address', 'Payment', 'place order']}
        activeColor={theme.colors.palette.primary.main}
      />
      <Spacer direction="vertical" weight={16} />
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
            {/* {current === 1 && (
              <OrderPayment
                onComplete={(action) => {
                  if (action === 'next') {
                    setCurrent(2);
                  } else {
                    setCurrent(0);
                  }
                }}
              />
            )} */}
            {current === 2 && (
              <OrderPlace
                onComplete={(action) => {
                  if (action === 'next') {
                    setCurrent(2);
                  } else {
                    setCurrent(0);
                  }
                }}
              />
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
