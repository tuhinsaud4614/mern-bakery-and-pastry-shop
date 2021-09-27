import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Divider, Surface, useTheme } from "react-native-paper";
import { breakpoints } from "../../shared/utils";
import Typography from "../typography";

interface Props {
  title: string;
  children?: ReactNode;
  classes?: {
    root?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    title?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
  };
}

const ProductBox = ({ title, classes, children }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const isSmUp = breakpoints.up("sm");
  return (
    <Surface style={StyleSheet.flatten([styles.root, classes?.root])}>
      <Typography
        variant={isSmUp ? "h5" : "h6"}
        textTransform="capitalize"
        style={StyleSheet.flatten([styles.title, classes?.title])}
      >
        {title}
      </Typography>
      <Divider />
      {children}
    </Surface>
  );
};

ProductBox.displayName = "ProductBox";
export default ProductBox;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.accent,
      elevation: 3,
      borderRadius: theme.spacing * 0.5,
      overflow: "hidden",
    },
    title: {
      paddingVertical: theme.spacing,
      paddingHorizontal: theme.spacing * 2,
      color: theme.colors.palette.text.primary,
    },
  });
};
