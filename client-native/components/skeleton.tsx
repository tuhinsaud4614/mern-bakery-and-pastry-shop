import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { SkeletonVariantType } from "../shared/utils/types";

interface Props {
  variant: SkeletonVariantType;
  width?: number;
  height?: number;
  animated?: boolean;
  percentageX?: boolean;
  percentageY?: boolean;
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
}

const Skeleton = ({
  variant,
  height,
  width,
  animated = false,
  percentageX = false,
  percentageY = false,
  style,
}: Props) => {
  const theme = useTheme();
  width = width || height || 20;
  height = height || width || 20;
  const translateX = useRef(new Animated.Value(-width)).current;
  const styles = makeStyles(theme, width, height, percentageX, percentageY);

  useEffect(() => {
    const repeat = () => {
      Animated.timing(translateX, {
        toValue: width || 20,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(translateX, {
          toValue: -(width || 20),
          duration: 1000,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            repeat();
          }
        });
      });
    };
    if (animated) {
      repeat();
    }
  }, [width, animated]);

  let animatedBox = animated && (
    <Animated.View
      style={{
        width: "100%",
        height: "100%",
        transform: [{ translateX: translateX }],
      }}
    >
      <LinearGradient
        style={{ width: "100%", height: "100%" }}
        colors={["transparent", "rgba(0,0,0,0.04)", "transparent"]}
        start={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
  return (
    <View
      style={StyleSheet.flatten([
        styles.common,
        style,
        variant === "circular" && {
          borderRadius: width > height ? width / 2 : height / 2,
        },
        variant === "text" && {
          height: theme.spacing,
          borderRadius: theme.spacing * 0.5,
        },
      ])}
    >
      {animatedBox}
    </View>
  );
};

Skeleton.displayName = "Skeleton";
export default Skeleton;

const makeStyles = (
  theme: ReactNativePaper.Theme,
  width: number,
  height: number,
  percentageX: boolean,
  percentageY: boolean
) =>
  StyleSheet.create({
    common: {
      width: percentageX ? `${width}%` : width,
      height: percentageY ? `${height}%` : height,
      backgroundColor: theme.colors.palette.action.disabledBackground,
      overflow: "hidden",
    },
  });
