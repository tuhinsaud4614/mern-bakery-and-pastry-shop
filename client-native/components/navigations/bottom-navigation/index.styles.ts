import { StyleSheet } from "react-native";

const useStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      position: "absolute",
      zIndex: 100,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.palette.primary.main,
      padding: theme.spacing,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      elevation: 3,
      shadowColor: theme.colors.palette.action.disabledBackground,
      shadowRadius: 10,
      //   shadowOpacity: 1,
    },

    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
export default useStyles;
