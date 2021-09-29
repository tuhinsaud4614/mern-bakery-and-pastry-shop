import { StyleSheet } from "react-native";

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    info: {
      backgroundColor: theme.colors.palette.accent,
      display: "flex",
    },
    infoTitle: {
      color: theme.colors.palette.primary.main,
    },
    relatedProducts: {
      marginTop: theme.spacing * 2,
    },
  });
};

export default makeStyles;
