import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
  VirtualizedList,
} from "react-native";
import { Divider, TouchableRipple, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { IProduct } from "../../../shared/utils/interfaces";
import Reviews from "../reviews";

interface Props {
  product: IProduct;
}

const ExtraInformation = ({ product }: Props) => {
  const [tab, setTab] = useState<"description" | "review">("description");
  let scrollRef: MutableRefObject<VirtualizedList<unknown> | null> =
    useRef(null);
  let debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const containerWidth = width - theme.spacing * 4;
  const styles = makeStyles(theme, containerWidth);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({
        offset: tab === "review" ? containerWidth : 0,
      });
    }
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [tab]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!e) {
      return;
    }
    const { nativeEvent } = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      if (nativeEvent.contentOffset.x === 0) {
        setTab("description");
      } else {
        setTab("review");
      }
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.tabs}>
        <TouchableRipple
          onPress={() => tab === "review" && setTab("description")}
          style={StyleSheet.flatten([
            styles.tabBtn,
            tab === "description" && {
              backgroundColor: theme.colors.palette.primary.light,
            },
          ])}
        >
          <Typography
            style={{
              color:
                tab === "description"
                  ? theme.colors.palette.common.white
                  : theme.colors.palette.text.primary,
            }}
            variant="h6"
          >
            Description
          </Typography>
        </TouchableRipple>
        <TouchableRipple
          style={StyleSheet.flatten([
            styles.tabBtn,
            tab === "review" && {
              backgroundColor: theme.colors.palette.primary.light,
            },
          ])}
          onPress={() => tab === "description" && setTab("review")}
        >
          <Typography
            style={{
              color:
                tab === "review"
                  ? theme.colors.palette.common.white
                  : theme.colors.palette.text.primary,
            }}
            variant="h6"
          >
            Review
          </Typography>
        </TouchableRipple>
      </View>
      <Divider />
      <VirtualizedList
        ref={scrollRef}
        data={[]}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleScrollEnd}
        keyExtractor={(_, index) => index.toString()}
        getItem={(item) => item["name"]}
        renderItem={({ index }) => {
          if (index === 0) {
            return (
              <View style={styles.tabContainer}>
                <Typography
                  variant="body2"
                  style={{ color: theme.colors.palette.text.primary }}
                >
                  {product.description
                    ? product.description
                    : "This product has no description"}
                </Typography>
              </View>
            );
          }
          return (
            <View style={styles.tabContainer}>
              <Reviews productId={product.id} />
            </View>
          );
        }}
        getItemCount={() => 2}
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
      />
    </View>
  );
};

ExtraInformation.displayName = "ExtraInformation";
export default ExtraInformation;

const makeStyles = (theme: ReactNativePaper.Theme, width: number) => {
  return StyleSheet.create({
    root: {
      marginTop: theme.spacing * 2,
    },
    tabs: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    tabBtn: {
      padding: theme.spacing,
    },
    tabContainer: {
      width: width,
      padding: theme.spacing,
    },
  });
};
