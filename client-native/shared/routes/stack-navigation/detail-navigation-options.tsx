import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import React from "react";
import { DetailNavigationProps } from "..";
import Typography from "../../../components/typography";
import { boxShadow } from "../../utils";

const detailNavigationOptions = (
  { route }: DetailNavigationProps,
  theme: ReactNativePaper.Theme
): NativeStackNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: theme.colors.palette.primary.main,
      ...boxShadow(3),
    },
    headerTintColor: theme.colors.palette.warning.main,
    headerTitle: () => (
      <Typography
        variant="h6"
        style={{ color: theme.colors.palette.common.white }}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {route.params.title}
      </Typography>
    ),
  };
};

export default detailNavigationOptions;
