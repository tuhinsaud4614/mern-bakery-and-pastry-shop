import React, { useState } from 'react';
import { Button, useTheme } from 'react-native-paper';
import Container from '../../components/container';
import Stepper from '../../components/stepper';

const CheckoutScreen = () => {
  const [current, setCurrent] = useState(0);
  const theme = useTheme();

  return (
    <Container>
      <Stepper
        current={current}
        items={Array.from({ length: 4 }).map(
          () => 'Lorem ipsum dolor sit amet'
        )}
        activeColor={theme.colors.palette.primary.main}
      />
      <Button
        onPress={() => {
          setCurrent((prev) => (prev > 0 ? --prev : prev));
        }}
      >
        Previous
      </Button>
      <Button
        onPress={() => {
          setCurrent((prev) => (prev < 3 ? ++prev : prev));
        }}
      >
        Next
      </Button>
    </Container>
  );
};

export default CheckoutScreen;
