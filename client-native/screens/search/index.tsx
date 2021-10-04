import React, { useEffect, useRef } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { Searchbar, TouchableRipple, useTheme } from "react-native-paper";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import Typography from "../../components/typography";
import { boxShadow } from "../../shared/utils";
import { SortByFilterType } from "../../shared/utils/types";
import Filters from "./filters";
import SortByFilter from "./sortBy-filter";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortByValue, setSortByValue] =
    React.useState<SortByFilterType>("FEATURED");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const styles = makeStyles(theme);

  const onSubmit = () => {
    console.log("submit");
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onSubmit();
    }, 250);
  };

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <TabScreenWrapper keyBoardAvoiding>
      <Searchbar
        placeholder="Search..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onKeyPress={onKeyPress}
        onIconPress={onSubmit}
        style={styles.searchBar}
        iconColor={theme.colors.palette.secondary.main}
      />
      <View>
        {searchQuery ? (
          <FlatList
            style={styles.searchResult}
            data={Array.from({ length: 4 })}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ index, item }) => (
              <TouchableRipple onPress={() => {}}>
                <Typography variant="body2" style={styles.searchResultItem}>
                  {index.toString()}
                </Typography>
              </TouchableRipple>
            )}
          />
        ) : null}
      </View>
      <View style={styles.filterBox}>
        <Filters />
        <SortByFilter
          value={sortByValue}
          onChange={(value) => setSortByValue(value)}
        />
      </View>
    </TabScreenWrapper>
  );
};
SearchScreen.displayName = "SearchScreen";
export default SearchScreen;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  const shadow = boxShadow(4, 3);
  return StyleSheet.create({
    searchBar: {
      backgroundColor: theme.colors.palette.accent,
    },
    searchResult: {
      position: "absolute",
      top: theme.spacing * 2,
      left: 0,
      right: 0,
      borderRadius: theme.spacing * 0.5,
      backgroundColor: theme.colors.palette.accent,
      ...shadow,
    },
    searchResultItem: {
      padding: theme.spacing,
      color: theme.colors.palette.text.primary,
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
