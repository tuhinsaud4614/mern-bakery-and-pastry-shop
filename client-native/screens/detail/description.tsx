import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const Description = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return <View></View>;
};

Description.displayName = "Description";
export default Description;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {},
  });
};
