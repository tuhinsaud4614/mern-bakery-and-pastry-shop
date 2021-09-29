import React from "react";
import { Image, useWindowDimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
import Carousel from "../../components/carousel";
import CategorySidebar from "../../components/category-sidebar";
import { breakpoints } from "../../shared/utils";

const images = [
  require("../../assets/cake-300w.jpeg"),
  require("../../assets/others.jpeg"),
];

const BannerAndCategory = () => {
  const isSmUp = breakpoints.up("sm");
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const bannerWidth = isSmUp
    ? width - theme.spacing * 4 - theme.spacing * 33
    : width - theme.spacing * 4;
  return (
    <View style={{ flexDirection: "row" }}>
      {isSmUp && (
        <View
          style={{
            width: theme.spacing * 33,
            borderColor: theme.colors.palette.divider,
            borderWidth: 1,
            height: 350,
          }}
        >
          <CategorySidebar />
        </View>
      )}
      <View
        style={{
          flex: 1,
        }}
      >
        <Carousel
          data={images}
          itemWidth={bannerWidth}
          itemHeight={isSmUp ? 350 : 180}
          slide={(value) => (
            <Image
              source={value}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          )}
          classes={{
            wrapper: { flexBasis: "100%", flexShrink: 0 },
          }}
        />
      </View>
    </View>
  );
};
BannerAndCategory.displayName = "BannerAndCategory";
export default BannerAndCategory;
