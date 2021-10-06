import React, { ReactNode } from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import { Breakpoints, breakpointsWithDimensions } from "../shared/utils";

const Container = ({
  children,
  classes,
  keyBoardAvoiding = false,
  contentContainerStyle,
}: {
  children?: ReactNode;
  classes?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  contentContainerStyle?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  keyBoardAvoiding?: boolean;
}) => {
  const theme = useTheme();
  const {
    breakpoints: [isLgUp],
    width,
  } = breakpointsWithDimensions.up(["lg"]);
  const styles = makeStyles(theme, isLgUp, width);

  const style: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.root,
    classes && classes,
  ]);

  if (keyBoardAvoiding) {
    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={style}
        contentContainerStyle={StyleSheet.flatten([
          contentContainerStyle,
          { padding: theme.spacing * 2 },
        ])}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={style}
      contentContainerStyle={StyleSheet.flatten([
        contentContainerStyle,
        { padding: theme.spacing * 2 },
      ])}
    >
      {children}
    </ScrollView>
  );
};

Container.displayName = "Container";
export default Container;

const makeStyles = (
  theme: ReactNativePaper.Theme,
  isLgUp: boolean,
  dimWidth: number
) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.common.white,
      maxWidth: Breakpoints.lg,
      ...(isLgUp && { marginHorizontal: (dimWidth - Breakpoints.lg) / 2 }),
    },
  });
};
