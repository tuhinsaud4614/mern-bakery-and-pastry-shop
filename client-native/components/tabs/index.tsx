import React, {
  createContext,
  createRef,
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

interface ContextProps {
  scrollHandle(stop: boolean): void;
}

export const TabsContext = createContext<ContextProps>({
  scrollHandle: () => {},
});

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
  const { width, height } = useWindowDimensions();
  const containerWidth = width - theme.spacing * 4;
  const [tab, setTab] = useState<number>(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const scrollRef = useRef<FlatList<any>>(null);
  const indicatorsRef = useRef<ScrollView>(null);
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
      indicators[tab].ref.current?.measure((x, y, w, h, pageX) => {
        indicatorsRef.current &&
          indicatorsRef.current.scrollTo({
            x: Platform.OS === "android" ? pageX - 16 : x,
          });
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
        {indicators.map((item) => (
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
        ref={scrollRef}
        data={items}
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
              <TabsContext.Provider
                value={{
                  scrollHandle(value) {
                    if (Platform.OS === "android") {
                      setScrollEnabled(value);
                    }
                  },
                }}
              >
                {items[index].tab}
              </TabsContext.Provider>
            </Tab>
          );
        }}
        decelerationRate={0}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEnabled={scrollEnabled}
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
        showsHorizontalScrollIndicator={false}
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
