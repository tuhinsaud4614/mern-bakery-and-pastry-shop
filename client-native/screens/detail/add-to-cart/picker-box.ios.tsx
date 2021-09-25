import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { typographyStyles } from "../../../shared/utils/common.styles";

interface Props {
  onChange(value: string): void;
  selectedValue: string;
  data: { title: string; value: string }[];
}

const PickerBox = ({ onChange, data, selectedValue }: Props) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const currentSizeValue = data.find((size) => size.value === selectedValue);

  return (
    <View style={{ marginTop: theme.spacing }}>
      <Button
        onPress={() => setVisible(true)}
        color={theme.colors.palette.secondary.main}
        labelStyle={{
          ...typographyStyles.button,
          color: theme.colors.palette.common.white,
          fontWeight: "700",
          fontSize: 16,
        }}
        mode="contained"
      >
        Size: {currentSizeValue && currentSizeValue.title.toUpperCase()}
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
              {data.map((item) => (
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
