import { FontDisplay, useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ProductCard from "./components/product-card";
import theme from "./shared/theme";

export default function App() {
  const [loaded] = useFonts({
    RalewayLight: {
      uri: require("./assets/fonts/Raleway/Raleway-Light.ttf"),
      display: FontDisplay.SWAP,
    },
    RalewayMedium: {
      uri: require("./assets/fonts/Raleway/Raleway-Medium.ttf"),
      display: FontDisplay.SWAP,
    },
    RalewayRegular: {
      uri: require("./assets/fonts/Raleway/Raleway-Regular.ttf"),
      display: FontDisplay.SWAP,
    },
    RalewayThin: {
      uri: require("./assets/fonts/Raleway/Raleway-Thin.ttf"),
      display: FontDisplay.SWAP,
    },
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <ProductCard data="product" />
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}
