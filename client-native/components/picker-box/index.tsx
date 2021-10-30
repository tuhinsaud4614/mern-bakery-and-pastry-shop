import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { typographyStyles } from "../../shared/utils/common.styles";

interface Props {
  onChange(value: string): void;
  selectedValue: string;
  options: { title: string; value: string }[];
  label: string;
  mode?: "text" | "outlined" | "contained";
  defaultText?: string;
}

const PickerBox = ({
  onChange,
  options,
  selectedValue,
  label,
  defaultText,
}: Props) => {
  const theme = useTheme();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: theme.spacing,
      }}
    >
      <Text
        style={{
          ...typographyStyles.button,
          color: theme.colors.palette.text.secondary,
          fontWeight: "700",
          fontSize: 16,
        }}
      >
        {label}:
      </Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          if (!!itemValue) {
            onChange(itemValue);
          }
        }}
        style={{
          textTransform: "uppercase",
          width: 200,
          color: theme.colors.palette.secondary.main,
          padding: theme.spacing,
          marginLeft: theme.spacing,
          borderColor: theme.colors.palette.secondary.light,
          borderWidth: 1,
          borderRadius: theme.spacing * 0.5,
        }}
      >
        {defaultText && (
          <Picker.Item
            color={theme.colors.palette.secondary.main}
            style={{ textTransform: "capitalize" }}
            label={defaultText}
            value={""}
          />
        )}
        {options.map((item) => (
          <Picker.Item
            color={theme.colors.palette.secondary.main}
            key={item.value}
            label={item.title.toUpperCase()}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
};

PickerBox.displayName = "PickerBox";
export default PickerBox;
