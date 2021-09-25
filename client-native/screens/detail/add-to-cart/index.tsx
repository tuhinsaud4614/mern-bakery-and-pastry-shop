import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import { typographyStyles } from "../../../shared/utils/common.styles";
import Counter from "./counter";
import PickerBox from "./picker-box";

const sizes = [
  { title: "large - 2900৳", value: "large" },
  { title: "big - 1950৳", value: "big" },
  { title: "medium - 1730৳", value: "medium" },
  { title: "small - 1000৳", value: "small" },
];

const AddToCart = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [count, setCount] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0].value);
  const [label, setLabel] = useState<string>("");

  const onCounterPress = (action: "add" | "minus") => {
    if (action === "add") {
      return setCount((prev) => prev + 1);
    }

    if (count > 1) {
      return setCount((prev) => prev - 1);
    }
  };
  const onCounterChange = (value: string) => {
    const newValue = value.replace(/[^0-9]/g, "");

    if (newValue) {
      setCount(+newValue);
    }
  };

  const onSubmit = () => {
    console.log("count", count);
    console.log("selectedSize", selectedSize);
    console.log("label", label);
  };

  return (
    <View>
      <View
        style={{ display: "flex", alignItems: "flex-start", maxWidth: 280 }}
      >
        <PickerBox
          data={sizes}
          onChange={(value) => setSelectedSize(value)}
          selectedValue={selectedSize}
        />
        <View style={styles.labelRoot}>
          <Text style={styles.labelText}>LABEL:</Text>
          <TextInput
            style={styles.labelInput}
            value={label}
            onChangeText={(value) => setLabel(value)}
            placeholder="HAPPY BIRTHDAY TO YOU"
          />
        </View>
      </View>
      <Divider style={{ marginVertical: theme.spacing }} />
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Counter
          count={count}
          onPress={onCounterPress}
          onCountChange={onCounterChange}
        />
        <Button
          style={styles.submitButton}
          icon={({ color, size }) => (
            <Entypo
              name="shopping-bag"
              color={color}
              size={size}
              style={{ marginRight: theme.spacing }}
            />
          )}
          mode="contained"
          color={theme.colors.palette.secondary.main}
          onPress={onSubmit}
        >
          Add to cart
        </Button>
      </View>
      <Divider style={{ marginVertical: theme.spacing }} />
    </View>
  );
};

AddToCart.displayName = "AddToCart";
export default AddToCart;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    labelRoot: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: theme.spacing,
      width: "100%",
    },
    labelText: {
      ...typographyStyles.button,
      color: theme.colors.palette.text.secondary,
      fontWeight: "700",
      fontSize: 16,
      textTransform: "uppercase",
    },
    labelInput: {
      ...typographyStyles.body2,
      borderColor: theme.colors.palette.secondary.light,
      borderWidth: 1,
      padding: theme.spacing,
      borderRadius: theme.spacing * 0.5,
      width: 200,
    },
    submitButton: {
      flex: 1,
      ...typographyStyles.h6,
      marginLeft: theme.spacing * 2,
      maxWidth: 170,
    },
  });
};
