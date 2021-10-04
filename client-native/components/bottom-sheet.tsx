import { AntDesign } from "@expo/vector-icons";
import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
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
  onBackdropDismiss?: boolean;
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
    onBackdropDismiss = false,
    showCloseIcon = true,
  }: Props) => {
    const { height } = useWindowDimensions();
    const maxHeight = height * 0.5;
    const theme = useTheme();
    const styles = makeStyles(theme, maxHeight);
    const [open, setOpen] = useState(show);
    const bottom = useRef(new Animated.Value(-(maxHeight + 10))).current;
    const gestureHandler = (
      event: GestureEvent<PanGestureHandlerEventPayload>
    ) => {
      if (event.nativeEvent.translationY > 0) {
        bottom.setValue(-event.nativeEvent.translationY);
      }
    };

    const gestureEndHandler = (
      event: HandlerStateChangeEvent<Record<string, unknown>>
    ) => {
      if (
        typeof event.nativeEvent["translationY"] === "number" &&
        event.nativeEvent["translationY"] > 100 &&
        onDismiss
      ) {
        Animated.timing(bottom, {
          toValue: -(maxHeight + 10),
          useNativeDriver: false,
          duration: 200,
        }).start(({ finished }) => {
          finished && onDismiss();
        });
      } else {
        Animated.timing(bottom, {
          toValue: 0,
          useNativeDriver: false,
          duration: 200,
        }).start();
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
        {onBackdropDismiss && (
          <Pressable
            onPress={onDismiss}
            style={{
              ...StyleSheet.absoluteFillObject,
              zIndex: 450,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
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
                ...(!onBackdropDismiss && boxShadow(4, -3)),
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
            <ScrollView
              style={StyleSheet.flatten([styles.content, classes?.content])}
              showsVerticalScrollIndicator={Platform.OS === "web"}
            >
              {children}
            </ScrollView>
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
      minHeight: 100,
      maxHeight: bottomSheetHeight < 100 ? 100 : bottomSheetHeight,
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
    content: {
      padding: theme.spacing * 2,
    },
    close: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 50,
    },
  });
};
