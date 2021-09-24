import React, { ReactNode } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Breakpoints, breakpoints } from "../shared/utils";

const Container = ({
  children,
  classes,
}: {
  children?: ReactNode;
  classes?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
}) => {
  const isLgUp = breakpoints.up("lg");
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={StyleSheet.flatten([
        {
          padding: theme.spacing * 2,
          backgroundColor: theme.colors.palette.common.white,
          maxWidth: Breakpoints.lg,
          ...(isLgUp && { marginHorizontal: (width - Breakpoints.lg) / 2 }),
        },
        classes && classes,
      ])}
    >
      {children}
    </ScrollView>
  );
};

Container.displayName = "Container";
export default Container;
