import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SkeletonVariantType } from "../../shared/utils/types";

interface Props {
  variant: SkeletonVariantType;
  width?: number;
  height?: number;
}

const Skeleton = ({ variant, height, width }: Props) => {
  const theme = useTheme();
  width = width || height || 20;
  height = height || width || 20;

  if (variant === "circular") {
    return (
      <View
        style={{
          width: width,
          height: height,
          borderRadius: width > height ? width / 2 : height / 2,
          backgroundColor: theme.colors.palette.action.disabledBackground,
        }}
      />
    );
  }
  return;
};

Skeleton.displayName = "Skeleton";
export default Skeleton;
