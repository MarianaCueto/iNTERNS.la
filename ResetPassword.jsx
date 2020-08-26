import React from "react";
import { Form, FormGroup } from "reactstrap";
import { Formik, Field } from "formik";
import { resetPasswordValidationSchema } from "./resetPasswordValidationSchema";
import _logger from "sabio-debug";
import { resetPassword } from "../../services/userService";
import PropTypes from "prop-types";
import swal from "sweetalert";
import "../public/Landing.css";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        password: "",
        passwordConfirm: ""
      }
    };
  }
  handleSubmit = values => {
    const { token } = this.props.match.params;
    if (token && token.length > 0) {
      let payload = {
        ...values,
        token
      };
      resetPassword(payload)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    }
  };

  onUpdateSuccess = response => {
    _logger(response);
    const options = {
      title: "Password changed",
      text: "Success",
      icon: "success",
      buttons: {
        confirm: {
          value: "confirm",
          text: "You will be redirected to the login page"
        }
      }
    };
    swal(options).then(value => {
      if (value === "confirm") {
        this.props.history.push("/");
      }
    });
  };
  onUpdateError = err => {
    _logger(err);
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper reset-password-page">
          <div className="watermark">
            <img
              className="path3 path4"
              alt="..."
              src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path4.43994fd6.png"
            />
            <img
              alt="..."
              className="path path4"
              src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path5.b9149b5f.png"
            />
            <div className="container register">
              <div className="d-flex justify-content-center reg-card h-100">
                <div className="card register_card">
                  <div className="card-header register_header">
                    <h3>Reset Password</h3>
                    <div className="d-flex justify-content-end social_icon">
                      <span>
                        <div className="brand-logo float-left">
                          <img
                            className="img forgot_logo"
                            src="https://sabio-training.s3-us-west-2.amazonaws.com/intern_ba3e54ba-37a8-4066-a9d3-a6aff778962fLOGO_iNTERNS_LA.png"
                            alt="App Logo"
                          />
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="card-body loginFields">
                    <div className="card-body">
                      <Formik
                        enableReinitialize={true}
                        validationSchema={resetPasswordValidationSchema}
                        initialValues={this.state.formData}
                        onSubmit={this.handleSubmit}
                        className="align-self-center"
                      >
                        {props => {
                          const {
                            values,
                            handleSubmit,
                            isValid,
                            isSubmitting,
                            errors,
                            touched
                          } = props;
                          return (
                            <Form
                              onSubmit={handleSubmit}
                              className={"col-md-15 pt-4"}
                            >
                              <FormGroup>
                                <div className="form-group forgot-email">
                                  <label className="form_text mr-2">
                                    Password
                                  </label>
                                  {errors.password && touched.password && (
                                    <span className="input-feedback text-danger">
                                      {errors.password}
                                    </span>
                                  )}
                                  <div className="input-group w-100">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-lock"></i>
                                      </span>
                                    </div>
                                    <Field
                                      name="password"
                                      type="password"
                                      values={values.password}
                                      placeholder="Password"
                                      autoComplete="off"
                                      className={
                                        errors.password && touched.password
                                          ? "form-control error"
                                          : "form-control"
                                      }
                                    />
                                  </div>
                                </div>
                              </FormGroup>
                              <FormGroup>
                                <div className="form-group">
                                  <label className="form_text mr-2">
                                    Confirm Password
                                  </label>
                                  {errors.passwordConfirm &&
                                    touched.passwordConfirm && (
                                      <span className="input-feedback text-danger">
                                        {errors.passwordConfirm}
                                      </span>
                                    )}
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-lock"></i>
                                      </span>
                                    </div>
                                    <Field
                                      name="passwordConfirm"
                                      type="password"
                                      values={values.passwordConfirm}
                                      placeholder="Confirm password"
                                      autoComplete="off"
                                      className={
                                        errors.passwordConfirm &&
                                        touched.passwordConfirm
                                          ? "form-control error"
                                          : "form-control"
                                      }
                                    />
                                  </div>
                                </div>
                              </FormGroup>
                              <div className="ml-1 reset_pwd">
                                <button
                                  className="btn btn-block purple_btn mx-auto w-75 reset_pwd_btn"
                                  type="submit"
                                  disabled={!isValid || isSubmitting}
                                >
                                  Submit
                                </button>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default ResetPassword;
