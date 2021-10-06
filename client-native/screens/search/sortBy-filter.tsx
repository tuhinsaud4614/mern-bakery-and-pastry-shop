import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Menu, useTheme } from "react-native-paper";
import { typographyStyles } from "../../shared/utils/common.styles";
import { SortByFilterType } from "../../shared/utils/types";

const options: { name: string; value: SortByFilterType }[] = [
  { name: "Low to High (Price)", value: "PRICE_LOW_TO_HIGH" },
  { name: "High to Low (Price)", value: "PRICE_HIGH_TO_LOW" },
  { name: "Avg. Rated", value: "AVERAGE_RATED" },
  { name: "Newest", value: "NEWEST" },
  { name: "Featured", value: "FEATURED" },
];

const SortByFilter = () => {
  const [showSortByBtn, setShowSortByBtn] = useState(false);
  const [sortByValue, setSortByValue] = useState<SortByFilterType>("FEATURED");
  const theme = useTheme();
  const styles = makeStyles(theme);

  const onChangeHandler = (value: SortByFilterType) => {
    setShowSortByBtn(false);
    setSortByValue(value);
  };

  return (
    <Menu
      visible={showSortByBtn}
      onDismiss={() => setShowSortByBtn(false)}
      anchor={
        <Button
          onPress={() => setShowSortByBtn(true)}
          mode="outlined"
          labelStyle={typographyStyles.caption}
          color={theme.colors.palette.secondary.main}
          style={styles.anchor}
        >
          Sort by:{" "}
          {options.find((option) => option.value === sortByValue)?.name}
        </Button>
      }
    >
      {options.map((option) => (
        <Menu.Item
          key={option.value}
          onPress={() => onChangeHandler(option.value)}
          titleStyle={StyleSheet.flatten([
            styles.sortByOptionTitle,
            sortByValue === option.value && {
              color: theme.colors.palette.secondary.main,
            },
          ])}
          title={option.name}
        />
      ))}
    </Menu>
  );
};
SortByFilter.displayName = "Filter.SortBy";
export default SortByFilter;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
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
