import { Formik, FormikHelpers } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Input from "../../../components/input";
import PickerBox from "../../../components/picker-box";
import { breakpointsWithDimensions } from "../../../shared/utils";
import { shippingAddressSchema } from "../../../shared/utils/validations.schema";

interface IFormState {
  address: string | null;
  area: string | null;
  city: string | null;
  zip: string | null;
}

const cityOptions: { title: string; value: string }[] = [
  { title: "Dhaka", value: "dhaka" },
  { title: "Chittagong", value: "chittagong" },
  { title: "Rajshahi", value: "rajshahi" },
];

const ShippingDetailForm = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp, isMdUp],
  } = breakpointsWithDimensions.up(["sm", "md"]);
  const initialState: IFormState = {
    address: "",
    area: "",
    city: "",
    zip: "",
  };

  const onsubmitHandler = async (
    values: IFormState,
    { resetForm }: FormikHelpers<IFormState>
  ): Promise<any> => {};

  return (
    <Formik
      validationSchema={shippingAddressSchema}
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
        return (
          <View>
            <Input
              classes={{ root: styles.input }}
              mode="outlined"
              label="Zip"
              value={values.zip || ""}
              onChangeText={handleChange("zip")}
              onBlur={handleBlur("zip")}
              error={!!touched.zip && !!errors.zip}
              helperText={
                !!touched.zip && !!errors.zip ? errors.zip : undefined
              }
              theme={theme}
              keyboardType="number-pad"
            />
            <Input
              classes={{ root: styles.input }}
              mode="outlined"
              label="Address"
              value={values.address || ""}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              error={!!touched.address && !!errors.address}
              helperText={
                !!touched.address && !!errors.address
                  ? errors.address
                  : undefined
              }
              theme={theme}
              multiline
              numberOfLines={3}
            />
            <View
              style={[
                { paddingBottom: theme.spacing },
                isSmUp && { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <View style={{ flex: 1, paddingHorizontal: theme.spacing }}>
                <PickerBox
                  options={cityOptions}
                  onChange={(value) => setFieldValue("city", value)}
                  selectedValue={values.city || ""}
                  label="City"
                  mode="outlined"
                  defaultText="Select City"
                />
              </View>
              <View style={{ flex: 1, paddingHorizontal: theme.spacing }}>
                <PickerBox
                  options={[]}
                  onChange={(value) => setFieldValue("area", value)}
                  selectedValue={values.area || ""}
                  label="Area"
                  mode="outlined"
                  defaultText="Select Area"
                />
              </View>
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
          </View>
        );
      }}
    </Formik>
  );
};

ShippingDetailForm.displayName = "ShippingDetail.Form";
export default ShippingDetailForm;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    input: {
      padding: theme.spacing,
    },
  });
};
