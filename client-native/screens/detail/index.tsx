import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import Carousel from "../../components/carousel";
import Container from "../../components/container";
import { RootStackParamList } from "../../shared/routes";
import { breakpoints } from "../../shared/utils";
import Information from "./information";

const images = [
  require("../../assets/cake-300w.jpeg"),
  require("../../assets/others.jpeg"),
];

const DetailScreen = () => {
  const { navigate, goBack }: NavigationProp<RootStackParamList> =
    useNavigation();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width: windowWidth } = useWindowDimensions();
  const isSmUp = breakpoints.up("sm");
  const infoSmUpWidth = windowWidth * 0.4 - theme.spacing * 4;
  return (
    <Container>
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
        <Information isSmUp={isSmUp} />
      </View>
      <Text>Hello</Text>
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
  });
};
