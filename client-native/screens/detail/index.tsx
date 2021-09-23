import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { RootStackParamList } from "../../shared/routes";
import ProductImage from "./product-image";

const DetailScreen = () => {
  const { navigate, goBack }: NavigationProp<RootStackParamList> =
    useNavigation();
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={StyleSheet.flatten([styles.root])}>
      <View style={styles.info}>
        <View style={{ display: "flex", flex: 1, position: "relative" }}>
          <View style={{ position: "relative" }}>
            <ProductImage image={require("../../assets/cake-300w.jpeg")} />
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                onPress={() => console.log("pressed")}
                icon="chevron-left"
                color={theme.colors.palette.primary.main}
              />
              <IconButton
                onPress={() => console.log("pressed")}
                icon="chevron-right"
                color={theme.colors.palette.primary.main}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: theme.spacing * 1.25,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Pressable style={{ marginRight: theme.spacing * 1.25 }}>
              <Image
                source={require("../../assets/cake-300w.jpeg")}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={() => console.log("pressed")}>
              <Image
                source={require("../../assets/cake-300w.jpeg")}
                style={{ height: 50, width: 50 }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

DetailScreen.displayName = "DetailScreen";
export default DetailScreen;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      padding: theme.spacing * 2,
    },
    info: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
};
