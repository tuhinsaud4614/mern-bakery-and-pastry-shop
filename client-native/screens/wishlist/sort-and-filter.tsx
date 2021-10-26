import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu, useTheme } from "react-native-paper";
import { typographyStyles } from "../../shared/utils/common.styles";
import {
  WishlistFilterType,
  WishlistSortByType,
} from "../../shared/utils/types";

const sortOptions: { name: string; value: WishlistSortByType }[] = [
  { name: "Price (low to high)", value: "PRICE_LOW_TO_HIGH" },
  { name: "Price (high to low)", value: "PRICE_HIGH_TO_LOW" },
  { name: "Default", value: "DEFAULT" },
];

const filterOptions: { name: string; value: WishlistFilterType }[] = [
  { name: "All items", value: "ALL_ITEMS" },
  { name: "Purchased", value: "PURCHASED" },
  { name: "Unpurchased", value: "UNPURCHASED" },
];

const SortAndFilter = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [showSortBtn, setShowSortBtn] = useState<boolean>(false);
  const [showFilterByBtn, setShowFilterBtn] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<WishlistSortByType>("DEFAULT");
  const [filterValue, setFilterValue] =
    useState<WishlistFilterType>("UNPURCHASED");

  const onSortChangeHandler = (value: WishlistSortByType) => {
    setShowSortBtn(false);
    setSortValue(value);
  };

  const onFilterChangeHandler = (value: WishlistFilterType) => {
    setShowFilterBtn(false);
    setFilterValue(value);
  };

  return (
    <View style={styles.root}>
      <Menu
        visible={showSortBtn}
        onDismiss={() => setShowSortBtn(false)}
        anchor={
          <Button
            onPress={() => setShowSortBtn(true)}
            mode="outlined"
            labelStyle={typographyStyles.caption}
            color={theme.colors.palette.secondary.main}
            style={styles.anchor}
          >
            Sort:{" "}
            {sortOptions.find((option) => option.value === sortValue)?.name}
          </Button>
        }
      >
        {sortOptions.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => onSortChangeHandler(option.value)}
            titleStyle={StyleSheet.flatten([
              styles.sortByOptionTitle,
              sortValue === option.value && {
                color: theme.colors.palette.secondary.main,
              },
            ])}
            title={option.name}
          />
        ))}
      </Menu>
      <Menu
        visible={showFilterByBtn}
        onDismiss={() => setShowFilterBtn(false)}
        anchor={
          <Button
            onPress={() => setShowFilterBtn(true)}
            mode="outlined"
            labelStyle={typographyStyles.caption}
            color={theme.colors.palette.secondary.main}
            style={styles.anchor}
          >
            Filter:{" "}
            {filterOptions.find((option) => option.value === filterValue)?.name}
          </Button>
        }
      >
        {filterOptions.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => onFilterChangeHandler(option.value)}
            titleStyle={StyleSheet.flatten([
              styles.sortByOptionTitle,
              filterValue === option.value && {
                color: theme.colors.palette.secondary.main,
              },
            ])}
            title={option.name}
          />
        ))}
      </Menu>
    </View>
  );
};
SortAndFilter.displayName = "SortAndFilter";
export default SortAndFilter;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.background.default,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: theme.spacing,
      paddingBottom: theme.spacing,
      borderRadius: theme.spacing * 0.5,
    },
    anchor: {
      marginLeft: theme.spacing,
      marginTop: theme.spacing,
      borderColor: theme.colors.palette.secondary.light,
    },
    sortByOptionTitle: {
      ...typographyStyles.caption,
      color: theme.colors.palette.text.primary,
    },
  });
};
