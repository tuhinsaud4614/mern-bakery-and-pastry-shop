import React, { memo } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { typographyStyles } from "../../../shared/utils/common.styles";

interface Props {
  count: number;
  onCountChange(value: string): void;
  onPress(action: "add" | "minus"): void;
}

const CounterComponent = ({ count, onCountChange, onPress }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.root}>
      <IconButton
        icon="minus"
        style={StyleSheet.flatten([styles.btn, styles.leftBtn])}
        onPress={() => onPress("minus")}
        color={theme.colors.palette.secondary.main}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={count.toString()}
        onChangeText={(value) => onCountChange(value)}
      />
      <IconButton
        icon="plus"
        style={StyleSheet.flatten([styles.btn, styles.rightBtn])}
        onPress={() => onPress("add")}
        color={theme.colors.palette.secondary.main}
      />
    </View>
  );
};

CounterComponent.displayName = "Counter";
const Counter = memo(
  CounterComponent,
  (prev, next) => prev.count === next.count
);
export default Counter;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
    },
    input: {
      ...typographyStyles.body2,
      borderColor: theme.colors.palette.secondary.light,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      width: 45,
      textAlign: "center",
      color: theme.colors.palette.text.primary,
    },
    btn: {
      borderColor: theme.colors.palette.secondary.light,
      borderWidth: 1,
      borderRadius: 0,
      margin: 0,
    },
    leftBtn: {
      borderTopLeftRadius: theme.spacing * 0.5,
      borderBottomLeftRadius: theme.spacing * 0.5,
    },
    rightBtn: {
      borderTopRightRadius: theme.spacing * 0.5,
      borderBottomRightRadius: theme.spacing * 0.5,
    },
  });
};
