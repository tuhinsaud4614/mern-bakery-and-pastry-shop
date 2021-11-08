import { Entypo } from '@expo/vector-icons';
import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { IconButton, Portal, useTheme } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import { TabsNavigationProps } from '../../shared/routes';

const Sidebar = ({
  navigationProps: { navigation },
  children,
}: {
  navigationProps: TabsNavigationProps;
  children(onHide: () => void): ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const {
    breakpoints: [isSmUp],
    width,
  } = useBreakpointsWithDimensions(['sm'], 'up');
  const drawerWidth = Math.min(300, width * 0.8);
  const styles = makeStyles(theme, drawerWidth);

  useEffect(() => {
    if (!isSmUp) {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            onPress={() => setShow(true)}
            icon={({ size, allowFontScaling }) => (
              <Entypo
                size={size}
                allowFontScaling={allowFontScaling}
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
  }, [isSmUp, theme, navigation]);

  useEffect(() => {
    if (show) {
      Animated.timing(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }).start();
    } else {
      animatedValue.setValue(0);
    }
  }, [show, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-drawerWidth, 0],
  });

  return (
    <Portal>
      {show && (
        <Fragment>
          <Pressable
            onPress={() => setShow(false)}
            style={{
              backgroundColor: theme.colors.palette.action.disabled,
              ...StyleSheet.absoluteFillObject,
            }}
          />
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{ translateX: translateX }],
              },
            ]}
          >
            <SafeAreaProvider>
              <SafeAreaView>{children(() => setShow(false))}</SafeAreaView>
            </SafeAreaProvider>
          </Animated.View>
        </Fragment>
      )}
    </Portal>
  );
};

export default Sidebar;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme, width: number) => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      width: width,
      backgroundColor: theme.colors.palette.background.paper,
    },
  });
};
