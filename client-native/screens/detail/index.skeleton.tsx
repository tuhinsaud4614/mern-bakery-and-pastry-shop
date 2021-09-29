import React from "react";
import { useWindowDimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
import Skeleton from "../../components/skeleton";
import { breakpoints } from "../../shared/utils";
import makeStyles from "./index.styles";

const DetailSkeleton = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width: windowWidth } = useWindowDimensions();
  const isSmUp = breakpoints.up("sm");
  const imageWidth = isSmUp
    ? windowWidth * 0.4 - theme.spacing * 4
    : windowWidth - theme.spacing * 4;

  return (
    <View style={styles.main}>
      <View
        style={{
          width: isSmUp ? imageWidth : "100%",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={imageWidth}
          height={(imageWidth / 16) * 9}
          animated
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing,
          }}
        >
          <Skeleton
            variant="rectangular"
            width={50}
            height={40}
            style={{
              borderRadius: theme.spacing * 0.5,
            }}
          />
          <Skeleton
            variant="rectangular"
            width={50}
            height={40}
            style={{
              borderRadius: theme.spacing * 0.5,
              marginLeft: theme.spacing,
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          ...(isSmUp && { flex: 1, paddingLeft: theme.spacing * 2 }),
          ...(!isSmUp && { paddingTop: theme.spacing * 2 }),
        }}
      >
        <Skeleton variant="text" width={100} percentageX animated />
        <Skeleton
          variant="text"
          width={100}
          style={{ marginTop: theme.spacing * 2 }}
          animated
          percentageX
        />
        <Skeleton
          variant="text"
          width={30}
          style={{ marginTop: theme.spacing * 2 }}
          animated
          percentageX
        />
        <Skeleton
          variant="text"
          width={100}
          style={{ marginTop: theme.spacing * 2 }}
          animated
          percentageX
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing * 2,
          }}
        >
          <Skeleton variant="rectangular" width={30} height={25} percentageX />
          <Skeleton
            variant="rectangular"
            width={50}
            height={25}
            style={{ marginLeft: theme.spacing }}
            animated
            percentageX
          />
        </View>
      </View>
    </View>
  );
};

DetailSkeleton.displayName = "Detail.Skeleton";
export default DetailSkeleton;
