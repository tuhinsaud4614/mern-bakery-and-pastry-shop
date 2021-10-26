import React from "react";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import SortAndFilter from "./sort-and-filter";

const WishlistScreen = () => {
  return (
    <TabScreenWrapper component="flat-list">
      <SortAndFilter />
    </TabScreenWrapper>
  );
};
WishlistScreen.displayName = "WishlistScreen";
export default WishlistScreen;
