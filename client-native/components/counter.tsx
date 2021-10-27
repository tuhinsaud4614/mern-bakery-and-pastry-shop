import React, { memo } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { typographyStyles } from "../shared/utils/common.styles";

interface Props {
  count: number;
  onCountChange(value: string): void;
  onBlur?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onPress(action: "add" | "minus"): void;
  classes?: {
    root?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    btn?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    leftBtn?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    rightBtn?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    input?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
  };
}

const CounterComponent = ({
  count,
  onCountChange,
  onBlur,
  onPress,
  classes,
}: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={StyleSheet.flatten([styles.root, classes?.root])}>
      <IconButton
        icon="minus"
        style={StyleSheet.flatten([
          styles.btn,
          styles.leftBtn,
          classes?.btn,
          classes?.leftBtn,
        ])}
        onPress={() => onPress("minus")}
        color={theme.colors.palette.secondary.main}
      />
      <TextInput
        style={StyleSheet.flatten([styles.input, classes?.input])}
        keyboardType="numeric"
        value={count.toString()}
        onChangeText={(value) => onCountChange(value)}
        onBlur={onBlur}
      />
      <IconButton
        icon="plus"
        style={StyleSheet.flatten([
          styles.btn,
          styles.rightBtn,
          classes?.btn,
          classes?.rightBtn,
        ])}
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
