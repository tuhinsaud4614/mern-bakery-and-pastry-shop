import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
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
  keyBoardAvoiding = false,
}: {
  children?: ReactNode;
  classes?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  keyBoardAvoiding?: boolean;
}) => {
  const isLgUp = breakpoints.up("lg");
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const styles = makeStyles(theme, isLgUp, width);

  const style: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.root,
    classes && classes,
  ]);

  if (keyBoardAvoiding) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: theme.colors.palette.common.white }}
      >
        <KeyboardAvoidingView behavior={"position"} style={style}>
          {children}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={style}
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
      flex: 1,
      padding: theme.spacing * 2,
      backgroundColor: theme.colors.palette.common.white,
      maxWidth: Breakpoints.lg,
      ...(isLgUp && { marginHorizontal: (dimWidth - Breakpoints.lg) / 2 }),
    },
  });
};
