import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, useTheme } from "react-native-paper";
import BottomSheet from "../../../components/bottom-sheet";
import { typographyStyles } from "../../../shared/utils/common.styles";
import ByCategory from "./by-category";
import ByPrice from "./by-price";
import ByRating from "./by-rating";

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
        showBackdrop
        onDismiss={() => {
          setShowBottomSheet(false);
        }}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={Platform.OS === "web"}
          contentContainerStyle={{ padding: theme.spacing * 2 }}
        >
          <ByCategory />
          <ByPrice />
          <ByRating />
        </KeyboardAwareScrollView>
      </BottomSheet>
    </View>
  );
};
Filters.displayName = "Filters";
export default Filters;
