import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Tabs from "../../../components/tabs";
import { IProduct } from "../../../shared/utils/interfaces";
import Description from "./description";
import Reviews from "./reviews";

interface Props {
  product: IProduct;
}

const ExtraInformation = ({ product }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Tabs
      classes={{ root: styles.root }}
      items={[
        {
          title: "description",
          tab: <Description />,
        },
        {
          title: "review",
          tab: <Reviews productId={product.id} />,
        },
      ]}
    />
  );
};

ExtraInformation.displayName = "ExtraInformation";
export default ExtraInformation;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      marginTop: theme.spacing * 2,
    },
  });
};
