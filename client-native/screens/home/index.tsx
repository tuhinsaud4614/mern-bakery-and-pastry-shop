import React, { Fragment } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import Logo from "../../components/logo";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import { TabsNavigationProps } from "../../shared/routes";
import { typographyStyles } from "../../shared/utils/common.styles";
import BannerAndCategory from "./banner-and-category";
import CategorizedProducts from "./categorized-products";
import FeaturedProducts from "./featured-products";
import Sidebar from "./sidebar";

const HomeScreen = (navigationProps: TabsNavigationProps) => {
  const theme = useTheme();
  return (
    <TabScreenWrapper>
      <Sidebar navigationProps={navigationProps}>
        {(onHide) => (
          <Fragment>
            <View style={{ width: 150, height: 40 }}>
              <Logo />
            </View>
            <ScrollView showsVerticalScrollIndicator={Platform.OS === "web"}>
              {Array.from({ length: 10 }).map((_, index) => (
                <List.Item
                  key={index}
                  onPress={() => {
                    onHide();
                  }}
                  title={`Pastry, Cup Pastry & Tart- ${index}`}
                  titleStyle={StyleSheet.flatten([
                    typographyStyles.body1,
                    {
                      fontWeight: "700",
                      textTransform: "capitalize",
                      color: theme.colors.palette.text.primary,
                    },
                  ])}
                />
              ))}
            </ScrollView>
          </Fragment>
        )}
      </Sidebar>
      <BannerAndCategory />
      {/* <BannerAndCategorySkeleton /> */}
      <FeaturedProducts />
      <CategorizedProducts />
    </TabScreenWrapper>
  );
};
HomeScreen.displayName = "HomeScreen";
export default HomeScreen;
