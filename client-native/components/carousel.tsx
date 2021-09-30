import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";

interface Props {
  data: any[];
  pageItem?(pageValue: any): JSX.Element;
  hideActionButton?: boolean;
  itemWidth: number;
  itemHeight?: number;
  itemPerSlide?: number;
  slide?(value: any): JSX.Element;
  actionBtnSize?: number;
  classes?: {
    wrapper?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    sliders?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    actionBtn?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    actionLeft?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    actionRight?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    slide?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    pagination?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    pageItem?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
    pageAction?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  };
}

const Carousel = ({
  data,
  pageItem,
  hideActionButton = false,
  itemWidth,
  itemHeight: newItemHeight,
  itemPerSlide = 1,
  slide,
  classes,
  actionBtnSize = 30,
}: Props) => {
  const theme = useTheme();
  let scrollRef: MutableRefObject<FlatList<any> | null> = useRef(null);
  let debounceTimer = useRef<NodeJS.Timeout | null>(null);
  let debounceTimerX = useRef<NodeJS.Timeout | null>(null);
  const [current, setCurrent] = useState(0);
  const itemHeight = newItemHeight || (itemWidth / 16) * 9;
  const styles = makeStyles(theme, itemWidth, itemHeight, actionBtnSize);
  const totalPage = data.length - itemPerSlide + 1;

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (debounceTimerX.current) {
        clearTimeout(debounceTimerX.current);
      }
    };
  }, [current, scrollRef]);

  // Action handling
  const scrollToOffset = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({
        offset: (itemWidth / itemPerSlide) * index,
      });
    }
  };

  const actionHandler = (action: "next" | "prev") => {
    if (debounceTimerX.current) {
      clearTimeout(debounceTimerX.current);
    }
    debounceTimerX.current = setTimeout(() => {
      if (action === "next" && current < totalPage - 1) {
        scrollToOffset(current + 1);
        return setCurrent((prev) => prev + 1);
      }

      if (action === "prev" && current > 0) {
        scrollToOffset(current - 1);
        return setCurrent((prev) => prev - 1);
      }
    }, 200);
  };

  // Handling Scroll end
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!e) {
      return;
    }
    const { nativeEvent } = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      let currentSlide = 0;
      if (nativeEvent.contentOffset.x === 0) {
        currentSlide = 0;
        setCurrent(currentSlide);
      } else {
        const approxCurrentSlide =
          nativeEvent.contentOffset.x / (itemWidth / itemPerSlide);
        currentSlide = Math.ceil(+approxCurrentSlide.toFixed(2));
        setCurrent(currentSlide);
      }
      scrollToOffset(currentSlide);
    }
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.wrapper,
        classes?.wrapper && classes.wrapper,
      ])}
    >
      <View
        style={StyleSheet.flatten([
          styles.sliders,
          classes?.sliders && classes.sliders,
        ])}
      >
        {!hideActionButton && (
          <>
            <IconButton
              onPress={() => actionHandler("prev")}
              icon="chevron-left"
              color={theme.colors.palette.secondary.main}
              style={StyleSheet.flatten([
                styles.actionButton,
                { left: 0 },
                classes?.actionBtn,
                classes?.actionLeft,
              ])}
              disabled={current === 0}
              size={actionBtnSize}
            />
            <IconButton
              onPress={() => actionHandler("next")}
              icon="chevron-right"
              color={theme.colors.palette.secondary.main}
              size={actionBtnSize}
              disabled={current === totalPage - 1}
              style={StyleSheet.flatten([
                styles.actionButton,
                { right: 0 },
                classes?.actionBtn,
                classes?.actionRight,
              ])}
            />
          </>
        )}
        <FlatList
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          data={data}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={(e) => {
            if (Platform.OS === "android" || Platform.OS === "ios") {
              handleScrollEnd(e);
            }
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
          renderItem={({ index, item }) => (
            <View
              key={index}
              style={StyleSheet.flatten([
                {
                  height: itemHeight,
                  width: itemWidth / itemPerSlide,
                },
                classes?.slide && classes.slide,
              ])}
            >
              {slide && slide(item)}
            </View>
          )}
        />
      </View>
      {pageItem && (
        <View
          style={StyleSheet.flatten([
            styles.pagination,
            classes?.pagination && classes.pagination,
          ])}
        >
          {data.slice(0, totalPage).map((value, index) => (
            <View
              style={StyleSheet.flatten([
                { padding: theme.spacing },
                classes?.pageItem && classes.pageItem,
              ])}
              key={index}
            >
              <Pressable
                onPress={() => {
                  scrollToOffset(index);
                  setCurrent(index);
                }}
                key={index}
                style={StyleSheet.flatten([
                  styles.paginationItem,
                  {
                    borderColor:
                      index === current
                        ? theme.colors.palette.secondary.main
                        : "transparent",
                  },
                  classes?.pageAction && classes?.pageAction,
                ])}
              >
                {pageItem(value)}
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

Carousel.displayName = "Carousel";
export default Carousel;

const makeStyles = (
  theme: ReactNativePaper.Theme,
  width: number,
  height: number,
  size: number
) => {
  return StyleSheet.create({
    wrapper: {
      width: "100%",
    },
    sliders: {
      width: "100%",
      position: "relative",
    },
    actionButton: {
      position: "absolute",
      top: height / 2 - size,
      zIndex: 10,
    },
    pagination: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    paginationItem: {
      borderWidth: 1,
      padding: theme.spacing * 0.5,
      borderRadius: theme.spacing * 0.5,
    },
  });
};
