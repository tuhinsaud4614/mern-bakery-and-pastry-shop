import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import Typography from "../../components/typography";
import { RootNavigationProps } from "../../shared/routes";
import { boxShadow, breakpointsWithDimensions } from "../../shared/utils";
import { typographyStyles } from "../../shared/utils/common.styles";
import { IProduct } from "../../shared/utils/interfaces";

const addedOn = (date: Date) => {
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const dateDiff = Math.abs(dayjs(Date.now()).diff(date));
  const dayToMilSeconds = 8 * 24 * 60 * 60 * 1000;
  if (dateDiff > dayToMilSeconds) {
    return dayjs(date).format("LL");
  }

  return dayjs().to(date);
};

const WishlistItem = ({
  product,
  classes,
}: {
  product: IProduct;
  classes?: { root?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>> };
}) => {
  const { navigate }: RootNavigationProps = useNavigation();
  const {
    breakpoints: [isSmUp, isMdUp],
  } = breakpointsWithDimensions.up(["sm", "md"]);
  const theme = useTheme();
  const styles = makeStyles(theme);

  const imageWidth = isSmUp ? 190 : 120;
  const imageHeight = (imageWidth / 16) * 9;

  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        isSmUp && {
          flexDirection: "row",
        },
        classes?.root,
      ])}
    >
      <View style={[styles.body, isSmUp && { flexShrink: 1 }]}>
        <Image
          source={product.images[0].large as any}
          resizeMode="cover"
          style={{ width: imageWidth, height: imageHeight }}
        />
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              navigate("Detail", {
                productId: product.id,
                title: product.title,
                categoryId: product.category.id,
              });
            }}
          >
            <Typography
              variant={isSmUp ? "h6" : "body2"}
              textTransform="capitalize"
              style={{
                color: theme.colors.palette.text.primary,
                fontWeight: "700",
              }}
              numberOfLines={2}
            >
              {product.title}
            </Typography>
          </TouchableOpacity>
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
      {!isSmUp && <Divider />}
      <View
        style={[
          styles.actions,
          isSmUp && { minWidth: 190 },
          isMdUp && { minWidth: 350, alignSelf: "center" },
        ]}
      >
        <Typography
          variant="body1"
          style={{
            color: theme.colors.palette.text.primary,
            fontWeight: "500",
          }}
        >
          Added on {addedOn(new Date("2021-10-19T16:28:12.200Z"))}
        </Typography>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: theme.spacing,
            ...(isSmUp && { flexDirection: "column" }),
            ...(isMdUp && { flexDirection: "row" }),
          }}
        >
          <Button
            style={{ flex: 1 }}
            labelStyle={
              isSmUp ? typographyStyles.body1 : typographyStyles.button
            }
            icon={({ color }) => (
              <Entypo
                name="shopping-bag"
                color={color}
                size={18}
                style={{ marginRight: theme.spacing * 0.5 }}
              />
            )}
            mode="contained"
            color={theme.colors.palette.secondary.main}
            onPress={() => console.log("Pressed")}
          >
            Add to cart
          </Button>
          <View style={{ padding: theme.spacing }} />
          <Button
            style={{ flex: 1 }}
            labelStyle={
              isSmUp ? typographyStyles.body1 : typographyStyles.button
            }
            icon={({ color }) => (
              <Entypo
                name="trash"
                color={color}
                size={18}
                style={{ marginRight: theme.spacing * 0.5 }}
              />
            )}
            mode="contained"
            color={theme.colors.palette.secondary.main}
            onPress={() => console.log("Pressed")}
          >
            Remove
          </Button>
        </View>
      </View>
    </View>
  );
};

WishlistItem.displayName = "Wishlist.Item";
export default WishlistItem;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.accent,
      borderRadius: theme.spacing * 0.5,
      marginBottom: theme.spacing * 2.5,
      ...boxShadow(4, 3),
    },
    body: {
      padding: theme.spacing * 1.25,
      flexDirection: "row",
      flexWrap: "wrap",
      flex: 1,
    },
    content: {
      paddingHorizontal: theme.spacing,
      flex: 1,
    },
    ratingBox: {
      flexDirection: "row",
      alignItems: "center",
    },
    actions: { padding: theme.spacing * 1.25 },
  });
};
