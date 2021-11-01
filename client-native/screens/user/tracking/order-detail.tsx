import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { DataTable, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { IOrder } from "../../../shared/utils/interfaces";

const OrderDetail = ({ order }: { order: IOrder }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Typography
          variant="h5"
          style={{ color: theme.colors.palette.text.primary }}
        >
          Order Details
        </Typography>
      </View>
      <DataTable style={{ maxWidth: 600 }}>
        <DataTable.Header style={{ padding: 0 }}>
          <DataTable.Title style={{ maxWidth: 40 }}>{""}</DataTable.Title>
          <DataTable.Title>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              Title
            </Typography>
          </DataTable.Title>
          <DataTable.Title>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              Quantity
            </Typography>
          </DataTable.Title>
          <DataTable.Title>
            <Typography
              variant="h6"
              numberOfLines={2}
              style={{ color: theme.colors.palette.text.primary }}
            >
              Amount
            </Typography>
          </DataTable.Title>
        </DataTable.Header>
        {order.products.map((product) => (
          <DataTable.Row key={product.id} style={{ padding: 0 }}>
            <DataTable.Cell style={{ maxWidth: 40 }}>
              <Image
                source={require("../../../assets/cake.jpeg")}
                resizeMode="cover"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.spacing * 0.5,
                }}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={{ padding: theme.spacing }}>
                <Typography
                  variant="body1"
                  numberOfLines={4}
                  textTransform="capitalize"
                >
                  {product.title}
                </Typography>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <Typography variant="body1" numberOfLines={2}>
                {product.quantity}
                {" x "}
                {product.price}৳
              </Typography>
            </DataTable.Cell>
            <DataTable.Cell>
              <Typography variant="h6" numberOfLines={2}>
                {product.price * product.quantity}৳
              </Typography>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row>
          <DataTable.Cell>Subtotal</DataTable.Cell>
          <DataTable.Cell children={null} />
          <DataTable.Cell children={null} />
          <DataTable.Cell>
            <Typography variant="h6">120৳</Typography>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>VAT</DataTable.Cell>
          <DataTable.Cell children={null} />
          <DataTable.Cell children={null} />
          <DataTable.Cell>
            <Typography variant="h6">5%</Typography>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Shipping Fee</DataTable.Cell>
          <DataTable.Cell children={null} />
          <DataTable.Cell children={null} />
          <DataTable.Cell>
            <Typography variant="h6">40৳</Typography>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Total</DataTable.Cell>
          <DataTable.Cell children={null} />
          <DataTable.Cell children={null} />
          <DataTable.Cell>
            <Typography variant="h6">40৳</Typography>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};

OrderDetail.displayName = "Order.Detail";
export default OrderDetail;

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
