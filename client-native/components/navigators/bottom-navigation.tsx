import { AntDesign } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { Image } from "react-native";
import { useTheme } from "react-native-paper";
import HomeScreen from "../../screens/home";
import SearchScreen from "../../screens/search";
import UserScreen from "../../screens/user";
import WishlistScreen from "../../screens/wishlist";
import { BottomTabParamList } from "../../shared/routes";
import { breakpoints } from "../../shared/utils";

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  const theme = useTheme();
  const isMdUp = breakpoints.up("md");
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: theme.colors.palette.primary.main,
        ...(isMdUp && {
          position: "absolute",
          top: 0,
          left: 0,
          height: 54,
        }),
      }}
      activeColor={theme.colors.palette.warning.light}
    >
      {isMdUp && (
        <Tab.Screen
          name="Logo"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Image source={{ uri: require("../../assets/logo.svg") }} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? color : theme.colors.palette.common.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="search1"
              size={20}
              color={focused ? color : theme.colors.palette.common.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="heart"
              size={20}
              color={focused ? color : theme.colors.palette.common.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="user"
              size={20}
              color={focused ? color : theme.colors.palette.common.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

BottomNavigation.displayName = "BottomNavigation";
export default BottomNavigation;
