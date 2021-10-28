import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { typographyStyles } from "../../shared/utils/common.styles";

interface Props {
  onChange(value: string): void;
  selectedValue: string;
  options: { title: string; value: string }[];
  label: string;
  mode?: "text" | "outlined" | "contained";
}

const PickerBox = ({
  onChange,
  options,
  selectedValue,
  label,
  mode = "contained",
}: Props) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const currentSizeValue = options.find((size) => size.value === selectedValue);

  return (
    <View style={{ marginTop: theme.spacing }}>
      <Button
        onPress={() => setVisible(true)}
        color={theme.colors.palette.secondary.main}
        style={{
          borderColor: theme.colors.palette.secondary.light,
        }}
        labelStyle={{
          ...typographyStyles.button,
          fontWeight: "700",
          fontSize: 16,
        }}
        mode={mode}
      >
        {label}: {currentSizeValue && currentSizeValue.title.toUpperCase()}
      </Button>
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
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                onChange(itemValue);
                setVisible(false);
              }}
              style={{
                textTransform: "uppercase",
                width: 250,
                alignSelf: "center",
              }}
            >
              {options.map((item) => (
                <Picker.Item
                  color={theme.colors.palette.secondary.main}
                  key={item.value}
                  label={item.title.toUpperCase()}
                  value={item.value}
                />
              ))}
            </Picker>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

PickerBox.displayName = "PickerBox";
export default PickerBox;
