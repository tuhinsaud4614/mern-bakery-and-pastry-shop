import { StyleSheet, TextStyle } from "react-native";
import { TypographyVariantType } from "./types";

export const INITIAL_FONT_SIZE = 16;
export const typographyStyles = StyleSheet.create<{
  [key in TypographyVariantType]: TextStyle;
}>({
  body1: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 1 * INITIAL_FONT_SIZE,
    letterSpacing: 0.00938 * INITIAL_FONT_SIZE,
  },
  body2: {
    fontFamily: "Raleway_300Light",
    fontWeight: "300",
    fontSize: 0.875 * INITIAL_FONT_SIZE,
    letterSpacing: 0.01071 * INITIAL_FONT_SIZE,
  },
  button: {
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    fontSize: 0.875 * INITIAL_FONT_SIZE,
    letterSpacing: 0.02857 * INITIAL_FONT_SIZE,
  },
  caption: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 0.75 * INITIAL_FONT_SIZE,
    letterSpacing: 0.03333 * INITIAL_FONT_SIZE,
  },
  h1: {
    fontFamily: "Raleway_300Light",
    fontWeight: "300",
    fontSize: 6 * INITIAL_FONT_SIZE,
    letterSpacing: -0.01562 * INITIAL_FONT_SIZE,
  },
  h2: {
    fontFamily: "Raleway_300Light",
    fontWeight: "300",
    fontSize: 3.75 * INITIAL_FONT_SIZE,
    letterSpacing: -0.00833 * INITIAL_FONT_SIZE,
  },
  h3: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 3 * INITIAL_FONT_SIZE,
    letterSpacing: 0 * INITIAL_FONT_SIZE,
  },
  h4: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 2.125 * INITIAL_FONT_SIZE,
    letterSpacing: 0.00735 * INITIAL_FONT_SIZE,
  },
  h5: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 1.5 * INITIAL_FONT_SIZE,
    letterSpacing: 0 * INITIAL_FONT_SIZE,
  },
  h6: {
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    fontSize: 1.25 * INITIAL_FONT_SIZE,
    letterSpacing: 0.0075 * INITIAL_FONT_SIZE,
  },
  inherit: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "normal",
    fontSize: INITIAL_FONT_SIZE,
  },
  overline: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 0.75 * INITIAL_FONT_SIZE,
    letterSpacing: 0.08333 * INITIAL_FONT_SIZE,
  },
  subtitle1: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
    fontSize: 1 * INITIAL_FONT_SIZE,
    letterSpacing: 0.00938 * INITIAL_FONT_SIZE,
  },
  subtitle2: {
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    fontSize: 0.875 * INITIAL_FONT_SIZE,
    letterSpacing: 0.00714 * INITIAL_FONT_SIZE,
  },
});
