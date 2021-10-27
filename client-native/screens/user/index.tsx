import React from "react";
import { Text } from "react-native";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import Tabs from "../../components/tabs";
import Overview from "./overview";

const UserScreen = () => {
  return (
    <TabScreenWrapper component="flat-list" bounces={false}>
      <Tabs items={["overview", "information", "orders"]}>
        <Overview />
        <Text>hi</Text>
        <Text>next</Text>
      </Tabs>
    </TabScreenWrapper>
  );
};
UserScreen.displayName = "UserScreen";
export default UserScreen;
