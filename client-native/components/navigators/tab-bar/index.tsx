import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Badge, TouchableRipple, useTheme } from "react-native-paper";
import CartScreen from "../../../screens/cart";
import HomeScreen from "../../../screens/home";
import SearchScreen from "../../../screens/search";
import UserScreen from "../../../screens/user";
import WishlistScreen from "../../../screens/wishlist";
import { BottomTabParamList } from "../../../shared/routes";
import theme from "../../../shared/theme";
import { boxShadow, breakpoints } from "../../../shared/utils";
import Typography from "../../typography";
import TabBarItem from "./tabBar-item";
import TabBarLogo from "./tabBar-logo";

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface Metadata {
  label: string;
  icon: "home" | "search1" | "heart" | "user" | "shoppingcart";
}

function getMetaData(index: number, isSmUp: boolean): Metadata {
  let newIndex = 0;
  if (isSmUp) {
    newIndex = 1;
  }

  switch (index) {
    case ++newIndex:
      return {
        label: "Search",
        icon: "search1",
      };
    case ++newIndex:
      return {
        label: "Wishlist",
        icon: "heart",
      };
    case ++newIndex:
      return { label: "Cart", icon: "shoppingcart" };
    case ++newIndex:
      return { label: "User", icon: "user" };
    default:
      return { label: "Home", icon: "home" };
  }
}

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme();
  const isSmUp = breakpoints.up("sm");

  const onPress = (isFocused: boolean, key: string, name: string) => {
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles(theme).tabBar,
        isSmUp && { position: "absolute", top: 0, left: 0, right: 0 },
      ])}
    >
      {isSmUp && (
        <TabBarLogo
          onPress={() => {
            onPress(
              state.index === 0,
              state.routes[0].key,
              state.routes[0].name
            );
          }}
        />
      )}
      <TabBarItem
        onPress={() => {
          onPress(
            state.index === (isSmUp ? 1 : 0),
            state.routes[isSmUp ? 1 : 0].key,
            state.routes[isSmUp ? 1 : 0].name
          );
        }}
        color={
          state.index === (isSmUp ? 1 : 0) || (isSmUp && state.index === 0)
            ? theme.colors.palette.warning.main
            : theme.colors.palette.common.white
        }
        isSmUp={isSmUp}
        text={
          state.index === (isSmUp ? 1 : 0) || (isSmUp && state.index === 0)
            ? "Home"
            : undefined
        }
      >
        <AntDesign
          name="home"
          size={24}
          color={
            state.index === (isSmUp ? 1 : 0) || (isSmUp && state.index === 0)
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
        />
      </TabBarItem>
      <TabBarItem
        onPress={() => {
          onPress(
            state.index === (isSmUp ? 2 : 1),
            state.routes[isSmUp ? 2 : 1].key,
            state.routes[isSmUp ? 2 : 1].name
          );
        }}
        color={
          state.index === (isSmUp ? 2 : 1)
            ? theme.colors.palette.warning.main
            : theme.colors.palette.common.white
        }
        isSmUp={isSmUp}
        text={state.index === (isSmUp ? 2 : 1) ? "Search" : undefined}
      >
        <AntDesign
          name="search1"
          size={24}
          color={
            state.index === (isSmUp ? 2 : 1)
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
        />
      </TabBarItem>
      <TabBarItem
        onPress={() => {
          onPress(
            state.index === (isSmUp ? 3 : 2),
            state.routes[isSmUp ? 3 : 2].key,
            state.routes[isSmUp ? 3 : 2].name
          );
        }}
        color={
          state.index === (isSmUp ? 3 : 2)
            ? theme.colors.palette.warning.main
            : theme.colors.palette.common.white
        }
        isSmUp={isSmUp}
        text={state.index === (isSmUp ? 3 : 2) ? "Wishlist" : undefined}
      >
        <AntDesign
          name="heart"
          size={24}
          color={
            state.index === (isSmUp ? 3 : 2)
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
        />
      </TabBarItem>
      {isSmUp && (
        <TabBarItem
          onPress={() => {
            onPress(
              state.index === (isSmUp ? 4 : 3),
              state.routes[isSmUp ? 4 : 3].key,
              state.routes[isSmUp ? 4 : 3].name
            );
          }}
          color={
            state.index === (isSmUp ? 4 : 3)
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
          isSmUp={isSmUp}
          text={state.index === (isSmUp ? 4 : 3) ? "Cart" : undefined}
        >
          <View style={{ position: "relative" }}>
            <Entypo
              name="shopping-bag"
              size={24}
              color={
                state.index === (isSmUp ? 4 : 3)
                  ? theme.colors.palette.warning.main
                  : theme.colors.palette.common.white
              }
            />
            <Badge
              style={{
                backgroundColor: theme.colors.palette.secondary.main,
                position: "absolute",
                top: -theme.spacing * 0.7,
                right: -theme.spacing * 0.7,
              }}
            >
              3+
            </Badge>
          </View>
        </TabBarItem>
      )}
      <TabBarItem
        onPress={() => {
          onPress(
            state.index === (isSmUp ? 5 : 3),
            state.routes[isSmUp ? 5 : 3].key,
            state.routes[isSmUp ? 5 : 3].name
          );
        }}
        color={
          state.index === (isSmUp ? 5 : 3)
            ? theme.colors.palette.warning.main
            : theme.colors.palette.common.white
        }
        isSmUp={isSmUp}
        text={state.index === (isSmUp ? 5 : 3) ? "User" : undefined}
      >
        <AntDesign
          name="user"
          size={24}
          color={
            state.index === (isSmUp ? 5 : 3)
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
        />
      </TabBarItem>
    </View>
  );
};

const tabOptions = (
  theme: ReactNativePaper.Theme,
  hide: boolean,
  navigation?: any
): BottomTabNavigationOptions => {
  if (hide) {
    return {
      header: () => null,
    };
  }

  return {
    headerStyle: {
      ...boxShadow(3),
      backgroundColor: theme.colors.palette.primary.dark,
    },
    headerTitle: ({ children }) => (
      <Typography
        variant="h6"
        style={{ color: theme.colors.palette.common.white }}
      >
        {children}
      </Typography>
    ),
    headerRight: () => (
      <TouchableRipple
        style={{
          position: "relative",
          marginRight: theme.spacing * 2,
          padding: theme.spacing,
        }}
        onPress={() => navigation?.navigate("Cart")}
        centered
      >
        <>
          <Entypo
            size={24}
            color={theme.colors.palette.common.white}
            name="shopping-bag"
          />
          <Badge
            style={{
              backgroundColor: theme.colors.palette.secondary.main,
              position: "absolute",
              right: theme.spacing * 0.3,
              top: theme.spacing * 0.3,
            }}
          >
            3+
          </Badge>
        </>
      </TouchableRipple>
    ),
  };
};

const TabBarContainer = () => {
  const isSmUp = breakpoints.up("sm");
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Logo"
        component={HomeScreen}
        options={({ navigation }) => {
          return tabOptions(theme, isSmUp, navigation);
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => {
          return tabOptions(theme, isSmUp, navigation);
        }}
      />
      <Tab.Screen
        name="Search"
        key="search"
        component={SearchScreen}
        options={({ navigation }) => {
          return tabOptions(theme, isSmUp, navigation);
        }}
      />
      <Tab.Screen
        name="Wishlist"
        key="wishlist"
        component={WishlistScreen}
        options={({ navigation }) => {
          return tabOptions(theme, isSmUp, navigation);
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => {
          return tabOptions(theme, isSmUp, navigation);
        }}
      />

      <Tab.Screen
        name="User"
        component={UserScreen}
        options={({ navigation }) => {
          return tabOptions(theme, isSmUp, navigation);
        }}
      />
    </Tab.Navigator>
  );
};

TabBarContainer.displayName = "TabBarContainer";
export default TabBarContainer;

const styles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    tabBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      padding: theme.spacing,
      backgroundColor: theme.colors.palette.primary.light,
      ...boxShadow(3, -2),
    },
    badge: {
      position: "absolute",
      height: theme.spacing * 2.5,
      width: theme.spacing * 2.5,
      color: theme.colors.palette.common.white,
      backgroundColor: theme.colors.palette.secondary.main,
      fontSize: theme.spacing * 1.25,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.spacing * 1.25,
    },
  });
