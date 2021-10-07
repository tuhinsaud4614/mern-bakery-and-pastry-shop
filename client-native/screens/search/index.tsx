import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import { boxShadow, breakpoints } from "../../shared/utils";
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
  const isSmUp = breakpoints.up("sm");

  return (
    <TabScreenWrapper component="flat-list">
      <View style={{ flexDirection: "row", flex: 1 }}>
        {isSmUp && (
          <View style={styles.filterList}>
            <ByCategory expendable={false} />
            <ByPrice expendable={false} />
            <ByRating expendable={false} />
          </View>
        )}
        <View
          style={StyleSheet.flatten([
            styles.filterContent,
            isSmUp && { paddingLeft: theme.spacing * 2 },
          ])}
        >
          <SearchBox />
          <View style={styles.filterBox}>
            {!isSmUp && <Filters />}
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
      width: 250,
      borderRightWidth: 1,
      borderRightColor: theme.colors.palette.divider,
    },
    filterContent: {
      flex: 1,
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
      position: "relative",
      zIndex: -1,
    },
  });
};
