import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import BottomSheet from "../../components/bottom-sheet";
import { typographyStyles } from "../../shared/utils/common.styles";
import { SortByFilterType } from "../../shared/utils/types";

interface Props {
  onChange(value: SortByFilterType): void;
  value: SortByFilterType;
}

const Filters = () => {
  const theme = useTheme();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  return (
    <View style={{ paddingLeft: theme.spacing, paddingTop: theme.spacing }}>
      <Button
        onPress={() => setShowBottomSheet(true)}
        mode="outlined"
        labelStyle={typographyStyles.caption}
        style={{
          borderColor: theme.colors.palette.secondary.light,
        }}
        color={theme.colors.palette.secondary.main}
        icon={(props) => <Entypo {...props} name="chevron-down" />}
      >
        Filters
      </Button>
      <BottomSheet
        show={showBottomSheet}
        onBackdropDismiss
        onDismiss={() => {
          setShowBottomSheet(false);
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <Text key={index}>Hello - {index + 1}</Text>
        ))}
      </BottomSheet>
    </View>
  );
};
Filters.displayName = "Filters";
export default Filters;
