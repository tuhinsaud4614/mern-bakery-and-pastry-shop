import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { Searchbar, TouchableRipple, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { boxShadow } from "../../../shared/utils";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onKeyPress={onKeyPress}
        onIconPress={onSubmit}
        style={styles.searchBar}
        iconColor={theme.colors.palette.secondary.main}
      />
      {searchQuery ? (
        <View style={styles.searchResult}>
          <FlatList
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
        </View>
      ) : null}
    </View>
  );
};

SearchBox.displayName = "SearchBox";
export default SearchBox;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  const shadow = boxShadow(4, 3);
  return StyleSheet.create({
    searchBar: {
      backgroundColor: theme.colors.palette.accent,
    },
    searchResult: {
      flex: 1,
      position: "absolute",
      top: theme.spacing * 7,
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
  });
};
