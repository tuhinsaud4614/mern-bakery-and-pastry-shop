import React from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Pagination from "../../components/pagination";
import { dummyProducts } from "../../dummy-data";
import WishlistItem from "./item";

const WishlistItems = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      <FlatList
        showsVerticalScrollIndicator={Platform.OS === "web"}
        data={Array.from({ length: 10 }).map(() => ({
          ...dummyProducts[0],
          title: "Lorem ipsum dolor sit ",
        }))}
        renderItem={({ item }) => <WishlistItem product={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
      <Pagination />
    </View>
  );
};

WishlistItems.displayName = "Wishlist.Items";
export default WishlistItems;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      marginTop: theme.spacing * 3,
    },
  });
};
