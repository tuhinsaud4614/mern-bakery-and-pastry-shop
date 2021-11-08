/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Typography from '../../../components/typography';
import { useBreakpointsWithDimensions } from '../../../shared/hooks';
import { convertToLocalDate } from '../../../shared/utils';
import { IOrder } from '../../../shared/utils/interfaces';

const SummeryContent = ({
  children,
  isSmUp,
}: {
  isSmUp: boolean;
  children: ReactNode;
}) => {
  return (
    <View
      style={
        isSmUp && { flexDirection: 'row', justifyContent: 'space-between' }
      }
    >
      {children}
    </View>
  );
};

const SummeryItemWrapper = ({
  children,
  isSmUp,
}: {
  isSmUp: boolean;
  children: ReactNode;
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: theme.colors.palette.divider,
          borderBottomWidth: 1,
          flexWrap: 'wrap',
        },
        isSmUp && { flex: 1 },
      ]}
    >
      {children}
    </View>
  );
};

const SummeryItem = ({ label, value }: { label: string; value: string }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing,
      }}
    >
      <Typography
        variant="h6"
        style={{ color: theme.colors.palette.text.primary }}
      >
        {label}:
      </Typography>
      <View style={{ padding: theme.spacing * 0.5 }} />
      <Typography
        variant="body1"
        style={{
          color: theme.colors.palette.text.primary,
        }}
        numberOfLines={3}
      >
        {value}
      </Typography>
    </View>
  );
};

const OrderSummary = ({ order }: { order: IOrder }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Typography
          variant="h5"
          style={{ color: theme.colors.palette.text.primary }}
        >
          Order Summary
        </Typography>
      </View>
      <View style={styles.body}>
        <SummeryContent isSmUp={isSmUp}>
          <SummeryItemWrapper isSmUp={isSmUp}>
            <SummeryItem label="ID" value={order.id.toUpperCase()} />
            <SummeryItem
              label="Address"
              value={order.shippingAddress.address}
            />
          </SummeryItemWrapper>
          <SummeryItemWrapper isSmUp={isSmUp}>
            <SummeryItem label="Date" value={convertToLocalDate(order.date)} />
            <SummeryItem label="Phone" value={order.shippingAddress.mobile} />
          </SummeryItemWrapper>
        </SummeryContent>
        <SummeryContent isSmUp={isSmUp}>
          <SummeryItemWrapper isSmUp={isSmUp}>
            <SummeryItem label="Payment" value={order.paymentMethod.method} />
            <SummeryItem label="Status" value={order.status.toUpperCase()} />
          </SummeryItemWrapper>
          <SummeryItemWrapper isSmUp={isSmUp}>
            <SummeryItem label="City" value={order.shippingAddress.city} />
            <SummeryItem
              label="Area/Zip"
              value={`${order.shippingAddress.area}/${order.shippingAddress.zip}`}
            />
          </SummeryItemWrapper>
        </SummeryContent>
      </View>
    </View>
  );
};

OrderSummary.displayName = 'Order.Summary';
export default OrderSummary;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: { marginTop: theme.spacing * 2 },
    header: {
      backgroundColor: theme.colors.palette.accent,
      padding: theme.spacing,
      borderTopLeftRadius: theme.spacing * 0.5,
      borderTopRightRadius: theme.spacing * 0.5,
    },
    body: {
      maxWidth: 700,
    },
  });
};
