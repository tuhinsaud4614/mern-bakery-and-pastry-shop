import DatetimePicker, { Event } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { convertToLocalDate } from "../shared/utils";

interface Props {
  onChange(value: Date): void;
  value: Date | null;
  label: string;
  classes?: {
    root?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    button?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    dateWrapper?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    picker?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  };
}

const DatePicker = ({ onChange, value, label, classes }: Props) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const changeHandler = (event: Event, current?: Date | undefined) => {
    if (current) {
      onChange(current);
      setShow(false);
    }
  };

  return (
    <View
      style={StyleSheet.flatten([
        { flexDirection: "row", alignItems: "center" },
        classes?.root,
      ])}
    >
      <Button
        mode="outlined"
        onPress={() => setShow(true)}
        color={theme.colors.palette.secondary.main}
        style={StyleSheet.flatten([
          {
            borderColor: theme.colors.palette.secondary.light,
            flex: 1,
          },
          classes?.button,
        ])}
      >
        {label}
        {!show && value && `: ${convertToLocalDate(value)}`}
      </Button>
      {show && Platform.OS === "ios" && (
        <View
          style={StyleSheet.flatten([
            { paddingLeft: theme.spacing, minWidth: 90 },
            classes?.dateWrapper,
          ])}
        >
          <DatetimePicker
            style={classes?.picker}
            testID="dateTimePicker"
            value={value || new Date()}
            mode="date"
            display="default"
            onChange={changeHandler}
            maximumDate={new Date()}
          />
        </View>
      )}
    </View>
  );
};

DatePicker.displayName = "DatePicker";
export default DatePicker;
