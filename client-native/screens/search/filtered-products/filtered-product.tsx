import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { RootNavigationProps } from "../../../shared/routes";
import { IProduct } from "../../../shared/utils/interfaces";

interface Props {
  product: IProduct;
}

const FilteredProduct = ({ product }: Props) => {
  const { navigate }: RootNavigationProps = useNavigation();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const imageWidth = 170;
  const imageHeight = (imageWidth / 16) * 9;
  return (
    <TouchableRipple
      onPress={() =>
        navigate("Detail", {
          categoryId: product.category.id,
          productId: product.id,
          title: product.title,
        })
      }
    >
      <View style={styles.root}>
        <Image
          source={require("../../../assets/others.jpeg")}
          resizeMode="cover"
          style={{ width: imageWidth, height: imageHeight }}
        />
        <View style={styles.content}>
          <Typography
            variant="h6"
            textTransform="capitalize"
            style={{ color: theme.colors.palette.text.primary }}
          >
            {product.title}
          </Typography>
          <View style={[styles.ratingBox, { marginTop: theme.spacing * 0.5 }]}>
            <View style={styles.ratingBox}>
              {Array.from({ length: 5 }).map((_, index) => (
                <AntDesign
                  key={index}
                  name={product.totalRatings >= index + 1 ? "star" : "staro"}
                  size={14}
                  color={
                    product.totalRatings >= index + 1
                      ? theme.colors.palette.secondary.main
                      : theme.colors.palette.text.secondary
                  }
                />
              ))}
              <Typography
                variant="body2"
                style={{ color: theme.colors.palette.text.secondary }}
              >
                {" "}
                ({product.totalRatings})
              </Typography>
            </View>
          </View>
          <Typography
            variant="h5"
            style={{ color: theme.colors.palette.primary.main }}
          >
            {typeof product.price !== "number"
              ? `${product.price.small}৳ - ${product.price.extraLarge}৳`
              : `${product.price}৳`}
            <Typography
              variant="body1"
              style={{
                textDecorationLine: "line-through",
                marginLeft: theme.spacing,
                color: theme.colors.palette.text.secondary,
              }}
            >
              {product.off}৳
            </Typography>
          </Typography>
          <Typography
            variant="caption"
            style={{ color: theme.colors.palette.text.secondary }}
          >
            {product.category.title}
          </Typography>
        </View>
      </View>
    </TouchableRipple>
  );
};

FilteredProduct.displayName = "FilteredProduct";
export default FilteredProduct;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      flexDirection: "row",
    },
    content: {
      padding: theme.spacing,
    },
    ratingBox: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
};
