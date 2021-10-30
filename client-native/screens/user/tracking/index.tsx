import { Formik, FormikHelpers } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Input2 from "../../../components/input2";
import { trackingOrderSchema } from "../../../shared/utils/validations.schema";

interface IState {
  id: string;
}

const Tracking = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const initialState: IState = {
    id: "",
  };

  const onsubmitHandler = async (
    values: IState,
    { resetForm }: FormikHelpers<IState>
  ): Promise<any> => {};

  return (
    <View>
      <Formik
        validationSchema={trackingOrderSchema}
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
        }) => {
          return (
            <View style={styles.form}>
              <Input2
                classes={{
                  wrapper: { flex: 1 },
                  root: { textTransform: "uppercase" },
                }}
                placeholder="bp-xxxx"
                value={values.id}
                onBlur={handleBlur("id")}
                onChangeText={handleChange("id")}
                error={!!touched.id && !!errors.id}
                helperText={!!touched.id && !!errors.id ? errors.id : undefined}
              />
              <Button
                color={theme.colors.palette.secondary.main}
                style={{ marginLeft: theme.spacing * 2 }}
                onPress={handleSubmit}
                mode="contained"
                disabled={!(isValid && dirty)}
                loading={isSubmitting}
              >
                Tracking
              </Button>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

Tracking.displayName = "Tracking";
export default Tracking;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    form: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: 600,
    },
  });
};
