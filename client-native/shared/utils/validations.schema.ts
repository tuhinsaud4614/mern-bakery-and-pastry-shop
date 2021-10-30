import * as Yup from "yup";

export const userInfoSchema = Yup.object({
  firstName: Yup.string()
    .nullable()
    .min(3, "First Name should at least 3 characters")
    .matches(/^[a-zA-Z0-9]*$/, "First Name can only contain alphabet."),
  lastName: Yup.string()
    .nullable()
    .min(3, "Last Name should at least 3 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Last Name can only contain alphabet."),
  mobile: Yup.string()
    .nullable()
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8,9})$/,
      "Mobile should valid BD mobile number."
    ),
  gender: Yup.string().nullable().oneOf(["male", "female", "other", null]),
  dob: Yup.date().nullable(),
});
