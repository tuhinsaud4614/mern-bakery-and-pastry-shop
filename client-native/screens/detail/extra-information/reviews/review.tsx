import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  IconButton,
  Modal,
  Portal,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Typography from "../../../../components/typography";
import { IReview } from "../../../../shared/utils/interfaces";

interface Props {
  data: IReview;
}

const Review = ({ data }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [openMore, setOpenMore] = useState(false);
  return (
    <View style={styles.item}>
      <View>
        <Typography
          variant="button"
          style={styles.reviewer}
          textTransform="uppercase"
        >
          {data.reviewer.name}
        </Typography>
        <Typography variant="body1" style={styles.review}>
          {data.text}
        </Typography>
        <View style={styles.ratings}>
          {Array.from({ length: 5 }).map((_, index) => (
            <AntDesign
              key={index}
              name={data.ratings >= index + 1 ? "star" : "staro"}
              size={15}
              color={
                data.ratings >= index + 1
                  ? theme.colors.palette.secondary.main
                  : theme.colors.palette.text.secondary
              }
            />
          ))}
        </View>
      </View>
      <IconButton
        onPress={() => setOpenMore(true)}
        size={16}
        color={theme.colors.palette.secondary.main}
        icon={({ size, color }) => (
          <Entypo name="dots-three-vertical" size={size} color={color} />
        )}
      />
      <Portal>
        <Modal
          style={styles.modal}
          contentContainerStyle={styles.modalContent}
          visible={openMore}
          onDismiss={() => setOpenMore(false)}
        >
          <TouchableRipple
            onPress={() => {}}
            style={Platform.OS !== "web" && { width: "100%" }}
          >
            <View style={styles.modalItem}>
              <Entypo
                size={24}
                color={theme.colors.palette.error.main}
                name="trash"
              />
              <Typography variant="h6" style={styles.modalItemText}>
                Delete
              </Typography>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {}}
            style={Platform.OS !== "web" && { width: "100%" }}
          >
            <View style={styles.modalItem}>
              <AntDesign
                size={24}
                color={theme.colors.palette.warning.main}
                name="edit"
              />
              <Typography variant="h6" style={styles.modalItemText}>
                Edit
              </Typography>
            </View>
          </TouchableRipple>
        </Modal>
      </Portal>
    </View>
  );
};

Review.displayName = "Review";
export default Review;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    item: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    reviewer: {
      color: theme.colors.palette.text.primary,
      fontSize: 16,
    },
    review: {
      color: theme.colors.palette.text.secondary,
    },
    ratings: {
      marginTop: theme.spacing * 0.5,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      maxWidth: 400,
      minWidth: 150,
      backgroundColor: theme.colors.palette.common.white,
      borderRadius: theme.spacing * 0.5,
      paddingVertical: theme.spacing,
    },
    modalItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      padding: theme.spacing,
    },
    modalItemText: { flex: 1, paddingLeft: theme.spacing * 2 },
  });
};
