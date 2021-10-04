import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { List, useTheme } from "react-native-paper";
import { typographyStyles } from "../../../shared/utils/common.styles";

const ByCategory = () => {
  const theme = useTheme();
  return (
    <List.Accordion
      title="Category"
      style={{ paddingVertical: 0 }}
      titleNumberOfLines={1}
      theme={{ colors: { primary: theme.colors.palette.secondary.main } }}
      left={(props) => <MaterialIcons size={16} {...props} name="category" />}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <List.Item
          key={index}
          title={"list " + index}
          style={{ padding: 0 }}
          titleStyle={[
            typographyStyles.body2,
            { color: theme.colors.palette.text.primary },
          ]}
        />
      ))}
    </List.Accordion>
  );
};

ByCategory.displayName = "Filter.ByCategory";

export default ByCategory;
