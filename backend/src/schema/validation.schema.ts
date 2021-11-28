import { isValidObjectId } from "mongoose";
import * as yup from "yup";

export const registerRequestBodySchema = yup.object().shape({
  body: yup.object().shape({
    firstName: yup
      .string()
      .nullable()
      .trim()
      .matches(
        /^[a-zA-Z]+(\s?|[a-zA-Z]?)+$/,
        "First name can only contain alphabet letters."
      ),
    lastName: yup
      .string()
      .nullable()
      .trim()
      .matches(
        /^[a-zA-Z]+(\s?|[a-zA-Z]?)+$/,
        "Last name can only contain alphabet letters."
      ),
    email: yup
      .string()
      .required("Email is required.")
      .email("This is not a valid email."),
    password: yup
      .string()
      .trim()
      .required("Password is required.")
      .min(6, "Password should contain at least 6 characters.")
      .max(14, "Password should not contain more than 14 characters.")
      .matches(
        /^[a-zA-Z0-9@_.-]*$/,
        "Password can only contain latin letters."
      ),
  }),
});

// Admin Category validations
export const categoryRequestBodySchema = yup.object().shape({
  body: yup.object().shape({
    title: yup.string().trim().required("Title is required."),
    slug: yup.string().trim().required("Slug is required."),
  }),
  file: yup.mixed().required("File is required."),
});

export const paramsIsValidObjectIdSchema = (key: string, message: string) =>
  yup.object().shape({
    params: yup.object().shape({
      [key]: yup
        .string()
        .test("is-ObjectID", message, (value) => isValidObjectId(value)),
    }),
  });
