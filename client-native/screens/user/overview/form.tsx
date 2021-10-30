import { Formik, FormikHelpers } from "formik";
import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import DatePicker from "../../../components/date-picker";
import Input from "../../../components/input";
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
        console.log("values", values);
        // console.log(isValid, dirty);

        return (
          <Fragment>
            <View style={isMdUp && { flexDirection: "row" }}>
              <Input
                classes={{ root: styles.input }}
                mode="outlined"
                label="First Name"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                error={!!touched.firstName && !!errors.firstName}
                helperText={
                  !!touched.firstName && !!errors.firstName
                    ? errors.firstName
                    : undefined
                }
                theme={theme}
              />

              <Input
                theme={theme}
                mode="outlined"
                label="Last Name"
                value={values.lastName}
                outlineColor={theme.colors.palette.primary.light}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                error={!!touched.lastName && !!errors.lastName}
                helperText={
                  !!touched.lastName && !!errors.lastName
                    ? errors.lastName
                    : undefined
                }
                classes={{ root: styles.input }}
              />
            </View>
            <Input
              theme={theme}
              mode="outlined"
              label="Mobile"
              value={values.mobile}
              onBlur={handleBlur("mobile")}
              onChangeText={handleChange("mobile")}
              keyboardType="phone-pad"
              left={<TextInput.Affix text="+88" />}
              error={!!touched.mobile && !!errors.mobile}
              helperText={
                !!touched.mobile && !!errors.mobile ? errors.mobile : undefined
              }
              classes={{ root: styles.input }}
            />
            <View style={isMdUp && { flexDirection: "row" }}>
              <View style={[{ flex: 1, paddingHorizontal: theme.spacing }]}>
                <PickerBox
                  options={gender}
                  onChange={(value) => setFieldValue("gender", value)}
                  selectedValue={values.gender || ""}
                  label="Gender"
                  mode="outlined"
                  defaultText="Select Gender"
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
      padding: theme.spacing,
    },
  });
};
