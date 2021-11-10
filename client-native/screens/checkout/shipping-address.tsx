/* eslint-disable react-native/no-inline-styles */
import { Formik } from 'formik';
import React, { Fragment, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import Input from '../../components/input';
import PickerBox from '../../components/picker-box';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import { checkoutAddressSchema } from '../../shared/utils/validations.schema';

const cityOptions: { title: string; value: string }[] = [
  { title: 'Dhaka', value: 'dhaka' },
  { title: 'Chittagong', value: 'chittagong' },
  { title: 'Rajshahi', value: 'rajshahi' },
];

const areaOptions: { title: string; value: string }[] = [
  { title: 'Dhaka', value: 'dhaka' },
  { title: 'Chittagong', value: 'chittagong' },
  { title: 'Rajshahi', value: 'rajshahi' },
];

interface IFormState {
  address: string;
  area: string;
  city: string;
  zip: string;
  mobile: string;
}

const ShippingAddress = memo(({ onComplete }: { onComplete(): void }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');

  const initialState: IFormState = {
    address: '',
    area: '',
    city: '',
    zip: '',
    mobile: '',
  };

  const onsubmitHandler = async (
    values: IFormState
    // { resetForm }: FormikHelpers<IFormState>
  ): Promise<any> => {
    console.log(values);
    onComplete();
  };

  return (
    <Formik
      validationSchema={checkoutAddressSchema}
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
          <Fragment>
            <View style={isSmUp && styles.formGroup}>
              <Input
                classes={{
                  root: [styles.input, isSmUp && { flexBasis: '60%' }],
                }}
                mode="outlined"
                label="Mobile"
                value={values.mobile || ''}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                left={<TextInput.Affix text="+88" />}
                error={!!touched.mobile && !!errors.mobile}
                helperText={
                  !!touched.mobile && !!errors.mobile
                    ? errors.mobile
                    : undefined
                }
                theme={theme}
                keyboardType="number-pad"
              />
              <Input
                classes={{
                  root: [styles.input, isSmUp && { flexBasis: '40%' }],
                }}
                mode="outlined"
                label="Zip"
                value={values.zip || ''}
                onChangeText={handleChange('zip')}
                onBlur={handleBlur('zip')}
                error={!!touched.zip && !!errors.zip}
                helperText={
                  !!touched.zip && !!errors.zip ? errors.zip : undefined
                }
                theme={theme}
                keyboardType="number-pad"
              />
            </View>
            <Input
              classes={{ root: styles.input }}
              mode="outlined"
              label="Address"
              value={values.address || ''}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
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
                isSmUp && { flexDirection: 'row', alignItems: 'center' },
              ]}
            >
              <View style={{ flex: 1, paddingHorizontal: theme.spacing }}>
                <PickerBox
                  options={cityOptions}
                  onChange={(value) => setFieldValue('city', value)}
                  selectedValue={values.city || ''}
                  label="City"
                  mode="outlined"
                  defaultText="Select City"
                />
              </View>
              <View style={{ flex: 1, paddingHorizontal: theme.spacing }}>
                <PickerBox
                  options={areaOptions}
                  onChange={(value) => setFieldValue('area', value)}
                  selectedValue={values.area || ''}
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
                Next
              </Button>
            </View>
          </Fragment>
        );
      }}
    </Formik>
  );
});

export default ShippingAddress;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    formGroup: {
      flexDirection: 'row',
    },
    input: {
      padding: theme.spacing,
    },
  });
};
