import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { convertToLocalDate } from "../../../shared/utils";
import { IOrder } from "../../../shared/utils/interfaces";

interface Props {
  order: IOrder;
}

const TrackingHeader = ({ order }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Typography
          variant="h6"
          style={{ color: theme.colors.palette.text.primary }}
        >
          Order ID:{" "}
          <Typography textTransform="uppercase" variant="h6">
            {order.trackingId}
          </Typography>
        </Typography>
        <Typography
          variant="body1"
          style={{ color: theme.colors.palette.text.secondary }}
        >
          {convertToLocalDate(order.date)}
        </Typography>
      </View>
      <Button
        color={theme.colors.palette.secondary.main}
        onPress={() => {}}
        mode="contained"
        icon={(props) => <AntDesign {...props} size={20} name="printer" />}
      >
        Invoice
      </Button>
    </View>
  );
};

TrackingHeader.displayName = "Tracking.Header";
export default TrackingHeader;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: theme.spacing,
    },
    left: {
      flex: 1,
    },
  });
};
