import {
  Raleway_100Thin,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import RootStackNavigator from "./shared/routes/stack-navigation";
import theme from "./shared/theme";

export default function App() {
  const [loaded] = useFonts({
    Raleway_300Light,
    Raleway_500Medium,
    Raleway_400Regular,
    Raleway_100Thin,
    Raleway_700Bold,
  });

  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}
