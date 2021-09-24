import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Dialog, Divider, Portal, useTheme } from "react-native-paper";
import Ratings from "../../components/ratings";
import Typography from "../../components/typography";
import { typographyStyles } from "../../shared/utils/common.styles";

interface Props {
  isSmUp: boolean;
}

const data = [
  { title: "large - 2900৳", value: "large" },
  { title: "big - 1950৳", value: "big" },
  { title: "medium - 1730৳", value: "medium" },
  { title: "small - 1000৳", value: "small" },
];

const Information = ({ isSmUp }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        isSmUp && { flex: 1, paddingLeft: theme.spacing * 2 },
      ])}
    >
      <Typography variant={isSmUp ? "h4" : "h5"} style={styles.title}>
        CHOCOLATE DAKER CAKE
      </Typography>
      <Ratings
        count={5}
        // onRatingComplete={(rating) => setRating(rating)}
        classes={{ wrapper: { paddingHorizontal: 0 } }}
        percentage
      />
      <Divider style={{ marginVertical: theme.spacing, maxWidth: 100 }} />
      <Typography variant={isSmUp ? "h5" : "h6"}>1000৳ – 2900৳</Typography>
      <Typography
        variant={isSmUp ? "body1" : "body2"}
        style={{
          paddingVertical: theme.spacing,
          color: theme.colors.palette.text.secondary,
        }}
      >
        Ingredients - Chocolate moist sponge, Chocolate cream, Chocolate bar
        decoration
      </Typography>
      <View style={styles.pickerBox}>
        {Platform.OS === "ios" && (
          <Pressable onPress={() => setVisible(true)}>
            <Text style={styles.pickerBoxLabel}>Size</Text>
          </Pressable>
        )}
        {Platform.OS === "ios" && (
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={() => setVisible(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Dialog.Content>
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }
                  style={{
                    textTransform: "uppercase",
                    width: 250,
                    maxWidth: 250,
                    alignSelf: "center",
                  }}
                >
                  {data.map((item) => (
                    <Picker.Item
                      key={item.value}
                      label={item.title}
                      value={item.value}
                    />
                  ))}
                </Picker>
              </Dialog.Content>
            </Dialog>
          </Portal>
        )}
      </View>
    </View>
  );
};

Information.displayName = "Detail.Information";
export default Information;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.accent,
      display: "flex",
      width: "100%",
    },
    title: {
      color: theme.colors.palette.primary.main,
    },
    pickerBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    pickerBoxLabel: {
      ...typographyStyles.button,
      color: theme.colors.palette.text.secondary,
      fontWeight: "700",
      fontSize: 16,
    },
  });
};
