import * as Yup from 'yup';

export const userInfoSchema = Yup.object({
  firstName: Yup.string()
    .nullable()
    .min(3, 'First Name should at least 3 characters')
    .matches(/^[a-zA-Z]*$/, 'First Name can only contain alphabet.'),
  lastName: Yup.string()
    .nullable()
    .min(3, 'Last Name should at least 3 characters')
    .matches(/^[a-zA-Z]*$/, 'Last Name can only contain alphabet.'),
  mobile: Yup.string()
    .nullable()
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8,9})$/,
      'Mobile should valid BD mobile number.'
    ),
  gender: Yup.string().nullable().oneOf(['male', 'female', 'other', null]),
  dob: Yup.date().nullable(),
});

export const shippingAddressSchema = Yup.object({
  address: Yup.string().nullable(),
  area: Yup.string().nullable(),
  city: Yup.string().nullable(),
  zip: Yup.string()
    .nullable()
    .matches(/^[0-9]+$/, 'Zip Code can only contain number.'),
});

export const trackingOrderSchema = Yup.object({
  id: Yup.string()
    .required('Tracking ID is required')
    .matches(/(^(bp|BP)\-[0-9]{6})$/, 'ID should be like this (bp-xxxxxx).'),
});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password should contain at least 6 characters.')
    .max(14, 'Password should not contain more than 14 characters.')
    .matches(
      /^[a-zA-Z0-9@_.-]*$/,
      'Password can only contain latin letters like (@ _ - .).'
    ),
});

export const registerFormSchema = Yup.object({
  firstName: Yup.string()
    .nullable()
    .min(3, 'First Name should at least 3 characters')
    .matches(/^[a-zA-Z]*$/, 'First Name can only contain alphabet.'),
  lastName: Yup.string()
    .nullable()
    .min(3, 'Last Name should at least 3 characters')
    .matches(/^[a-zA-Z]*$/, 'Last Name can only contain alphabet.'),
  email: Yup.string()
    .email('This is not valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should contain at least 6 characters.')
    .max(14, 'Password should not contain more than 14 characters.')
    .matches(/^[a-zA-Z0-9@_.-]*$/, 'Password can only contain latin letters.'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Password must be matched!'),
});
