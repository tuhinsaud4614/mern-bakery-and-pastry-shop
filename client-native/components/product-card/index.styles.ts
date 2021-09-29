import { StyleSheet } from "react-native";

const makeStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    container: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#b9f6ca",
    },
    ratingAndFav: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    ratingBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    featured: {
      position: "absolute",
      top: theme.spacing,
      left: theme.spacing,
      borderRadius: 0,
      zIndex: 5,
      backgroundColor: theme.colors.palette.secondary.main,
      color: theme.colors.palette.secondary.contrastText,
      paddingHorizontal: theme.spacing,
      paddingVertical: theme.spacing / 2,
    },
    price: {
      paddingHorizontal: theme.spacing / 2,
      fontWeight: "700",
      color: theme.colors.palette.text.primary,
    },
  });

export default makeStyles;
