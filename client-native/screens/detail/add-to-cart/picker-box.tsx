import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { typographyStyles } from "../../../shared/utils/common.styles";

interface Props {
  onChange(value: string): void;
  selectedValue: string;
  data: { title: string; value: string }[];
}

const PickerBox = ({ onChange, data, selectedValue }: Props) => {
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
        Size:
      </Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          onChange(itemValue);
        }}
        style={{
          textTransform: "uppercase",
          width: 200,
          color: theme.colors.palette.secondary.main,
          padding: theme.spacing,
          borderColor: theme.colors.palette.secondary.light,
          borderWidth: 1,
          borderRadius: theme.spacing * 0.5,
        }}
      >
        {data.map((item) => (
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
