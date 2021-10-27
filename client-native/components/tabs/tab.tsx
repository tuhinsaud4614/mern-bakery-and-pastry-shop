import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  children: ReactNode;
}

const Tab = ({ style, children }: Props) => {
  return <View style={style}>{children}</View>;
};

Tab.displayName = "Tab";
export default Tab;
