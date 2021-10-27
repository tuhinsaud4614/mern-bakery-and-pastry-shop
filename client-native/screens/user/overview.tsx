import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { boxShadow } from "../../shared/utils";
import UserImage from "./user-image";

const Overview = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <UserImage />
      </View>
    </View>
  );
};

Overview.displayName = "Overview";
export default Overview;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      ...boxShadow(3, 1),
      backgroundColor: theme.colors.palette.accent,
      padding: theme.spacing,
    },
    header: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
