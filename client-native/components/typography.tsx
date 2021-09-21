import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";
import { useTheme } from "react-native-paper";
import { typographyStyles } from "../shared/utils/common.styles";
import {
  GutterType,
  TextAlignType,
  TextTransformType,
  TypographyVariantType,
} from "../shared/utils/types";

interface Props extends TextProps {
  variant?: TypographyVariantType;
  style?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
  gutter?: GutterType;
  textAlign?: TextAlignType;
  textTransform?: TextTransformType;
  children: ReactNode;
}
const Typography = ({
  children,
  style,
  gutter,
  variant = "inherit",
  textAlign,
  textTransform,
  ...rest
}: Props) => {
  const theme = useTheme();
  return (
    <Text
      style={StyleSheet.flatten([
        style && style,
        {
          textAlign: textAlign,
          textTransform: textTransform,
          [`margin${gutter}`]: theme.spacing,
        },

        typographyStyles[variant],
      ])}
      {...rest}
    >
      {children}
    </Text>
  );
};

Typography.displayName = "Typography";
export default Typography;
