import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import TabScreenWrapper from "../../components/tab-screen-wrapper";
import Tabs from "../../components/tabs";
import ChangePassword from "./change-password";
import Orders from "./orders";
import Overview from "./overview";
import Tracking from "./tracking";

const UserScreen = () => {
  return (
    <TabScreenWrapper component="flat-list" bounces={false}>
      <Tabs
        items={[
          {
            title: "overview",
            icon: (props) => <Entypo {...props} name="grid" />,
            tab: <Overview />,
          },
          {
            title: "orders",
            icon: (props) => <Entypo {...props} name="list" />,
            tab: <Orders />,
          },
          {
            title: "tracking",
            icon: (props) => <Feather {...props} name="truck" />,
            tab: <Tracking />,
          },
          {
            title: "change password",
            icon: (props) => <Entypo {...props} name="key" />,
            tab: <ChangePassword />,
          },
        ]}
      />
    </TabScreenWrapper>
  );
};
UserScreen.displayName = "UserScreen";
export default UserScreen;
