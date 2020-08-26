import * as Yup from "yup";

const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .label("Password")
    .min(8, "The password needs to be 8 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Must contain a capital letter, a lowercase letter, and a number"
    )
    .required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Must match password above")
    .required("Must confirm password")
});

export { resetPasswordValidationSchema };
