import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";

const ByRating = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <List.Accordion
      title="Customer Ratings"
      style={{ paddingVertical: 0 }}
      titleNumberOfLines={1}
      theme={{ colors: { primary: theme.colors.palette.secondary.main } }}
      left={(props) => <AntDesign name={"staro"} size={16} {...props} />}
    >
      <View style={styles.itemTag}>
        {Array.from({ length: 4 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {}}
            style={StyleSheet.flatten([
              styles.item,
              {
                backgroundColor:
                  index === 0
                    ? theme.colors.palette.accent
                    : theme.colors.palette.action.disabledBackground,
              },
            ])}
          >
            {Array.from({ length: 4 - index }).map((_, i) => (
              <AntDesign
                key={i}
                name={"star"}
                size={16}
                color={theme.colors.palette.secondary.main}
              />
            ))}

            <Typography
              variant="body2"
              style={{
                color:
                  index === 0
                    ? theme.colors.palette.primary.dark
                    : theme.colors.palette.text.primary,
                fontWeight: "700",
              }}
            >
              {"  & up"}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </List.Accordion>
  );
};

ByRating.displayName = "Filter.ByRating";

export default ByRating;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    itemTag: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      paddingLeft: 0,
      paddingBottom: theme.spacing,
      paddingRight: theme.spacing,
    },
    item: {
      padding: theme.spacing,
      borderRadius: theme.spacing * 0.5,
      marginTop: theme.spacing,
      marginLeft: theme.spacing,
      flexDirection: "row",
      alignItems: "center",
    },
  });
};
