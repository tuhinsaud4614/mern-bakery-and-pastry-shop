import { AntDesign } from "@expo/vector-icons";
import React, { memo, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";
import theme from "../shared/theme";
import Typography from "./typography";

interface Props {
  count: number;
  initialValue?: number;
  position?: "left" | "center" | "right";
  percentage?: boolean;
  showText?: boolean;
  size?: number;
  disabled?: boolean;
  onRatingComplete?(rating: number): void;
  classes?: {
    root?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    text1?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
    text2?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
    wrapper?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    container?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    item?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    icon?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
  };
}

const RatingsComponent = ({
  count,
  position,
  initialValue = 0,
  classes,
  percentage = false,
  showText = false,
  disabled = false,
  size = 24,
  onRatingComplete,
}: Props) => {
  const [rating, setRating] = useState(initialValue);
  const theme = useTheme();

  const onChange = (value: number) => {
    setRating(value);
    if (!!onRatingComplete) {
      onRatingComplete(value);
    }
  };
  //   Rating button positions
  let itemPosition: "flex-start" | "center" | "flex-end" = "flex-start";
  if (position === "center") {
    itemPosition = "center";
  } else if (position === "right") {
    itemPosition = "flex-end";
  }

  return (
    <View style={classes?.root}>
      {showText && (
        <Typography
          textAlign={position}
          variant="button"
          style={StyleSheet.flatten([
            classes?.text1 && classes.text1,
            { padding: theme.spacing, paddingBottom: 0 },
          ])}
          textTransform="uppercase"
        >
          Rating:{" "}
          <Typography
            variant="h6"
            style={StyleSheet.flatten([
              classes?.text2 && classes.text2,
              { color: theme.colors.palette.secondary.main },
            ])}
          >
            {percentage
              ? `${rating === 0 ? 0 : (rating * 100) / count}%`
              : rating}
          </Typography>
          {!percentage && `/${count}`}
        </Typography>
      )}

      <View
        style={StyleSheet.flatten([
          classes?.wrapper && classes.wrapper,
          styles.wrapper,
        ])}
      >
        <View
          style={StyleSheet.flatten([
            classes?.container && classes.container,
            styles.container,
            { justifyContent: itemPosition },
          ])}
        >
          {Array.from({ length: count }).map((_, index) => (
            <Pressable
              style={StyleSheet.flatten([
                classes?.item && classes.item,
                styles.item,
              ])}
              key={index}
              onPress={() => {
                if (!disabled) {
                  onChange(index + 1);
                }
              }}
            >
              {({ pressed }) => (
                <AntDesign
                  name={rating >= index + 1 ? "star" : "staro"}
                  size={size}
                  color={
                    rating >= index + 1
                      ? theme.colors.palette.secondary.main
                      : theme.colors.palette.text.secondary
                  }
                  style={StyleSheet.flatten([
                    classes?.icon && classes.container,
                    pressed && { transform: [{ scale: 1.15 }] },
                  ])}
                />
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

RatingsComponent.displayName = "Ratings";
const Ratings = memo(RatingsComponent);
export default Ratings;

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.spacing,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  item: {
    padding: theme.spacing * 0.5,
  },
});
