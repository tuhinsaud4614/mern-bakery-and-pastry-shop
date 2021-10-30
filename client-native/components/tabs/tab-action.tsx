import React, { forwardRef } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Typography from "../typography";

interface Props {
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  index: number;
  label: string;
  onTabChange(index: number): void;
  active: boolean;
}

const TabAction = forwardRef<View, Props>(
  ({ label, index, onTabChange, active, style }, ref) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
      <View ref={ref}>
        <TouchableRipple
          onPress={() => onTabChange(index)}
          style={StyleSheet.flatten([styles.root, active && styles.active])}
        >
          <Typography
            style={StyleSheet.flatten([
              styles.label,
              style,
              {
                color: active
                  ? theme.colors.palette.common.white
                  : theme.colors.palette.text.primary,
              },
            ])}
            variant="h6"
          >
            {label}
          </Typography>
        </TouchableRipple>
      </View>
    );
  }
);

TabAction.displayName = "Tab.Action";
export default TabAction;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      padding: theme.spacing,
    },
    active: {
      backgroundColor: theme.colors.palette.primary.light,
    },

    label: {
      textTransform: "capitalize",
    },
  });
};
