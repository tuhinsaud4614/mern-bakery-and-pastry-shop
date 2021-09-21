import { StyleSheet } from "react-native";
import theme from "../../shared/theme";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#b9f6ca",
  },
  featured: {
    position: "absolute",
    top: theme.spacing,
    left: theme.spacing,
    borderRadius: 0,
    zIndex: 1,
    backgroundColor: theme.colors.palette.secondary.main,
    color: theme.colors.palette.secondary.contrastText,
    paddingHorizontal: theme.spacing,
    paddingVertical: theme.spacing / 2,
  },
});

export default styles;
