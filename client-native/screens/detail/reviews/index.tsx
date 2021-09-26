import React from "react";
import { Text } from "react-native";

interface Props {
  productId: string;
}

const Reviews = ({ productId }: Props) => {
  return <Text>Reviews{productId}</Text>;
};

Reviews.displayName = "Reviews";
export default Reviews;
