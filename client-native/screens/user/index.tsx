import React from "react";
import { Text } from "react-native";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import Tabs from "../../components/tabs";
import Overview from "./overview";

const UserScreen = () => {
  return (
    <TabScreenWrapper component="flat-list" bounces={false}>
      <Tabs items={["overview", "orders", "tracking", "change password"]}>
        <Overview />
        <Text>orders</Text>
        <Text>tracking</Text>
        <Text>change password</Text>
      </Tabs>
    </TabScreenWrapper>
  );
};
UserScreen.displayName = "UserScreen";
export default UserScreen;
