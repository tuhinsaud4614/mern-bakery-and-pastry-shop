import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { RootNavigationProps } from "../../../shared/routes";
import { breakpointsWithDimensions } from "../../../shared/utils";
import { IProduct } from "../../../shared/utils/interfaces";

interface Props {
  product: IProduct;
}

const FilteredProduct = ({ product }: Props) => {
  const { navigate }: RootNavigationProps = useNavigation();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp],
    width,
  } = breakpointsWithDimensions.up(["sm"]);

  const imageWidth = isSmUp ? 190 : 120;
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
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />
        <View style={styles.content}>
          <Typography
            variant={isSmUp ? "h6" : "body2"}
            textTransform="capitalize"
            style={{
              color: theme.colors.palette.text.primary,
              fontWeight: "700",
            }}
            numberOfLines={2}
          >
            {/* {product.title} */}
            Selowin Womens Halloween Costume Skeleton Print Bodysuit Skinny
            Catsuit Jumpsuit
          </Typography>
          <View style={[styles.ratingBox, { marginTop: theme.spacing * 0.5 }]}>
            <View style={styles.ratingBox}>
              {Array.from({ length: 5 }).map((_, index) => (
                <AntDesign
                  key={index}
                  name={product.totalRatings >= index + 1 ? "star" : "staro"}
                  size={isSmUp ? 14 : 10}
                  color={
                    product.totalRatings >= index + 1
                      ? theme.colors.palette.secondary.main
                      : theme.colors.palette.text.secondary
                  }
                />
              ))}
              <Typography
                variant={isSmUp ? "body2" : "caption"}
                style={{ color: theme.colors.palette.text.secondary }}
              >
                {" "}
                ({product.totalRatings})
              </Typography>
            </View>
          </View>
          <Typography
            variant={isSmUp ? "h5" : "body1"}
            style={{
              color: theme.colors.palette.primary.main,
              fontWeight: "700",
            }}
          >
            {typeof product.price !== "number"
              ? `${product.price.small}৳ - ${product.price.extraLarge}৳`
              : `${product.price}৳`}{" "}
            <Typography
              variant={isSmUp ? "body1" : "caption"}
              style={{
                textDecorationLine: "line-through",
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
      flexWrap: "wrap",
    },
    content: {
      paddingHorizontal: theme.spacing,
      flex: 1,
    },
    ratingBox: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
};
