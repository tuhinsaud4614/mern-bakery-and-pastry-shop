import React, { Fragment } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { IReview } from "../../../../shared/utils/interfaces";
import AddReview from "./add-review";
import Review from "./review";

interface Props {
  productId: string;
}

const data: IReview[] = [
  {
    id: "123",
    reviewer: {
      id: "abc",
      name: "xyz",
    },
    text: "This is good",
    ratings: 3,
  },
  {
    id: "456",
    reviewer: {
      id: "abc",
      name: "xyz",
    },
    text: "This is good",
    ratings: 3,
  },
];

const Reviews = ({ productId }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Fragment>
      <AddReview />
      <FlatList
        showsVerticalScrollIndicator={Platform.OS === "web"}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.spacer} />}
        data={data}
        renderItem={({ item }) => <Review data={item} />}
        keyExtractor={({ id }) => id}
      />
    </Fragment>
  );
};

Reviews.displayName = "Reviews";
export default Reviews;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    list: {
      marginTop: theme.spacing * 2,
      maxHeight: 400,
    },
    spacer: {
      marginVertical: theme.spacing * 2,
    },
  });
};
