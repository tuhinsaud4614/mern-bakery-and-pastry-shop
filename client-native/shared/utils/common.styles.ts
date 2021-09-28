import { StyleSheet, TextStyle } from "react-native";
import { TypographyVariantType } from "./types";

export const INITIAL_FONT_SIZE = 16;
const FONT_SIZE = 14;
export const typographyStyles = StyleSheet.create<{
  [key in TypographyVariantType]: TextStyle;
}>({
  body1: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 1 * FONT_SIZE,
    letterSpacing: 0.00938 * FONT_SIZE,
  },
  body2: {
    fontFamily: "Raleway_300Light",
    fontWeight: "300",
    fontSize: 0.875 * FONT_SIZE,
    letterSpacing: 0.01071 * FONT_SIZE,
  },
  button: {
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    fontSize: 0.875 * FONT_SIZE,
    letterSpacing: 0.02857 * FONT_SIZE,
  },
  caption: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 0.75 * FONT_SIZE,
    letterSpacing: 0.03333 * FONT_SIZE,
  },
  h1: {
    fontFamily: "Raleway_300Light",
    fontWeight: "300",
    fontSize: 6 * FONT_SIZE,
    letterSpacing: -0.01562 * FONT_SIZE,
  },
  h2: {
    fontFamily: "Raleway_300Light",
    fontWeight: "300",
    fontSize: 3.75 * FONT_SIZE,
    letterSpacing: -0.00833 * FONT_SIZE,
  },
  h3: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 3 * FONT_SIZE,
    letterSpacing: 0 * FONT_SIZE,
  },
  h4: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 2.125 * FONT_SIZE,
    letterSpacing: 0.00735 * FONT_SIZE,
  },
  h5: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 1.5 * FONT_SIZE,
    letterSpacing: 0 * FONT_SIZE,
  },
  h6: {
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    fontSize: 1.25 * FONT_SIZE,
    letterSpacing: 0.0075 * FONT_SIZE,
  },
  inherit: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "normal",
    fontSize: FONT_SIZE,
  },
  overline: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 0.75 * FONT_SIZE,
    letterSpacing: 0.08333 * FONT_SIZE,
  },
  subtitle1: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 1 * FONT_SIZE,
    letterSpacing: 0.00938 * FONT_SIZE,
  },
  subtitle2: {
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    fontSize: 0.875 * FONT_SIZE,
    letterSpacing: 0.00714 * FONT_SIZE,
  },
});
