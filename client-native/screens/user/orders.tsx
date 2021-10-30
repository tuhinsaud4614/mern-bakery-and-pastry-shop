import React from "react";
import { ScrollView, StyleProp, StyleSheet, TextStyle } from "react-native";
import { DataTable, useTheme } from "react-native-paper";
import Typography from "../../components/typography";
import { convertToLocalDate } from "../../shared/utils";
import { IOrder } from "../../shared/utils/interfaces";
import { OrderStatusType } from "../../shared/utils/types";

const statusStyle = (
  status: OrderStatusType,
  theme: ReactNativePaper.Theme
): StyleProp<TextStyle> => {
  const style: StyleProp<TextStyle> = {
    textTransform: "uppercase",
  };
  switch (status) {
    case "shipping":
      style.color = theme.colors.palette.warning.dark;
      break;
    case "processing":
      style.color = theme.colors.palette.info.main;
      break;
    case "delivered":
      style.color = theme.colors.palette.success.main;
      style.textDecorationLine = "line-through";
      style.textDecorationColor = theme.colors.palette.success.main;
      break;
    default:
      style.color = theme.colors.palette.secondary.main;
      break;
  }
  return style;
};

const orders: IOrder[] = [
  {
    id: "1234",
    date: new Date(),
    paymentMethod: { accountNo: 123, id: "123", method: "bkash" },
    products: [],
    shippingAddress: {
      address: "123",
      city: "dhaka",
      mobile: "12345",
      area: "mirpur",
      zip: 1200,
    },
    shippingFee: 50,
    status: "pending",
    trackingId: "bp-1234",
    vat: 5,
    totalPrice: 120,
  },
  {
    id: "2345",
    date: new Date(),
    paymentMethod: { accountNo: 123, id: "123", method: "bkash" },
    products: [],
    shippingAddress: {
      address: "123",
      city: "dhaka",
      mobile: "12345",
      area: "mirpur",
      zip: 1200,
    },
    shippingFee: 50,
    status: "processing",
    trackingId: "bp-2345",
    vat: 5,
    totalPrice: 120,
  },
  {
    id: "3456",
    date: new Date(),
    paymentMethod: { accountNo: 123, id: "123", method: "bkash" },
    products: [],
    shippingAddress: {
      address: "123",
      city: "dhaka",
      mobile: "12345",
      area: "mirpur",
      zip: 1200,
    },
    shippingFee: 50,
    status: "shipping",
    trackingId: "bp-3456",
    vat: 5,
    totalPrice: 120,
  },
  {
    id: "4567",
    date: new Date(),
    paymentMethod: { accountNo: 123, id: "123", method: "bkash" },
    products: [],
    shippingAddress: {
      address: "123",
      city: "dhaka",
      mobile: "12345",
      area: "mirpur",
      zip: 1200,
    },
    shippingFee: 50,
    status: "delivered",
    trackingId: "bp-4567",
    vat: 5,
    totalPrice: 120,
  },
];

const Orders = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <DataTable>
        <DataTable.Header
          style={{ backgroundColor: theme.colors.palette.accent }}
        >
          <DataTable.Title style={{ minWidth: 40 }}>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              #
            </Typography>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              Tracing ID
            </Typography>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              Date
            </Typography>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              Price
            </Typography>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              Payment
            </Typography>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              Order Status
            </Typography>
          </DataTable.Title>
        </DataTable.Header>
        {orders.map((order, index) => (
          <DataTable.Row key={order.id}>
            <DataTable.Cell>{index + 1}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <Typography variant="body1" numberOfLines={2} style={styles.text}>
                {order.trackingId}
              </Typography>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <Typography variant="body1" numberOfLines={2} style={styles.text}>
                {convertToLocalDate(order.date)}
              </Typography>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <Typography variant="body1" numberOfLines={2} style={styles.text}>
                {order.totalPrice}৳
              </Typography>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <Typography variant="body1" numberOfLines={2} style={styles.text}>
                {order.paymentMethod.method}
              </Typography>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <Typography
                variant="body1"
                numberOfLines={2}
                style={statusStyle(order.status, theme)}
              >
                {order.status}
              </Typography>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

Orders.displayName = "Orders";
export default Orders;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    cell: {
      minWidth: 110,
    },
    text: {
      color: theme.colors.palette.text.primary,
      textTransform: "uppercase",
    },
  });
};
