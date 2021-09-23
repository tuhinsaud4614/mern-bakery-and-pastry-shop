import {
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  Logo: undefined;
  Cart: undefined;
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  User: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<BottomTabParamList>;
  Detail: { productId?: string; title?: string };
};
export type RootNavigationProps = NavigationProp<RootStackParamList>;
export type TabsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Tabs"
>;
export type DetailNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Detail"
>;
