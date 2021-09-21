import React from "react";
import { Text } from "react-native";
import { Card, TouchableRipple, useTheme } from "react-native-paper";
import Typography from "..";
import { breakpoints } from "../../shared/utils";
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
      <Card.Content>
        <TouchableRipple
          onPress={() => console.log("press")}
          style={{
            width: "fit-content",
            marginTop: spacing,
          }}
        >
          <Typography
            variant={breakpoints.up("sm") ? "body2" : "caption"}
            style={{ color: "#7B4B94" }}
          >
            category
          </Typography>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => console.log("press")}
          style={{
            width: "fit-content",
            marginTop: spacing,
          }}
        >
          <Typography
            variant={breakpoints.up("sm") ? "h6" : "body1"}
            style={[{ color: palette.info.main }]}
            textTransform="capitalize"
          >
            Title
          </Typography>
        </TouchableRipple>

        <Typography variant="body1">120৳</Typography>
      </Card.Content>
    </Card>
  );
};

ProductCard.displayName = "ProductCard";
export default ProductCard;
