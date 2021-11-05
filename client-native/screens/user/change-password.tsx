import { Formik, FormikHelpers } from "formik";
import React, { Fragment } from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Input from "../../components/input";
import { breakpointsWithDimensions } from "../../shared/utils";
import { changePasswordSchema } from "../../shared/utils/validations.schema";

interface IFormState {
  oldPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const theme = useTheme();
  const {
    breakpoints: [isSmUp],
  } = breakpointsWithDimensions.up(["sm"]);

  const initialState: IFormState = {
    newPassword: "",
    oldPassword: "",
  };

  const onsubmitHandler = async (
    values: IFormState,
    { resetForm }: FormikHelpers<IFormState>
  ): Promise<any> => {};

  return (
    <View style={{ maxWidth: 600 }}>
      <Formik
        validationSchema={changePasswordSchema}
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
                  classes={{ root: { flex: 1, padding: theme.spacing } }}
                  mode="outlined"
                  label="Old Password"
                  value={values.oldPassword}
                  onChangeText={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  error={!!touched.oldPassword && !!errors.oldPassword}
                  helperText={
                    !!touched.oldPassword && !!errors.oldPassword
                      ? errors.oldPassword
                      : undefined
                  }
                  theme={theme}
                />

                <Input
                  theme={theme}
                  mode="outlined"
                  label="New Password"
                  value={values.newPassword}
                  outlineColor={theme.colors.palette.primary.light}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  error={!!touched.newPassword && !!errors.newPassword}
                  helperText={
                    !!touched.newPassword && !!errors.newPassword
                      ? errors.newPassword
                      : undefined
                  }
                  classes={{ root: { flex: 1, padding: theme.spacing } }}
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
