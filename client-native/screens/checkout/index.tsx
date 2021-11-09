import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Container from '../../components/container';
import Stepper from '../../components/stepper';
import ShippingContainer from './shipping-container';

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
      <ShippingContainer onComplete={() => setCurrent(1)} />
    </Container>
  );
};

export default CheckoutScreen;
