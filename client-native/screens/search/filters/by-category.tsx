import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { List, TouchableRipple, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import ListHeader from "./list-header";

const ByCategory = ({ expendable = true }: { expendable?: boolean }) => {
  const theme = useTheme();

  const content = Array.from({ length: 5 }).map((_, index) => (
    <TouchableRipple style={{ paddingLeft: 0 }} key={index} onPress={() => {}}>
      <View style={{ padding: theme.spacing }}>
        <Typography
          variant="body2"
          style={{ color: theme.colors.palette.text.primary }}
        >
          {"list " + index}
        </Typography>
      </View>
    </TouchableRipple>
  ));
  if (expendable) {
    return (
      <List.Accordion
        title="Category"
        style={{ paddingVertical: 0 }}
        titleNumberOfLines={1}
        theme={{ colors: { primary: theme.colors.palette.secondary.main } }}
        left={(props) => <MaterialIcons size={16} {...props} name="category" />}
      >
        <View style={{ paddingLeft: theme.spacing, padding: theme.spacing }}>
          {content}
        </View>
      </List.Accordion>
    );
  }
  return (
    <ListHeader
      title="Category"
      left={(props) => <MaterialIcons size={16} {...props} name="category" />}
    >
      {content}
    </ListHeader>
  );
};

ByCategory.displayName = "Filter.ByCategory";

export default ByCategory;
