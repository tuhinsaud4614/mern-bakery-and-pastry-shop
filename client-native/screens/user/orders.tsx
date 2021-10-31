import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DataTable, useTheme } from "react-native-paper";
import Typography from "../../components/typography";
import { orders } from "../../dummy-data";
import { convertToLocalDate } from "../../shared/utils";
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

const Orders = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <KeyboardAwareScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{ flexGrow: 1 }}
    >
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
            <DataTable.Cell style={{ minWidth: 40 }}>
              {index + 1}
            </DataTable.Cell>
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
    </KeyboardAwareScrollView>
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
