import { Entypo } from "@expo/vector-icons";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { IconButton, Portal, useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TabsNavigationProps } from "../../shared/routes";
import { breakpointsWithDimensions } from "../../shared/utils";

// interface ContextProps {
//   onHide(): void;
// }

// export const SidebarContext = createContext<ContextProps>({
//   onHide: () => {},
// });

const Sidebar = ({
  navigationProps: { navigation },
  children,
}: {
  navigationProps: TabsNavigationProps;
  children(onHide: () => void): ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const {
    breakpoints: [isSmUp],
    width,
  } = breakpointsWithDimensions.up(["sm"]);

  useEffect(() => {
    if (!isSmUp) {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            onPress={() => setShow(true)}
            icon={(props) => (
              <Entypo
                {...props}
                color={theme.colors.palette.common.white}
                name="menu"
              />
            )}
          />
        ),
      });
    } else {
      setShow(false);
    }
  }, [isSmUp]);

  return (
    <Portal>
      {/* <SidebarContext.Provider
        value={{
          onHide: () => {
            console.log("ok");
            setShow(false);
          },
        }}
      > */}
      {show && (
        <Fragment>
          <Pressable
            onPress={() => setShow(false)}
            style={{
              backgroundColor: theme.colors.palette.action.disabled,
              ...StyleSheet.absoluteFillObject,
            }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              width: width * 0.8,
              backgroundColor: theme.colors.palette.background.paper,
            }}
          >
            <SafeAreaProvider>
              <SafeAreaView>{children(() => setShow(false))}</SafeAreaView>
            </SafeAreaProvider>
          </View>
        </Fragment>
      )}
    </Portal>
  );
};

export default Sidebar;
