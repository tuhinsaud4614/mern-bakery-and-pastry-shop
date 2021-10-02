import { Entypo } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { Text } from "react-native";
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
    <Fragment>
      <Button
        onPress={() => setShowBottomSheet(true)}
        mode="outlined"
        labelStyle={typographyStyles.caption}
        style={{ borderColor: theme.colors.palette.secondary.light }}
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
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
      </BottomSheet>
    </Fragment>
  );
};
Filters.displayName = "Filters";
export default Filters;
