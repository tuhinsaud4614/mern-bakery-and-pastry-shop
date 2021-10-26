import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableHighlight, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  IconButton,
  useTheme,
} from "react-native-paper";
import { RootNavigationProps } from "../../shared/routes";
import { breakpoints } from "../../shared/utils";
import { typographyStyles } from "../../shared/utils/common.styles";
import { IProduct } from "../../shared/utils/interfaces";
import Typography from "../typography";
import makeStyles from "./index.styles";
// import { NewText } from "./NewText";

interface Props {
  data: IProduct;
}

const ProductCard = ({ data }: Props) => {
  const { navigate }: RootNavigationProps = useNavigation();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const isSmUp = breakpoints.up("sm");

  return (
    <Card style={styles.container} elevation={3}>
      {data.feature && (
        <Typography
          style={styles.featured}
          variant="caption"
          textTransform="uppercase"
        >
          Hot
        </Typography>
      )}
      <TouchableHighlight
        onPress={() => {
          navigate("Detail", {
            productId: data.id,
            title: data.title,
            categoryId: data.category.id,
          });
        }}
      >
        <Card.Cover
          source={data.images[0].large as any}
          style={{
            resizeMode: "cover",
            backgroundColor: "transparent",
            height: isSmUp ? 150 : 110,
          }}
        />
      </TouchableHighlight>
      <Card.Content style={{ paddingTop: theme.spacing * 2 }}>
        <Typography
          onPress={() => console.log("press")}
          variant="caption"
          style={{ color: theme.colors.palette.text.secondary }}
          textTransform="uppercase"
        >
          {data.category.title}
        </Typography>
        <Typography
          onPress={() =>
            navigate("Detail", {
              productId: data.id,
              title: data.title,
              categoryId: data.category.id,
            })
          }
          variant={isSmUp ? "body1" : "body2"}
          style={{
            color: theme.colors.palette.secondary.light,
            fontWeight: "700",
            marginTop: theme.spacing * 0.5,
          }}
          textTransform="uppercase"
        >
          {data.title}
        </Typography>
        <Divider style={{ marginTop: theme.spacing * 0.5 }} />
        <View style={styles.ratingAndFav}>
          <View style={styles.ratingBox}>
            {Array.from({ length: 5 }).map((_, index) => (
              <AntDesign
                key={index}
                name={data.totalRatings >= index + 1 ? "star" : "staro"}
                size={16}
                color={
                  data.totalRatings >= index + 1
                    ? theme.colors.palette.secondary.main
                    : theme.colors.palette.text.secondary
                }
              />
            ))}
          </View>
          <IconButton
            icon={true ? "heart-outline" : "heart"}
            color={theme.colors.palette.secondary.main}
            size={isSmUp ? 20 : 18}
            style={{ margin: theme.spacing * 0.5 }}
            onPress={() => console.log("press")}
          />
        </View>
        <Divider />
        <Typography variant={isSmUp ? "h6" : "body1"} style={styles.price}>
          {typeof data.price !== "number"
            ? `${data.price.small}৳ - ${data.price.extraLarge}৳`
            : `${data.price}৳`}
        </Typography>
      </Card.Content>
      <Card.Actions>
        <Button
          style={{
            flex: 1,
          }}
          labelStyle={typographyStyles.button}
          icon={({ color, size }) => (
            <Entypo
              name="shopping-bag"
              color={color}
              size={size}
              style={{ marginRight: theme.spacing }}
            />
          )}
          mode="contained"
          color={theme.colors.palette.secondary.main}
          onPress={() => console.log("Pressed")}
        >
          Add to cart
        </Button>
      </Card.Actions>
    </Card>
  );
};

ProductCard.displayName = "ProductCard";
export default ProductCard;
