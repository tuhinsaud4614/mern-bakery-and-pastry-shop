import {
  NavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ICategory } from '../utils/interfaces';

export type BottomTabParamList = {
  Logo: undefined;
  Cart: undefined;
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<BottomTabParamList>;
  Category: ICategory;
  Detail: { productId?: string; title?: string; categoryId?: string };
  Register: undefined;
};
export type RootNavigationProps = NavigationProp<RootStackParamList>;
export type TabsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Tabs'
>;
export type DetailNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;
export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export type CategoryNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Category'
>;

export type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

export type RegisterNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
