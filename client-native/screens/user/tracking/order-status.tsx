import React from "react";
import { ColorValue, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { breakpointsWithDimensions } from "../../../shared/utils";
import { OrderStatusType } from "../../../shared/utils/types";

const statusStyle = (
  status: OrderStatusType,
  theme: ReactNativePaper.Theme
): ColorValue => {
  switch (status) {
    case "shipping":
      return theme.colors.palette.warning.dark;

    case "processing":
      return theme.colors.palette.info.main;

    case "delivered":
      return theme.colors.palette.success.main;

    default:
      return theme.colors.palette.secondary.main;
  }
};

const StepperItem = ({
  active,
  status,
  index,
}: {
  status: OrderStatusType;
  active: boolean;
  index: number;
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const {
    breakpoints: [isSmUp],
  } = breakpointsWithDimensions.up(["sm"]);

  return (
    <View style={styles.stepperBox}>
      <View style={{ alignItems: "center", marginBottom: theme.spacing }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: isSmUp ? 30 : 22,
            height: isSmUp ? 30 : 22,
            backgroundColor: active
              ? statusStyle(status, theme)
              : theme.colors.palette.action.disabled,

            borderRadius: isSmUp ? 15 : 11,
          }}
        >
          <Typography
            variant={isSmUp ? "h6" : "body1"}
            style={{
              color: theme.colors.palette.common[active ? "white" : "black"],
            }}
          >
            {index}
          </Typography>
        </View>
      </View>
      <Typography
        variant={isSmUp ? "h6" : "body1"}
        style={{
          color: active
            ? statusStyle(status, theme)
            : theme.colors.palette.text.secondary,
          textTransform: "capitalize",
        }}
      >
        {status}
      </Typography>
    </View>
  );
};

const Line = ({
  active,
  status,
}: {
  active: boolean;
  status: OrderStatusType;
}) => {
  const theme = useTheme();
  const {
    breakpoints: [isSmUp],
  } = breakpointsWithDimensions.up(["sm"]);
  return (
    <View
      style={{
        height: 2,
        minWidth: 5,
        flex: 1,
        backgroundColor: active
          ? statusStyle(status, theme)
          : theme.colors.palette.divider,
        marginHorizontal: theme.spacing,
        marginVertical: isSmUp ? theme.spacing * 1.5 : theme.spacing,
      }}
    />
  );
};

const OrderStatus = ({ status }: { status: OrderStatusType }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Typography
          variant="h5"
          style={{ color: theme.colors.palette.text.primary }}
        >
          Order Status
        </Typography>
      </View>
      <View style={styles.stepperWrapper}>
        <View style={styles.stepper}>
          <StepperItem
            status={"pending"}
            active={
              status === "pending" ||
              status === "processing" ||
              status === "shipping" ||
              status === "delivered"
            }
            index={1}
          />
          <Line
            active={
              status === "processing" ||
              status === "shipping" ||
              status === "delivered"
            }
            status={"processing"}
          />
          <StepperItem
            status={"processing"}
            active={
              status === "processing" ||
              status === "shipping" ||
              status === "delivered"
            }
            index={2}
          />

          <Line
            active={status === "shipping" || status === "delivered"}
            status={"shipping"}
          />
          <StepperItem
            status={"shipping"}
            active={status === "shipping" || status === "delivered"}
            index={3}
          />
          <Line active={status === "delivered"} status={"delivered"} />
          <StepperItem
            status={"delivered"}
            active={status === "delivered"}
            index={3}
          />
        </View>
      </View>
    </View>
  );
};

OrderStatus.displayName = "OrderStatus";
export default OrderStatus;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: { marginTop: theme.spacing * 2 },
    header: {
      backgroundColor: theme.colors.palette.accent,
      padding: theme.spacing,
      borderTopLeftRadius: theme.spacing * 0.5,
      borderTopRightRadius: theme.spacing * 0.5,
    },
    stepperWrapper: {
      alignItems: "center",
      paddingVertical: theme.spacing * 2,
    },
    stepper: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: 600,
    },
    stepperBox: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
