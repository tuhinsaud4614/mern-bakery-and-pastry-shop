import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { useTheme } from "react-native-paper";

interface Props {
  image: ImageSourcePropType;
}

const ProductImage = ({ image }: Props) => {
  const theme = useTheme();
  return (
    <Image
      source={image}
      style={{ height: 200, width: "100%", borderRadius: theme.spacing }}
      resizeMode="cover"
    />
  );
};

ProductImage.displayName = "ProductImage";
export default ProductImage;
