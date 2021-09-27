import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import Typography from "../../../../components/typography";
import { IReview } from "../../../../shared/utils/interfaces";

interface Props {
  data: IReview;
}

const Review = ({ data }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.item}>
      <View>
        <Typography
          variant="button"
          style={styles.reviewer}
          textTransform="uppercase"
        >
          {data.reviewer.name}
        </Typography>
        <Typography variant="body1" style={styles.review}>
          {data.text}
        </Typography>
        <View style={styles.ratings}>
          {Array.from({ length: 5 }).map((_, index) => (
            <AntDesign
              key={index}
              name={data.ratings >= index + 1 ? "star" : "staro"}
              size={15}
              color={
                data.ratings >= index + 1
                  ? theme.colors.palette.secondary.main
                  : theme.colors.palette.text.secondary
              }
            />
          ))}
        </View>
      </View>
      <IconButton
        size={16}
        color={theme.colors.palette.secondary.main}
        icon={({ size, color }) => (
          <Entypo name="dots-three-vertical" size={size} color={color} />
        )}
      />
    </View>
  );
};

Review.displayName = "Review";
export default Review;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    item: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    reviewer: {
      color: theme.colors.palette.text.primary,
      fontSize: 16,
    },
    review: {
      color: theme.colors.palette.text.secondary,
    },
    ratings: {
      marginTop: theme.spacing * 0.5,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });
};
