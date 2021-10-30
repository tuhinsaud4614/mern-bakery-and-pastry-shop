import React, {
  createRef,
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
  items: {
    title: string;
    icon?(props: { color: string; size: number }): ReactNode;
    tab: ReactNode;
  }[];
  headerBounce?: boolean;
  classes?: {
    root?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    actions?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    action?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    tab?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  };
}

const Tabs = ({ items, headerBounce = false, classes }: TabsProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width } = useWindowDimensions();
  const containerWidth = width - theme.spacing * 4;
  const [tab, setTab] = useState<number>(0);
  const scrollRef: MutableRefObject<FlatList<any> | null> = useRef(null);
  const indicatorsRef: MutableRefObject<ScrollView | null> = useRef(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const indicators = useMemo(() => {
    return items.map((item, index) => ({
      id: index,
      icon: item.icon,
      title: item.title,
      ref: createRef<View>(),
    }));
  }, []);

  // Action handling
  const scrollToOffset = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({
        offset: containerWidth * index,
      });
      indicators[index].ref.current?.measure((x) => {
        indicatorsRef.current && indicatorsRef.current.scrollTo({ x: x });
      });
    }
  };

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

  useEffect(() => {
    scrollToOffset(tab);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [tab]);

  return (
    <View style={classes?.root}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={headerBounce}
        contentContainerStyle={classes?.actions}
        ref={indicatorsRef}
      >
        {indicators.map((item, index) => (
          <TabAction
            ref={item.ref}
            key={item.id}
            icon={item.icon}
            label={item.title}
            index={item.id}
            active={tab === item.id}
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
          return (
            <Tab
              key={index}
              style={StyleSheet.flatten([
                styles.tab,
                classes?.tab,
                { width: containerWidth, overflow: "hidden" },
              ])}
            >
              {items[index].tab}
            </Tab>
          );
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
