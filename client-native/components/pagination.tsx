import { Entypo } from "@expo/vector-icons";
import React, { memo, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import Typography from "./typography";

const Pagination = memo(
  ({
    count,
    onPageChange,
  }: {
    count: number;
    onPageChange?(page: number): void;
  }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const clickHandler = (index: number, action?: "prev" | "next") => {
      if (action) {
        if (action === "prev" && currentPage > 1) {
          setCurrentPage((prev) => --prev);
        } else if (action === "next" && currentPage < count) {
          setCurrentPage((prev) => ++prev);
        }
      } else {
        setCurrentPage(index);
      }
    };

    const pages = useMemo(
      () => Array.from({ length: count }, (_, i) => i + 1),
      [count]
    );

    useEffect(() => {
      !!onPageChange && onPageChange(currentPage);
    }, [currentPage]);

    let start = 0;
    let end = count;
    if (count > 5) {
      if (currentPage > 3 && currentPage < count - 3) {
        start = currentPage - 2;
        end = currentPage + 1;
      } else {
        if (currentPage <= 3) {
          start = 0;
          end = 4;
        } else {
          start = count - 4;
          end = count;
        }
      }
    }

    return (
      <View style={styles.root}>
        <IconButton
          disabled={currentPage === 1}
          style={[styles.page, styles.pageBorder]}
          onPress={() => clickHandler(1, "prev")}
          icon={(props) => <Entypo {...props} name="chevron-left" />}
          color={theme.colors.palette.secondary.main}
        />
        {count > 5 && currentPage > 3 && (
          <View style={styles.page}>
            <Typography variant="h6">...</Typography>
          </View>
        )}
        {pages.slice(start, end).map((value) => (
          <Button
            key={value}
            style={styles.page}
            onPress={() => clickHandler(value)}
            mode={currentPage === value ? "contained" : "outlined"}
            color={theme.colors.palette.secondary.main}
          >
            {value}
          </Button>
        ))}

        {count > 5 && end < count && (
          <View style={styles.page}>
            <Typography variant="h6">...</Typography>
          </View>
        )}
        <IconButton
          disabled={currentPage === count}
          style={[styles.page, styles.pageBorder]}
          onPress={() => clickHandler(1, "next")}
          icon={(props) => <Entypo {...props} name="chevron-right" />}
          color={theme.colors.palette.secondary.main}
        />
      </View>
    );
  },
  (prev, next) => prev.count === next.count
);

Pagination.displayName = "Pagination";
export default Pagination;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      paddingRight: theme.spacing,
      paddingBottom: theme.spacing,
    },
    page: {
      margin: 0,
      marginLeft: theme.spacing,
      marginTop: theme.spacing,
      minWidth: undefined,
    },
    pageBorder: {
      borderColor: theme.colors.palette.action.disabled,
      borderWidth: 1,
      borderRadius: theme.spacing * 0.5,
    },
  });
};
