import { Formik } from "formik";
import React, { Fragment } from "react";
import { View } from "react-native";
import Input from "../../components/input";
import { breakpointsWithDimensions } from "../../shared/utils";

const ChangePassword = () => {
  const {
    breakpoints: [isSmUp],
  } = breakpointsWithDimensions.up(["sm"]);
  return (
    <View style={{ maxWidth: 600 }}>
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
          // console.log("values", values);
          // console.log(isValid, dirty);

          return (
            <Fragment>
              <View style={isSmUp && { flexDirection: "row" }}>
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
                  !!touched.mobile && !!errors.mobile
                    ? errors.mobile
                    : undefined
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
                style={[
                  { padding: theme.spacing },
                  isSmUp && { maxWidth: 300 },
                ]}
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
    </View>
  );
};

export default ChangePassword;
