import { AntDesign } from "@expo/vector-icons";
import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  GestureEvent,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { Divider, IconButton, Portal, useTheme } from "react-native-paper";
import { boxShadow } from "../shared/utils";

interface Props {
  children?: ReactNode;
  show: boolean;
  onDismiss?(): void;
  showBackdrop?: boolean;
  showCloseIcon?: boolean;
  classes?: {
    root?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    header?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    headerContainer?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    headerBar?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    closeBtn?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    content?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  };
}

const BottomSheet = memo(
  ({
    children,
    onDismiss,
    show,
    classes,
    showBackdrop = false,
    showCloseIcon = true,
  }: Props) => {
    const maxHeight = Dimensions.get("window").height * 0.5;
    const theme = useTheme();
    const styles = makeStyles(theme, maxHeight);
    const [open, setOpen] = useState(show);
    const bottom = useRef(new Animated.Value(-(maxHeight + 10))).current;

    const gestureHandler = (
      event: GestureEvent<PanGestureHandlerEventPayload>
    ) => {
      //  when swipe down
      if (event.nativeEvent.translationY > 0) {
        bottom.setValue(-event.nativeEvent.translationY);
      }
    };

    const gestureEndHandler = (
      event: HandlerStateChangeEvent<Record<string, unknown>>
    ) => {
      if (
        onDismiss &&
        typeof event.nativeEvent["translationY"] === "number" &&
        event.nativeEvent["translationY"] > 100
      ) {
        //  When swipe down and swipe position greater then 100
        onDismiss();
      } else {
        //  otherwise set to default position
        bottom.setValue(0);
      }
    };

    useEffect(() => {
      if (show) {
        setOpen(true);
        Animated.timing(bottom, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      } else if (!show) {
        Animated.timing(bottom, {
          toValue: -(maxHeight + 10),
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          setOpen(false);
        });
      }
    }, [bottom, show]);

    return open ? (
      <Portal>
        {showBackdrop && (
          <Pressable
            onPress={onDismiss}
            style={{
              ...StyleSheet.absoluteFillObject,
              zIndex: 450,
              backgroundColor: theme.colors.palette.action.disabledBackground,
            }}
          />
        )}

        <PanGestureHandler
          onGestureEvent={gestureHandler}
          onEnded={gestureEndHandler}
        >
          <Animated.View
            style={StyleSheet.flatten([
              styles.root,
              {
                ...(!showBackdrop && boxShadow(4, -3)),
                bottom: bottom,
              },
              classes?.root,
            ])}
          >
            <View style={StyleSheet.flatten([styles.header, classes?.header])}>
              <View
                style={StyleSheet.flatten([
                  styles.headerContainer,
                  classes?.headerContainer,
                ])}
              >
                <Divider
                  style={StyleSheet.flatten([
                    styles.headerBar,
                    classes?.headerBar,
                  ])}
                />
              </View>
              {showCloseIcon && (
                <IconButton
                  color={theme.colors.palette.secondary.main}
                  size={14}
                  onPress={onDismiss}
                  icon={(props) => <AntDesign {...props} name="close" />}
                  style={StyleSheet.flatten([styles.close, classes?.closeBtn])}
                />
              )}
            </View>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Portal>
    ) : null;
  },
  (prev, next) => prev.show === next.show
);
BottomSheet.displayName = "BottomSheet";
export default BottomSheet;

const makeStyles = (
  theme: ReactNativePaper.Theme,
  bottomSheetHeight: number
) => {
  return StyleSheet.create({
    root: {
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 500,
      backgroundColor: theme.colors.palette.background.paper,
      borderTopLeftRadius: theme.spacing * 2,
      borderTopRightRadius: theme.spacing * 2,
      overflow: "hidden",
      minHeight: 200,
      maxHeight: bottomSheetHeight < 200 ? 200 : bottomSheetHeight,
    },
    header: {
      position: "relative",
      height: 33,
      backgroundColor: theme.colors.palette.background.default,
      ...boxShadow(4, 3),
    },
    headerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      alignItems: "center",
      paddingTop: theme.spacing,
      height: 33,
    },
    headerBar: { height: 3, width: "20%", maxWidth: 100, borderRadius: 1.5 },
    close: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 50,
    },
  });
};
