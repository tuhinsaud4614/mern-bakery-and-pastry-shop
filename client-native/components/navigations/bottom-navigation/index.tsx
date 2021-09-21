import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import theme from "../../../shared/theme";
import Typography from "../../typography";
import useStyles from "./index.styles";

const BottomNavigation = () => {
  const styles = useMemo(() => {
    return useStyles(theme);
  }, []);
  return (
    <View style={StyleSheet.flatten([styles.root])}>
      <TouchableRipple
        onPress={() => {
          console.log("Home button press");
        }}
      >
        <View style={styles.item}>
          <AntDesign
            name="home"
            size={20}
            color={theme.colors.palette.common.white}
          />
          <Typography
            variant="button"
            style={{ color: theme.colors.palette.common.white }}
          >
            Home
          </Typography>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          console.log("Search button press");
        }}
      >
        <View style={styles.item}>
          <AntDesign
            name="search1"
            size={20}
            color={theme.colors.palette.common.white}
          />
          <Typography
            variant="button"
            style={{ color: theme.colors.palette.common.white }}
          >
            Search
          </Typography>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          console.log("Wishlist button press");
        }}
      >
        <View style={styles.item}>
          <AntDesign
            name="heart"
            size={20}
            color={theme.colors.palette.common.white}
          />
          <Typography
            variant="button"
            style={{ color: theme.colors.palette.common.white }}
          >
            Wishlist
          </Typography>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          console.log("Cart button press");
        }}
      >
        <View style={styles.item}>
          <Entypo
            name="shopping-bag"
            size={20}
            color={theme.colors.palette.common.white}
          />
          <Typography
            variant="button"
            style={{ color: theme.colors.palette.common.white }}
          >
            Cart
          </Typography>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          console.log("User button press");
        }}
      >
        <View style={styles.item}>
          <AntDesign
            name="user"
            size={20}
            color={theme.colors.palette.secondary.light}
          />
          <Typography
            variant="button"
            style={{ color: theme.colors.palette.common.white }}
          >
            User
          </Typography>
        </View>
      </TouchableRipple>
    </View>
  );
};

BottomNavigation.displayName = "BottomNavigation";
export default BottomNavigation;
