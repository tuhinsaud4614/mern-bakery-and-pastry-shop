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
  enableBackdropClose?: boolean;
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
    enableBackdropClose = false,
  }: Props) => {
    const maxHeight = Dimensions.get("window").height * 0.5;
    const deviceWidth = Dimensions.get("window").width;
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
            onPress={enableBackdropClose ? onDismiss : undefined}
            style={{
              ...StyleSheet.absoluteFillObject,
              zIndex: 450,
              backgroundColor: theme.colors.palette.action.disabledBackground,
            }}
          />
        )}

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
          <PanGestureHandler
            onGestureEvent={gestureHandler}
            onEnded={gestureEndHandler}
          >
            <View style={StyleSheet.flatten([styles.header, classes?.header])}>
              <Divider
                style={StyleSheet.flatten([
                  {
                    left: (deviceWidth - deviceWidth * 0.2) / 2,
                    width: deviceWidth * 0.2,
                  },
                  styles.headerBar,
                  classes?.headerBar,
                ])}
              />
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
          </PanGestureHandler>
          {children}
        </Animated.View>
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

    headerBar: {
      position: "absolute",
      top: theme.spacing,
      height: 3,
      borderRadius: 1.5,
      zIndex: 50,
    },
    close: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 50,
    },
  });
};
