import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TouchableRipple, useTheme } from 'react-native-paper';
import Input from '../../components/input';
import PasswordInput from '../../components/password-input';
import Typography from '../../components/typography';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import { loginFormSchema } from '../../shared/utils/validations.schema';

interface IFormState {
  email: string;
  password: string;
}

const LoginForm = () => {
  const theme = useTheme();
  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');
  const styles = makeStyles(theme, isSmUp);

  const initialState: IFormState = {
    email: '',
    password: '',
  };

  const onsubmitHandler = async (
    values: IFormState
    // { resetForm }: FormikHelpers<IFormState>
  ): Promise<any> => {
    console.log(values);
  };

  return (
    <Formik
      validationSchema={loginFormSchema}
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
            <TouchableRipple style={styles.forgotBtn} onPress={() => {}}>
              <Typography variant="h6" style={styles.forgotBtnText}>
                Forgot password?
              </Typography>
            </TouchableRipple>
            <View style={styles.btnWrapper}>
              <Button
                color={theme.colors.palette.secondary.main}
                onPress={handleSubmit}
                mode="contained"
                disabled={!(isValid && dirty)}
                loading={isSubmitting}
                style={isSmUp ? styles.btn : styles.smUpBtn}
              >
                Sign In
              </Button>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme, isSmUp: boolean) => {
  return StyleSheet.create({
    form: {
      width: '100%',
    },
    input: {
      flex: 1,
      marginTop: theme.spacing,
    },
    forgotBtn: {
      alignSelf: isSmUp ? 'flex-start' : 'flex-end',
      marginVertical: theme.spacing * 2,
      paddingHorizontal: theme.spacing,
    },
    forgotBtnText: {
      color: theme.colors.palette.secondary.main,
    },
    btnWrapper: {
      paddingBottom: theme.spacing * 2,
    },
    btn: {
      width: 300,
    },
    smUpBtn: {
      width: '100%',
    },
  });
};
