import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import Grid from '../../components/grid';
import Spacer from '../../components/spacer';
import Typography from '../../components/typography';
import { AppConstraints } from '../../shared/utils';
import ShippingAddress from './shipping-address';

const SummaryItem = ({
  label,
  value,
  bottomDivider = false,
  topDivider = false,
}: {
  label: string;
  value: string;
  topDivider?: boolean;
  bottomDivider?: boolean;
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Fragment>
      {topDivider && (
        <Divider
          style={{
            marginTop: theme.spacing * 1.5,
          }}
        />
      )}
      <View style={styles.item}>
        <View style={styles.itemText}>
          <Typography variant="h6" numberOfLines={2}>
            {label}
          </Typography>
        </View>
        <Spacer direction="horizontal" weight={8} />
        <Typography variant="h6">{value}</Typography>
      </View>
      {bottomDivider && (
        <Divider
          style={{
            marginBottom: theme.spacing * 1.5,
          }}
        />
      )}
    </Fragment>
  );
};

const ShippingContainer = ({ onComplete }: { onComplete(): void }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Grid>
      <Grid xs={12} md={7} item style={{ padding: theme.spacing }}>
        <ShippingAddress onComplete={onComplete} />
      </Grid>
      <Grid xs={12} md={5} item style={{ padding: theme.spacing }}>
        <View style={[styles.summary]}>
          <Typography
            variant="h5"
            style={{ color: theme.colors.palette.secondary.main }}
          >
            Order Summary
          </Typography>
          {Array.from({ length: 3 }).map((_, index) => (
            <SummaryItem
              key={index}
              label="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
          laudantium commodi exercitationem quod possimus velit. Tenetur
          repudiandae natus vitae eius, officia asperiores. Eligendi perferendis
          dolores officia incidunt fuga, possimus quasi. X 25"
              value={`120${AppConstraints.currency}`}
              topDivider
              bottomDivider={index === 2}
            />
          ))}
          <SummaryItem
            label="Subtotal"
            value={`120${AppConstraints.currency}`}
          />
          <SummaryItem label="VAT" value={'5%'} />
          <SummaryItem
            label="Shipping Fees"
            value={`10${AppConstraints.currency}`}
          />
          <Divider style={{ marginTop: theme.spacing }} />
          <SummaryItem label="Total" value={`10${AppConstraints.currency}`} />
        </View>
      </Grid>
    </Grid>
  );
};
export default ShippingContainer;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    summary: {
      backgroundColor: theme.colors.palette.accent,
      padding: theme.spacing,
      borderRadius: theme.spacing,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: theme.spacing,
    },
    itemText: {
      flex: 1,
    },
  });
};
