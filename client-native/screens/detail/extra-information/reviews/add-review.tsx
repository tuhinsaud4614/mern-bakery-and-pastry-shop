import { Ionicons } from "@expo/vector-icons";
import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { typographyStyles } from "../../../../shared/utils/common.styles";

const AddReview = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const ref: MutableRefObject<TextInput | null> = useRef(null);

  const submitHandler = () => {
    if (!!value) {
      console.log("submit");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Describe your experience"
        value={value}
        onChangeText={(value) => setValue(value)}
        returnKeyType={"send"}
        onSubmitEditing={submitHandler}
        style={StyleSheet.flatten([
          typographyStyles.body1,
          {
            borderColor: focus
              ? theme.colors.palette.primary.dark
              : theme.colors.palette.primary.light,
          },
          styles.input,
        ])}
      />
      <IconButton
        onPress={submitHandler}
        style={styles.icon}
        disabled={!value}
        size={16}
        color={
          !!value
            ? theme.colors.palette.secondary.main
            : theme.colors.palette.action.disabled
        }
        icon={({ color, size }) => (
          <Ionicons name="send" color={color} size={size} />
        )}
      />
    </View>
  );
};

AddReview.displayName = "AddReview";
export default AddReview;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    container: { position: "relative" },
    input: {
      padding: theme.spacing,
      paddingRight: theme.spacing * 4,
      borderWidth: 1,
      backgroundColor: theme.colors.palette.accent,
      borderRadius: theme.spacing * 0.5,
      color: theme.colors.palette.text.primary,
    },
    icon: {
      position: "absolute",
      top: 1,
      right: 0,
    },
  });
};
