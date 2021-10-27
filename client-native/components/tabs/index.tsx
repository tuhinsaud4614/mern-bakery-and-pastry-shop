import React, {
  Children,
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { Divider, useTheme } from "react-native-paper";
import Tab from "./tab";
import TabAction from "./tab-action";

interface TabsProps {
  items: string[];
  headerBounce?: boolean;
  children: ReactNode[];
  classes?: {
    root?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    actions?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    action?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    tab?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  };
}

const Tabs = ({
  items,
  headerBounce = false,
  children,
  classes,
}: TabsProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width } = useWindowDimensions();
  const containerWidth = width - theme.spacing * 4;
  const [tab, setTab] = useState<number>(0);
  let scrollRef: MutableRefObject<FlatList<any> | null> = useRef(null);
  let debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Action handling
  const scrollToOffset = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({
        offset: containerWidth * index,
      });
    }
  };
  useEffect(() => {
    scrollToOffset(tab);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [tab, containerWidth]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!e) {
      return;
    }
    const { nativeEvent } = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      if (nativeEvent && nativeEvent.contentOffset) {
        let currentSlide = 0;
        if (nativeEvent.contentOffset.x === 0) {
          currentSlide = 0;
          setTab(currentSlide);
        } else {
          const approxCurrentSlide =
            nativeEvent.contentOffset.x / containerWidth;
          currentSlide = Math.ceil(+approxCurrentSlide.toFixed(2));
          setTab(currentSlide);
        }
        scrollToOffset(currentSlide);
      }
    }
  };

  const child = useMemo(() => {
    return Children.map(children, (c, index) => (
      <Tab
        key={index}
        style={StyleSheet.flatten([
          styles.tab,
          classes?.tab,
          { width: containerWidth, overflow: "hidden" },
        ])}
      >
        {c}
      </Tab>
    ));
  }, [children]);

  return (
    <View style={classes?.root}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={headerBounce}
        contentContainerStyle={classes?.actions}
      >
        {items.map((label, index) => (
          <TabAction
            key={index}
            label={label}
            index={index}
            active={tab === index}
            onTabChange={(value) => setTab(value)}
            style={classes?.action}
          />
        ))}
      </ScrollView>
      <Divider
        style={{ backgroundColor: theme.colors.palette.primary.light }}
      />
      <FlatList
        data={items}
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ index }) => {
          return <>{Array.isArray(child) ? child[index] : undefined}</>;
        }}
        onScroll={(e) => {
          if (Platform.OS === "web") {
            if (debounceTimer.current) {
              clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
              handleScrollEnd(e);
            }, 150);
          }
        }}
        bounces={false}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

Tabs.displayName = "Tabs";
export default Tabs;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    tab: {
      maxWidth: 1200 - theme.spacing * 4,
      padding: theme.spacing,
    },
  });
};
