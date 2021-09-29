import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import { typographyStyles } from "../shared/utils/common.styles";

const CategorySidebar = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.root}>
      <List.Subheader style={styles.header}>Categories</List.Subheader>
      <ScrollView showsVerticalScrollIndicator={Platform.OS === "web"}>
        {Array.from({ length: 10 }).map((_, index) => (
          <List.Item
            key={index}
            onPress={() => {}}
            title={`Pastry, Cup Pastry & Tart- ${index}`}
            titleStyle={StyleSheet.flatten([
              typographyStyles.body1,
              styles.itemTitle,
            ])}
          />
        ))}
      </ScrollView>
    </View>
  );
};

CategorySidebar.displayName = "CategorySidebar";
export default CategorySidebar;

const makeStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.palette.accent,
    },
    header: {
      backgroundColor: theme.colors.palette.primary.main,
      color: theme.colors.palette.common.white,
      textTransform: "uppercase",
      fontWeight: "700",
      paddingVertical: theme.spacing,
      paddingHorizontal: theme.spacing * 2,
    },
    itemTitle: {
      fontWeight: "700",
      textTransform: "capitalize",
      color: theme.colors.palette.text.primary,
    },
  });
