import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, useTheme } from 'react-native-paper';
import Input from '../../components/input';
import PasswordInput from '../../components/password-input';
import Spacer from '../../components/spacer';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import { registerFormSchema } from '../../shared/utils/validations.schema';

interface IFormState {
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  confirmPassword: string;
  isSubscribed: boolean;
}

const RegisterForm = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');

  const initialState: IFormState = {
    firstName: null,
    lastName: null,
    email: '',
    confirmPassword: '',
    password: '',
    isSubscribed: false,
  };

  const onsubmitHandler = async (
    values: IFormState
    // { resetForm }: FormikHelpers<IFormState>
  ): Promise<any> => {
    console.log(values);
  };

  return (
    <Formik
      validationSchema={registerFormSchema}
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
          <View style={styles.form}>
            <View style={isSmUp && styles.formGroup}>
              <Input
                theme={theme}
                mode="outlined"
                label="First Name"
                value={values.firstName || ''}
                onBlur={handleBlur('firstName')}
                onChangeText={handleChange('firstName')}
                error={!!touched.firstName && !!errors.firstName}
                helperText={
                  !!touched.firstName && !!errors.firstName
                    ? errors.firstName
                    : undefined
                }
                classes={{ root: styles.input }}
              />
              {isSmUp && <Spacer weight={16} />}
              <Input
                theme={theme}
                mode="outlined"
                label="Last Name"
                value={values.lastName || ''}
                onBlur={handleBlur('lastName')}
                onChangeText={handleChange('lastName')}
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
              label="Email"
              keyboardType="email-address"
              value={values.email}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              error={!!touched.email && !!errors.email}
              helperText={
                !!touched.email && !!errors.email ? errors.email : undefined
              }
              classes={{ root: styles.input }}
            />
            <PasswordInput
              theme={theme}
              mode="outlined"
              label="Password"
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              error={!!touched.password && !!errors.password}
              helperText={
                !!touched.password && !!errors.password
                  ? errors.password
                  : undefined
              }
              classes={{ root: styles.input }}
            />
            <PasswordInput
              theme={theme}
              mode="outlined"
              label="Confirm Password"
              value={values.confirmPassword}
              onBlur={handleBlur('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
              error={!!touched.confirmPassword && !!errors.confirmPassword}
              helperText={
                !!touched.confirmPassword && !!errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
              classes={{ root: styles.input }}
            />
            <View style={styles.subscribeWrapper}>
              <Checkbox.Item
                label="Subscribe to our newsletter"
                status={values.isSubscribed ? 'checked' : 'unchecked'}
                onPress={() =>
                  setFieldValue('isSubscribed', !values.isSubscribed)
                }
                position="leading"
                color={theme.colors.palette.secondary.main}
                style={styles.subscribe}
                labelStyle={{
                  color:
                    theme.colors.palette.primary[
                      values.isSubscribed ? 'main' : 'light'
                    ],
                }}
              />
            </View>
            <View style={styles.btnWrapper}>
              <Button
                color={theme.colors.palette.secondary.main}
                onPress={handleSubmit}
                mode="contained"
                disabled={!(isValid && dirty)}
                loading={isSubmitting}
                style={isSmUp ? styles.btn : styles.smUpBtn}
              >
                Create Account
              </Button>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    form: {
      width: '100%',
    },
    formGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    input: {
      flex: 1,
      marginTop: theme.spacing,
    },
    subscribeWrapper: {
      paddingTop: theme.spacing,
    },
    subscribe: {
      paddingHorizontal: 0,
      maxWidth: 250,
    },
    btnWrapper: {
      marginVertical: theme.spacing,
    },
    btn: {
      width: 300,
    },
    smUpBtn: {
      width: '100%',
    },
  });
};
