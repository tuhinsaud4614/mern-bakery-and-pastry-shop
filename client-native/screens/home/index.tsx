import React from "react";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import { TabsNavigationProps } from "../../shared/routes";
import BannerAndCategory from "./banner-and-category";
import CategorizedProducts from "./categorized-products";
import FeaturedProducts from "./featured-products";

const HomeScreen = ({ navigation }: TabsNavigationProps) => {
  return (
    <TabScreenWrapper>
      <BannerAndCategory />
      {/* <BannerAndCategorySkeleton /> */}
      <FeaturedProducts />
      <CategorizedProducts />
    </TabScreenWrapper>
  );
};
HomeScreen.displayName = "HomeScreen";
export default HomeScreen;
