import { Event } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import DatePicker from "../../../components/date-picker";
import PickerBox from "../../../components/picker-box";
import Typography from "../../../components/typography";
import { breakpointsWithDimensions } from "../../../shared/utils";

const gender = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const OverviewForm = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp, isMdUp],
  } = breakpointsWithDimensions.up(["sm", "md"]);

  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const onChange = (event: Event, current?: Date | undefined) => {
    const currentDate = current || date;
    setDate(currentDate);
    setDateVisible(false);
  };

  return (
    <View
      style={[
        styles.root,
        isSmUp && {
          borderLeftColor: theme.colors.palette.divider,
          borderLeftWidth: 1,
        },
      ]}
    >
      <View style={styles.header}>
        <Typography
          variant={isMdUp ? "h4" : "h5"}
          style={{ color: theme.colors.palette.primary.main }}
          textAlign={!isSmUp ? "center" : undefined}
        >
          Personal Information
        </Typography>
      </View>
      <View style={isMdUp && { flexDirection: "row" }}>
        <TextInput
          mode="outlined"
          label="First Name"
          style={styles.input}
          outlineColor={theme.colors.palette.secondary.main}
        />
        <TextInput
          mode="outlined"
          label="Last Name"
          style={styles.input}
          outlineColor={theme.colors.palette.secondary.main}
        />
      </View>
      <View>
        <TextInput
          mode="outlined"
          label="Mobile"
          style={styles.input}
          outlineColor={theme.colors.palette.secondary.main}
        />
      </View>
      <View style={isMdUp && { flexDirection: "row" }}>
        <View style={[{ flex: 1, paddingHorizontal: theme.spacing }]}>
          <PickerBox
            options={gender}
            onChange={(value) => {}}
            selectedValue={"male"}
            label="Gender"
            mode="outlined"
          />
        </View>
        <DatePicker
          classes={{ root: { padding: theme.spacing } }}
          value={date}
          onChange={(value) => setDate(date)}
          label="Date of Birth"
        />
      </View>
      <View style={[{ padding: theme.spacing }, isSmUp && { maxWidth: 300 }]}>
        <Button
          color={theme.colors.palette.secondary.main}
          onPress={() => {}}
          mode="contained"
        >
          update
        </Button>
      </View>
    </View>
  );
};

OverviewForm.displayName = "Overview.Form";
export default OverviewForm;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
      maxWidth: 600,
      padding: theme.spacing,
    },
    header: {
      padding: theme.spacing,
    },
    input: {
      flex: 1,
      margin: theme.spacing,
    },
  });
};
