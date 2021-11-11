/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, useTheme } from 'react-native-paper';
import Grid from '../../components/grid';
import Spacer from '../../components/spacer';
import Typography from '../../components/typography';

const Item = ({ label, text }: { label: string; text: string }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.item}>
      <Typography variant="body1" style={{ fontWeight: '500' }}>
        {label}
      </Typography>
      <Spacer direction="horizontal" />
      <Typography variant="body2">{text}</Typography>
    </View>
  );
};

const OrderPlace = ({
  onComplete,
}: {
  onComplete(action: 'next' | 'previous'): void;
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View>
      <Grid>
        <Grid item xs={12} sm={6} style={styles.gridItem}>
          <Typography variant="h5">Shipping Address</Typography>
          <Divider style={{ marginTop: theme.spacing }} />
          <Item label="Mobile:" text="012345678911" />
          <Item label="Zip:" text="1200" />
          <Item label="Area:" text="Dhaka" />
          <Item label="City:" text="Dhaka" />
          <Item
            label="Address:"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae natus
            numquam sit! Earum illum est in qui numquam. Eaque, libero. Adipisci
            sint, nostrum et dignissimos fugit natus aperiam numquam quasi."
          />
        </Grid>
        <Grid item xs={12} sm={6} style={styles.gridItem}>
          <Typography variant="h5">Payment Details</Typography>
          <Divider style={{ marginTop: theme.spacing }} />
          <Item label="Card Type:" text="Master" />
          <Item label="Account No:" text="1222222222" />
          <Item label="Transaction ID:" text="1222222222" />
        </Grid>
      </Grid>
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
          Order Place
        </Button>
      </View>
    </View>
  );
};

export default OrderPlace;

const makeStyles = (
  // eslint-disable-next-line no-undef
  theme: ReactNativePaper.Theme
) => {
  return StyleSheet.create({
    gridItem: { padding: theme.spacing },
    item: {
      flexDirection: 'row',
      marginTop: theme.spacing,
    },
    actions: {
      flexDirection: 'row',
      padding: theme.spacing * 2,
    },
  });
};
