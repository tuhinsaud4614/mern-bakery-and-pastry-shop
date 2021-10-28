import { Formik, FormikHelpers } from "formik";
import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import DatePicker from "../../../components/date-picker";
import PickerBox from "../../../components/picker-box";
import Typography from "../../../components/typography";
import { breakpointsWithDimensions } from "../../../shared/utils";
import { userInfoSchema } from "../../../shared/utils/validations.schema";

type GenderType = "male" | "female" | "other";

const gender: { title: string; value: GenderType }[] = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

interface IFormState {
  firstName: string;
  lastName: string;
  mobile: string;
  gender: null | GenderType;
  dob: Date | null;
}

const Form = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp, isMdUp],
  } = breakpointsWithDimensions.up(["sm", "md"]);

  const initialState: IFormState = {
    firstName: "",
    lastName: "",
    dob: null,
    gender: null,
    mobile: "",
  };

  const onsubmitHandler = async (
    values: IFormState,
    { resetForm }: FormikHelpers<IFormState>
  ): Promise<any> => {};

  return (
    <Formik
      validationSchema={userInfoSchema}
      initialValues={initialState}
      onSubmit={onsubmitHandler}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
        values,
        isValid,
        dirty,
        isSubmitting,
        setFieldValue,
      }) => {
        // console.log("errors", errors);
        // console.log("values", touched);

        return (
          <Fragment>
            <View style={isMdUp && { flexDirection: "row" }}>
              <View>
                <TextInput
                  mode="outlined"
                  label="First Name"
                  value={values.firstName}
                  style={styles.input}
                  outlineColor={theme.colors.palette.primary.light}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  error={!!touched.firstName && !!errors.firstName}
                />
                {!!touched.firstName && !!errors.firstName && (
                  <HelperText type="error">{errors.firstName}</HelperText>
                )}
              </View>
              <View>
                <TextInput
                  mode="outlined"
                  label="Last Name"
                  value={values.lastName}
                  style={styles.input}
                  outlineColor={theme.colors.palette.primary.light}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  error={!!touched.lastName && !!errors.lastName}
                />
                {!!touched.lastName && !!errors.lastName && (
                  <HelperText type="error">{errors.lastName}</HelperText>
                )}
              </View>
            </View>
            <View>
              <TextInput
                mode="outlined"
                label="Mobile"
                value={values.mobile}
                style={styles.input}
                outlineColor={theme.colors.palette.primary.light}
                onBlur={handleBlur("mobile")}
                onChangeText={handleChange("mobile")}
                keyboardType="phone-pad"
                left={<TextInput.Affix text="+88" />}
                error={!!touched.mobile && !!errors.mobile}
              />
              {!!touched.mobile && !!errors.mobile && (
                <HelperText type="error">{errors.mobile}</HelperText>
              )}
            </View>
            <View style={isMdUp && { flexDirection: "row" }}>
              <View style={[{ flex: 1, paddingHorizontal: theme.spacing }]}>
                <PickerBox
                  options={gender}
                  onChange={(value) => setFieldValue("gender", value)}
                  selectedValue={values.gender || "male"}
                  label="Gender"
                  mode="outlined"
                />
              </View>
              <DatePicker
                classes={{ root: { padding: theme.spacing } }}
                value={values.dob}
                onChange={(value) => setFieldValue("dob", value)}
                label="Date of Birth"
              />
            </View>
            <View
              style={[{ padding: theme.spacing }, isSmUp && { maxWidth: 300 }]}
            >
              <Button
                color={theme.colors.palette.secondary.main}
                onPress={handleSubmit}
                mode="contained"
                disabled={!(isValid && dirty)}
                loading={isSubmitting}
              >
                update
              </Button>
            </View>
          </Fragment>
        );
      }}
    </Formik>
  );
};

const OverviewForm = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp, isMdUp],
  } = breakpointsWithDimensions.up(["sm", "md"]);

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
        <Form />
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
