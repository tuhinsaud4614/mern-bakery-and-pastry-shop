import {
  CardField,
  CardFieldInput,
  StripeProvider,
} from '@stripe/stripe-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Spacer from '../../components/spacer';
import Typography from '../../components/typography';

const OrderPayment = ({
  onComplete,
}: {
  onComplete(action: 'next' | 'previous'): void;
}) => {
  const theme = useTheme();
  const cardStyles = makeCardStyles(theme);
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      <Typography
        variant="h5"
        style={{ color: theme.colors.palette.secondary.main }}
      >
        Card Details
      </Typography>
      <Spacer weight={8} />
      <StripeProvider
        publishableKey={process.env.STRIPE_PUBLIC_KEY || ''}
        merchantIdentifier="merchant.identifier"
      >
        <CardField
          placeholder={{ number: '4242 4242 4242 424' }}
          cardStyle={cardStyles}
          style={styles.card}
          onCardChange={(cardDetails) => {
            console.log('card details', cardDetails);
          }}
        />
      </StripeProvider>
      <View style={styles.actions}>
        <Button
          color={theme.colors.palette.secondary.main}
          // onPress={handleSubmit}
          onPress={() => onComplete('previous')}
          mode="contained"
          // disabled={!(isValid && dirty)}
          // loading={isSubmitting}
        >
          Previous
        </Button>
        <Spacer weight={16} direction="horizontal" />
        <Button
          color={theme.colors.palette.secondary.main}
          // onPress={handleSubmit}
          onPress={() => onComplete('next')}
          mode="contained"
          // disabled={!(isValid && dirty)}
          // loading={isSubmitting}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default OrderPayment;

const makeCardStyles = (
  // eslint-disable-next-line no-undef
  theme: ReactNativePaper.Theme
): CardFieldInput.Styles => {
  return {
    backgroundColor: theme.colors.palette.background.paper,
    textColor: theme.colors.palette.text.primary,
  };
};

const makeStyles = (
  // eslint-disable-next-line no-undef
  theme: ReactNativePaper.Theme
) => {
  return StyleSheet.create({
    root: { padding: theme.spacing },
    card: {
      height: 50,
    },
    actions: {
      flexDirection: 'row',
      marginTop: theme.spacing * 2,
    },
  });
};
