import * as Yup from "yup";

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .matches(
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,4})/,
      "Enter a valid email"
    )
    .required("Please enter a registered email")
});

export { forgotPasswordValidationSchema };
