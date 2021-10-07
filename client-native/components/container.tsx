import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import { Breakpoints, breakpointsWithDimensions } from "../shared/utils";

const Container = ({
  children,
  classes,
  component = "scroll-view",
  contentContainerStyle,
}: {
  children?: ReactNode;
  classes?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  contentContainerStyle?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  component?: "flat-list" | "scroll-view";
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

  if (component === "scroll-view") {
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
    <KeyboardAwareFlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      style={style}
      ListHeaderComponent={
        <View
          style={StyleSheet.flatten([
            contentContainerStyle,
            { padding: theme.spacing * 2 },
          ])}
        >
          {children}
        </View>
      }
    >
      {children}
    </KeyboardAwareFlatList>
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
