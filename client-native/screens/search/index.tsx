import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import { boxShadow, deviceRange } from "../../shared/utils";
import FilteredProducts from "./filtered-products";
import Filters from "./filters";
import ByCategory from "./filters/by-category";
import ByPrice from "./filters/by-price";
import ByRating from "./filters/by-rating";
import SearchBox from "./search-box";
import SortByFilter from "./sortBy-filter";

const SearchScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { range } = deviceRange();

  return (
    <TabScreenWrapper>
      <View style={{ position: "relative" }}>
        {range !== "xs" && (
          <View style={styles.filterList}>
            <ByCategory />
            <ByPrice />
            <ByRating />
          </View>
        )}
        <View
          style={StyleSheet.flatten([range !== "xs" && styles.filterContent])}
        >
          <SearchBox />
          <View style={styles.filterBox}>
            {range === "xs" && <Filters />}
            <SortByFilter />
          </View>
          <FilteredProducts />
        </View>
      </View>
    </TabScreenWrapper>
  );
};
SearchScreen.displayName = "SearchScreen";
export default SearchScreen;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  const shadow = boxShadow(4, 3);
  return StyleSheet.create({
    filterList: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 250,
      borderRightWidth: 1,
      borderRightColor: theme.colors.palette.divider,
    },
    filterContent: {
      position: "absolute",
      left: 250,
      top: 0,
      right: 0,
      paddingLeft: theme.spacing * 2,
    },
    filterBox: {
      backgroundColor: theme.colors.palette.background.default,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: theme.spacing,
      paddingBottom: theme.spacing,
      marginTop: theme.spacing * 2,
      borderRadius: theme.spacing * 0.5,
      zIndex: -1,
      position: "relative",
    },
  });
};
