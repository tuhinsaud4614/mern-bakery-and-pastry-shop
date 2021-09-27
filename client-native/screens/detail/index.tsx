import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import Carousel from "../../components/carousel";
import Container from "../../components/container";
import Grid from "../../components/grid";
import ProductBox from "../../components/product-box";
import ProductCard from "../../components/product-card";
import { dummyProducts } from "../../dummy-data";
import { DetailNavigationProps } from "../../shared/routes";
import { breakpoints } from "../../shared/utils";
import ExtraInformation from "./extra-information";
import Information from "./information";

const images = [
  require("../../assets/cake-300w.jpeg"),
  require("../../assets/others.jpeg"),
];

const DetailScreen = ({
  route: {
    params: { categoryId, productId = "1", title },
  },
}: DetailNavigationProps) => {
  // const { navigate, goBack,getState }: NavigationProp<RootStackParamList> =
  //   useNavigation();

  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width: windowWidth } = useWindowDimensions();
  const isSmUp = breakpoints.up("sm");
  const infoSmUpWidth = windowWidth * 0.4 - theme.spacing * 4;
  const product =
    dummyProducts.find((product) => product.id === "1") || dummyProducts[0];

  return (
    <Container keyBoardAvoiding={Platform.OS !== "web"}>
      <View style={styles.main}>
        <View
          style={{
            width: isSmUp ? infoSmUpWidth : "100%",
          }}
        >
          <Carousel
            data={images}
            itemWidth={isSmUp ? infoSmUpWidth : windowWidth - theme.spacing * 4}
            pageItem={(value) => (
              <Image
                source={value}
                style={{
                  height: 40,
                  width: 50,
                  borderRadius: theme.spacing * 0.5,
                }}
                resizeMode="cover"
              />
            )}
            slide={(value) => (
              <Image source={value} style={{ width: "100%", height: "100%" }} />
            )}
            classes={{
              wrapper: { flexBasis: "100%", flexShrink: 0 },
            }}
          />
        </View>
        <Information isSmUp={isSmUp} product={product} />
      </View>
      <ExtraInformation product={product} />
      <ProductBox
        classes={{ root: styles.relatedProducts }}
        title="related products"
      >
        <Grid>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid
              xs={6}
              sm={4}
              md={3}
              item
              style={{ padding: theme.spacing }}
              key={index}
            >
              <ProductCard data={product} />
            </Grid>
          ))}
        </Grid>
      </ProductBox>
    </Container>
  );
};

DetailScreen.displayName = "DetailScreen";
export default DetailScreen;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    info: {
      backgroundColor: theme.colors.palette.accent,
      display: "flex",
    },
    infoTitle: {
      color: theme.colors.palette.primary.main,
    },
    relatedProducts: {
      marginTop: theme.spacing * 2,
    },
  });
};
