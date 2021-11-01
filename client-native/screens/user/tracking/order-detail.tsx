import React, { Fragment, ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { IOrder } from "../../../shared/utils/interfaces";

const OrderRow = ({
  description,
  amount,
  quantity,
}: {
  description: ReactNode;
  amount: ReactNode;
  quantity?: ReactNode;
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: theme.colors.palette.divider,
        borderBottomWidth: 1,
        marginTop: theme.spacing,
        paddingBottom: theme.spacing,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 1,
          alignItems: "center",
        }}
      >
        {description}
      </View>
      <View
        style={{
          width: 100,
          alignItems: "flex-end",
          paddingHorizontal: theme.spacing,
        }}
      >
        {quantity}
      </View>
      <View style={{ minWidth: 75, alignItems: "flex-end" }}>{amount}</View>
    </View>
  );
};

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

      <OrderRow
        description={
          <Typography
            variant="h6"
            style={{ color: theme.colors.palette.text.primary }}
          >
            Description
          </Typography>
        }
        quantity={
          <Typography
            variant="h6"
            style={{ color: theme.colors.palette.text.primary }}
          >
            Quantity
          </Typography>
        }
        amount={
          <Typography
            variant="h6"
            style={{ color: theme.colors.palette.text.primary }}
          >
            Amount
          </Typography>
        }
      />

      {order.products.map((product) => (
        <OrderRow
          key={product.id}
          description={
            <Fragment>
              <Image
                source={require("../../../assets/cake.jpeg")}
                resizeMode="cover"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.spacing * 0.5,
                }}
              />
              <View style={{ padding: theme.spacing, flex: 1 }}>
                <Typography
                  variant="body1"
                  numberOfLines={3}
                  textTransform="capitalize"
                  style={{ color: theme.colors.palette.primary.main }}
                >
                  {product.title}
                </Typography>
              </View>
            </Fragment>
          }
          quantity={
            <Typography
              style={{ color: theme.colors.palette.text.primary }}
              variant="body1"
              numberOfLines={2}
            >
              {product.quantity}
              {" x "}
              {product.price}৳
            </Typography>
          }
          amount={
            <Typography
              variant="h6"
              style={{ color: theme.colors.palette.text.primary }}
            >
              {product.price * product.quantity}৳
            </Typography>
          }
        />
      ))}
      <OrderRow
        description={
          <Typography
            variant="body1"
            style={{
              color: theme.colors.palette.text.primary,
              fontWeight: "500",
            }}
          >
            Subtotal
          </Typography>
        }
        amount={
          <Typography
            variant="body1"
            style={{
              color: theme.colors.palette.text.primary,
            }}
          >
            120৳
          </Typography>
        }
      />
      <OrderRow
        description={
          <Typography
            variant="body1"
            style={{
              color: theme.colors.palette.text.primary,
              fontWeight: "500",
            }}
          >
            VAT
          </Typography>
        }
        amount={
          <Typography
            variant="body1"
            style={{
              color: theme.colors.palette.text.primary,
            }}
          >
            5%
          </Typography>
        }
      />
      <OrderRow
        description={
          <Typography
            variant="body1"
            style={{
              color: theme.colors.palette.text.primary,
              fontWeight: "500",
            }}
          >
            Shipping Fee
          </Typography>
        }
        amount={
          <Typography
            variant="body1"
            style={{
              color: theme.colors.palette.text.primary,
            }}
          >
            12৳
          </Typography>
        }
      />
      <OrderRow
        description={
          <Typography
            variant="h6"
            style={{
              color: theme.colors.palette.text.primary,
              fontWeight: "500",
            }}
          >
            Total
          </Typography>
        }
        amount={
          <Typography
            variant="h6"
            style={{
              color: theme.colors.palette.text.primary,
            }}
          >
            120৳
          </Typography>
        }
      />
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
