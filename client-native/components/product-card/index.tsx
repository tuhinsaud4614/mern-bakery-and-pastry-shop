import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  IconButton,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { breakpoints } from "../../shared/utils";
import { typographyStyles } from "../../shared/utils/common.styles";
import Ratings from "../ratings";
import Typography from "../typography";
import styles from "./index.styles";
// import { NewText } from "./NewText";

interface Props {
  data: string;
}

const image = require("../../assets/cake.jpeg");

export const NewText = () => {
  return <Text>hello</Text>;
};

const ProductCard = ({ data }: Props) => {
  const {
    spacing,
    colors: { palette },
  } = useTheme();

  const [rating, setRating] = useState(0);
  console.log(rating);

  return (
    <Card style={styles.container} elevation={3}>
      <Typography
        style={styles.featured}
        variant="caption"
        textTransform="uppercase"
      >
        Hot
      </Typography>
      <TouchableRipple onPress={() => console.log("press")}>
        <Card.Cover
          source={{ uri: image }}
          style={{ minHeight: "155", resizeMode: "center" }}
        />
      </TouchableRipple>
      <Card.Content style={{ paddingTop: spacing * 2 }}>
        <View style={styles.banner}>
          <View style={styles.innerBanner}>
            <Text>
              <TouchableRipple
                onPress={() => console.log("press")}
                style={styles.textButton}
              >
                <Typography
                  onPress={() => console.log("press")}
                  variant={breakpoints.up("sm") ? "body2" : "caption"}
                  style={{ color: "#7B4B94" }}
                  textTransform="uppercase"
                >
                  category
                </Typography>
              </TouchableRipple>
            </Text>
            <Text>
              <TouchableRipple
                rippleColor={palette.action.hover}
                onPress={() => console.log("press")}
                style={styles.textButton}
              >
                <Typography
                  onPress={() => console.log("press")}
                  variant={breakpoints.up("sm") ? "h5" : "h6"}
                  style={{ color: palette.info.main }}
                  textTransform="uppercase"
                >
                  Title
                </Typography>
              </TouchableRipple>
            </Text>
          </View>
          <IconButton
            icon={true ? "heart-outline" : "heart"}
            color={palette.secondary.main}
            onPress={() => console.log("press")}
          />
        </View>
        <Divider />
        <Ratings
          count={5}
          onRatingComplete={(rating) => setRating(rating)}
          percentage
        />
        <Divider />
        <Typography
          variant={breakpoints.up("sm") ? "h5" : "h6"}
          style={styles.price}
        >
          120৳
        </Typography>
      </Card.Content>
      <Card.Actions>
        <Button
          style={{
            flex: 1,
            ...typographyStyles.h6,
          }}
          icon={({ color, size }) => (
            <Entypo
              name="shopping-bag"
              color={color}
              size={size}
              style={{ marginRight: spacing }}
            />
          )}
          mode="contained"
          color={palette.secondary.main}
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
