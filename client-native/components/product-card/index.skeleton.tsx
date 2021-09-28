import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, useTheme } from "react-native-paper";
import Skeleton from "../skeleton";
const ProductCardSkeleton = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Card style={{ overflow: "hidden" }}>
      <Skeleton
        variant="rectangular"
        width={100}
        height={130}
        percentageX
        animated
      />
      <Card.Content style={{ paddingTop: theme.spacing * 2 }}>
        <Skeleton variant="text" width={80} percentageX animated />
        <Skeleton
          variant="text"
          width={100}
          percentageX
          animated
          style={{ marginTop: theme.spacing }}
        />
        <Skeleton
          variant="text"
          width={30}
          percentageX
          animated
          style={{ marginTop: theme.spacing }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: theme.spacing,
          }}
        >
          <View style={{ flex: 1 }}>
            <Skeleton variant="text" width={100} percentageX />
          </View>
          <View style={{ paddingLeft: theme.spacing * 2 }}>
            <Skeleton variant="rectangular" width={20} height={20} />
          </View>
        </View>
        <Skeleton
          variant="rectangular"
          width={100}
          height={20}
          percentageX
          animated
          style={{
            marginTop: theme.spacing,
            borderRadius: theme.spacing * 0.5,
          }}
        />
      </Card.Content>
    </Card>
  );
};

ProductCardSkeleton.displayName = "ProductCard.Skeleton";
export default ProductCardSkeleton;

const makeStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    image: {
      backgroundColor: theme.colors.palette.action.disabledBackground,
      width: "100%",
      height: 130,
    },
    text: {
      width: "80%",
    },
  });
