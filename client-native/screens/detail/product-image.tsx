import React from "react";
import { Image, ImageSourcePropType } from "react-native";

interface Props {
  image: ImageSourcePropType;
}

const ProductImage = ({ image }: Props) => {
  return (
    <Image
      source={image}
      style={{ height: 200, width: "100%" }}
      resizeMode="cover"
    />
  );
};

ProductImage.displayName = "ProductImage";
export default ProductImage;
