import { StyleSheet, TextStyle } from "react-native";
import { TypographyVariantType } from "./types";
//
export const INITIAL_FONT_SIZE = 16;
export const typographyStyles = StyleSheet.create<{
  [key in TypographyVariantType]: TextStyle;
}>({
  body1: {
    fontFamily: "'RalewayRegular', 'Arial', sans-serif",
    fontWeight: "400",
    fontSize: 1 * INITIAL_FONT_SIZE,
    // lineHeight: 1.5,
    letterSpacing: 0.00938 * INITIAL_FONT_SIZE,
  },
  body2: {
    fontFamily: "'RalewayLight', 'Arial', sans-serif",
    fontWeight: "300",
    fontSize: 0.875 * INITIAL_FONT_SIZE,
    // lineHeight: 1.43,
    letterSpacing: 0.01071 * INITIAL_FONT_SIZE,
  },
  button: {
    fontFamily: "'RalewayMedium', 'Arial', sans-serif",
    fontWeight: "500",
    fontSize: 0.875 * INITIAL_FONT_SIZE,
    // lineHeight: 1.75,
    letterSpacing: 0.02857 * INITIAL_FONT_SIZE,
  },
  caption: {
    fontFamily: "'RalewayRegular', 'Arial', sans-serif",
    fontWeight: "400",
    fontSize: 0.75 * INITIAL_FONT_SIZE,
    // lineHeight: 1.66,
    letterSpacing: 0.03333 * INITIAL_FONT_SIZE,
  },
  h1: {
    fontFamily: "'RalewayLight', 'Arial', sans-serif",
    fontWeight: "300",
    fontSize: 6 * INITIAL_FONT_SIZE,
    // lineHeight: 1.167,
    letterSpacing: -0.01562 * INITIAL_FONT_SIZE,
  },
  h2: {
    fontFamily: "'RalewayLight', 'Arial', sans-serif",
    fontWeight: "300",
    fontSize: 3.75 * INITIAL_FONT_SIZE,
    // lineHeight: 1.2,
    letterSpacing: -0.00833 * INITIAL_FONT_SIZE,
  },
  h3: {
    fontFamily: "'RalewayRegular', 'Arial', sans-serif",
    fontWeight: "400",
    fontSize: 3 * INITIAL_FONT_SIZE,
    // lineHeight: 1.167,
    letterSpacing: 0 * INITIAL_FONT_SIZE,
  },
  h4: {
    fontFamily: "'RalewayRegular', 'Arial', sans-serif",
    fontWeight: "400",
    fontSize: 2.125 * INITIAL_FONT_SIZE,
    // lineHeight: 1.235,
    letterSpacing: 0.00735 * INITIAL_FONT_SIZE,
  },
  h5: {
    fontFamily: "'RalewayRegular', 'Arial', sans-serif",
    fontWeight: "400",
    fontSize: 1.5 * INITIAL_FONT_SIZE,
    // lineHeight: 1.334,
    letterSpacing: 0 * INITIAL_FONT_SIZE,
  },
  h6: {
    fontFamily: "'RalewayMedium', 'Arial', sans-serif",
    fontWeight: "500",
    fontSize: 1.25 * INITIAL_FONT_SIZE,
    // lineHeight: 1.6,
    letterSpacing: 0.0075 * INITIAL_FONT_SIZE,
  },
  inherit: {
    fontFamily: "'RalewayRegular', 'Arial', sans-serif",
    fontWeight: "normal",
    fontSize: INITIAL_FONT_SIZE,
  },
  overline: {
    fontFamily: "'RalewayRegular', 'Arial', sans-serif",
    fontWeight: "400",
    fontSize: 0.75 * INITIAL_FONT_SIZE,
    // lineHeight: 2.66,
    letterSpacing: 0.08333 * INITIAL_FONT_SIZE,
  },
  subtitle1: {
    fontFamily: "'RalewayRegular', 'Arial', sans-serif",
    fontWeight: "400",
    fontSize: 1 * INITIAL_FONT_SIZE,
    // lineHeight: 1.75,
    letterSpacing: 0.00938 * INITIAL_FONT_SIZE,
  },
  subtitle2: {
    fontFamily: "'RalewayMedium', 'Arial', sans-serif",
    fontWeight: "500",
    fontSize: 0.875 * INITIAL_FONT_SIZE,
    // lineHeight: 1.57,
    letterSpacing: 0.00714 * INITIAL_FONT_SIZE,
  },
});
