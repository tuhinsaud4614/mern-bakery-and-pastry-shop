import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
import Carousel from "../../components/carousel";
import Container from "../../components/container";
import { RootStackParamList } from "../../shared/routes";

const images = [
  require("../../assets/cake-300w.jpeg"),
  require("../../assets/others.jpeg"),
  require("../../assets/pastry-cup-pastry-tart.jpeg"),
  require("../../assets/cake-300w.jpeg"),
  require("../../assets/others.jpeg"),
  require("../../assets/sweets-300w.jpeg"),
];

const DetailScreen = () => {
  const { navigate, goBack }: NavigationProp<RootStackParamList> =
    useNavigation();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width: windowWidth } = useWindowDimensions();

  return (
    <Container>
      <View style={styles.info}>
        <Carousel
          data={images}
          itemWidth={windowWidth - theme.spacing * 4}
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
          classes={{ slide: { padding: theme.spacing } }}
          itemPerSlide={1}
        />
      </View>
    </Container>
  );
};

DetailScreen.displayName = "DetailScreen";
export default DetailScreen;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    info: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
};
