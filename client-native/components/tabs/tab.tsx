import React, { forwardRef, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  children: ReactNode;
}

const Tab = forwardRef<View, Props>(({ style, children }, ref) => {
  return (
    <View ref={ref} style={style}>
      {children}
    </View>
  );
});

Tab.displayName = "Tab";
export default Tab;
