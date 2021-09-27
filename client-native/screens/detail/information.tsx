import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import Ratings from "../../components/ratings";
import Typography from "../../components/typography";
import { IProduct } from "../../shared/utils/interfaces";
import AddToCart from "./add-to-cart";

interface Props {
  isSmUp: boolean;
  product: IProduct;
}

const Information = ({ isSmUp, product }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        isSmUp && { flex: 1, paddingLeft: theme.spacing * 2 },
      ])}
    >
      <Typography
        variant={isSmUp ? "h4" : "h5"}
        style={styles.title}
        textTransform="capitalize"
      >
        {product.title}
      </Typography>
      <Ratings
        count={5}
        // onRatingComplete={(rating) => setRating(rating)}
        classes={{ wrapper: { paddingHorizontal: 0 } }}
        percentage
      />
      <Divider
        style={{
          marginVertical: theme.spacing,
          maxWidth: 100,
          backgroundColor: theme.colors.palette.primary.light,
        }}
      />
      <Typography
        variant={isSmUp ? "h5" : "h6"}
        style={{ color: theme.colors.palette.text.primary }}
      >
        {typeof product.price === "number"
          ? `${product.price}৳`
          : `${product.price.small}৳ - ${product.price.extraLarge}৳`}
      </Typography>
      {product.ingredients && product.ingredients.length && (
        <Typography
          variant={isSmUp ? "body1" : "body2"}
          style={{
            paddingTop: theme.spacing,
            color: theme.colors.palette.text.secondary,
          }}
          textTransform="capitalize"
        >
          Ingredients - {product.ingredients.join(", ")}
        </Typography>
      )}
      <AddToCart product={product} />
    </View>
  );
};

Information.displayName = "Detail.Information";
export default Information;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      width: "100%",
    },
    title: {
      color: theme.colors.palette.primary.main,
    },
    cartActionBtn: {
      borderColor: theme.colors.palette.secondary.main,
      borderWidth: 1,
      borderRadius: 0,
      margin: 0,
    },
    cartActionLeftBtn: {
      borderTopLeftRadius: theme.spacing * 0.5,
      borderBottomLeftRadius: theme.spacing * 0.5,
    },
    cartActionRightBtn: {
      borderTopRightRadius: theme.spacing * 0.5,
      borderBottomRightRadius: theme.spacing * 0.5,
    },
  });
};
