import { Octicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";

function Spinner({
  size = 80,
  style,
}: {
  size?: number;
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
}) {
  const theme = useTheme();

  const aniValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(aniValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotation = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <Animated.View
      style={StyleSheet.flatten([style, { transform: [{ rotate: rotation }] }])}
    >
      <Octicons
        name="gear"
        size={size}
        color={theme.colors.palette.secondary.main}
      />
    </Animated.View>
  );
}

export default Spinner;
