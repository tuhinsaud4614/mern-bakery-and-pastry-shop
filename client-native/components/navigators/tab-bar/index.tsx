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
import { boxShadow, Breakpoints, deviceRange } from "../../../shared/utils";
import { DeviceType } from "../../../shared/utils/types";
import Typography from "../../typography";
import TabBarItem from "./tabBar-item";
import TabBarLogo from "./tabBar-logo";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabBar = ({
  state,
  navigation,
  deviceWidth,
  range,
}: BottomTabBarProps & {
  deviceWidth: number;
  range: DeviceType;
}) => {
  const theme = useTheme();
  const isSmUp = range !== "xs";
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
        styles(theme, isSmUp).tabBar,
        isSmUp && {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        },
        (range === "lg" || range === "xl") && {
          paddingHorizontal: (deviceWidth - Breakpoints.lg) / 2,
        },
      ])}
    >
      {isSmUp && (
        <TabBarLogo
          image={require("../../../assets/logo.svg")}
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
          onPress(state.index === 1, state.routes[1].key, state.routes[1].name);
        }}
        color={
          state.index === 1 || state.index === 0
            ? theme.colors.palette.warning.main
            : theme.colors.palette.common.white
        }
        isSmUp={isSmUp}
        text={state.index === 1 || state.index === 0 ? "Home" : undefined}
      >
        <AntDesign
          name="home"
          size={24}
          color={
            state.index === 1 || state.index === 0
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
        />
      </TabBarItem>
      <TabBarItem
        onPress={() => {
          onPress(state.index === 2, state.routes[2].key, state.routes[2].name);
        }}
        color={
          state.index === 2
            ? theme.colors.palette.warning.main
            : theme.colors.palette.common.white
        }
        isSmUp={isSmUp}
        text={state.index === 2 ? "Search" : undefined}
      >
        <AntDesign
          name="search1"
          size={24}
          color={
            state.index === 2
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
        />
      </TabBarItem>
      <TabBarItem
        onPress={() => {
          onPress(state.index === 3, state.routes[3].key, state.routes[3].name);
        }}
        color={
          state.index === 3
            ? theme.colors.palette.warning.main
            : theme.colors.palette.common.white
        }
        isSmUp={isSmUp}
        text={state.index === 3 ? "Wishlist" : undefined}
      >
        <AntDesign
          name="heart"
          size={24}
          color={
            state.index === 3
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
        />
      </TabBarItem>
      {isSmUp && (
        <TabBarItem
          onPress={() => {
            onPress(
              state.index === 4,
              state.routes[4].key,
              state.routes[4].name
            );
          }}
          color={
            state.index === 4
              ? theme.colors.palette.warning.main
              : theme.colors.palette.common.white
          }
          isSmUp={isSmUp}
          text={state.index === 4 ? "Cart" : undefined}
        >
          <View style={{ position: "relative" }}>
            <Entypo
              name="shopping-bag"
              size={24}
              color={
                state.index === 4
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
          onPress(state.index === 5, state.routes[5].key, state.routes[5].name);
        }}
        color={
          state.index === 5
            ? theme.colors.palette.warning.main
            : theme.colors.palette.common.white
        }
        isSmUp={isSmUp}
        text={state.index === 5 ? "Profile" : undefined}
      >
        <AntDesign
          name="user"
          size={24}
          color={
            state.index === 5
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
  navigation?: any,
  title: string = ""
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
        {title || children}
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
  const { range, deviceWidth } = deviceRange();
  const isSmUp = range !== "xs";
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBar={(props) => (
        <TabBar {...props} deviceWidth={deviceWidth} range={range} />
      )}
    >
      <Tab.Screen
        name="Logo"
        component={HomeScreen}
        options={({ navigation }) => {
          return tabOptions(theme, isSmUp, navigation, "Home");
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
        name="Profile"
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

const styles = (theme: ReactNativePaper.Theme, isSmUp: boolean = false) =>
  StyleSheet.create({
    tabBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      padding: theme.spacing,
      backgroundColor: theme.colors.palette.primary[isSmUp ? "dark" : "light"],
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
