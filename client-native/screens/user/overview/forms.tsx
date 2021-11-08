/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import Typography from '../../../components/typography';
import { useBreakpointsWithDimensions } from '../../../shared/hooks';
import PersonalInfoForm from './personal-info-form';
import ShippingDetailForm from './shipping-detail-form';

const OverviewForms = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp, isMdUp],
  } = useBreakpointsWithDimensions(['sm', 'md'], 'up');

  return (
    <View
      style={[
        styles.root,
        isSmUp && {
          borderLeftColor: theme.colors.palette.divider,
          borderLeftWidth: 1,
        },
      ]}
    >
      <View style={styles.header}>
        <Typography
          variant={isMdUp ? 'h4' : 'h5'}
          style={{ color: theme.colors.palette.primary.main }}
          textAlign={!isSmUp ? 'center' : undefined}
        >
          Personal Information
        </Typography>
      </View>
      <View style={{ padding: theme.spacing }}>
        <PersonalInfoForm />
      </View>
      <Divider
        style={{
          marginVertical: theme.spacing,
          marginHorizontal: theme.spacing * 2,
        }}
      />
      <View style={styles.header}>
        <Typography
          variant={isMdUp ? 'h4' : 'h5'}
          style={{ color: theme.colors.palette.primary.main }}
          textAlign={!isSmUp ? 'center' : undefined}
        >
          Shipping Address
        </Typography>
      </View>
      <View style={{ padding: theme.spacing }}>
        <ShippingDetailForm />
      </View>
    </View>
  );
};

OverviewForms.displayName = 'Overview.Forms';
export default OverviewForms;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
      maxWidth: 600,
    },
    header: {
      paddingVertical: theme.spacing,
      paddingHorizontal: theme.spacing * 2,
      paddingBottom: 0,
    },
  });
};
