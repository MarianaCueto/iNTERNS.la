import React from "react";
import _logger from "sabio-debug";
import { Form, FormGroup } from "reactstrap";
import { Formik, Field } from "formik";
import PropTypes from "prop-types";
import { forgotPasswordValidationSchema } from "./forgotPasswordValidationSchema";
import { recover } from "../../services/userService";
import swal from "sweetalert";
import "../public/Landing.css";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
      },
    };
  }

  handleSubmit = (values) => {
    recover(values.email)
      .then(this.onGetByEmailSuccess)
      .catch(this.onGetByEmailError);
  };

  onGetByEmailSuccess = () => {
    const options = {
      title: "Check your email",
      text: "We sent you a link to change your password",
      icon: "success",
    };
    swal(options).then((value) => {
      if (value) {
        this.props.history.push(`/`);
      }
    });
  };

  onGetByEmailError = (err) => {
    let statusCode = String(err);
    statusCode = statusCode.substring(statusCode.length - 3);
    _logger(statusCode);
    if (statusCode === "404") {
      const options = {
        title: "Wrong Email",
        text: "The email is not registered with us",
        type: "warning",
        buttons: {
          close: {
            value: true,
            text: "Close",
            className: "bg-primary",
          },
        },
      };
      swal(options).then((value) => {
        if (value) {
          this.props.history.push("/forgot-password");
        }
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="wrapper forgot-page">
          <div className="watermark">
            <img
              className="path3 path1"
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
                    <h3>Forgot Password?</h3>
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
                      <h4 className="text-center forgot-text py-3">
                        Enter the email address associated with your iNTERNS.la
                        account.
                      </h4>
                      <Formik
                        enableReinitialize={true}
                        validationSchema={forgotPasswordValidationSchema}
                        initialValues={this.state.formData}
                        onSubmit={this.handleSubmit}
                        className="align-self-center"
                      >
                        {(props) => {
                          const {
                            values,
                            handleSubmit,
                            isValid,
                            isSubmitting,
                            errors,
                            touched,
                          } = props;
                          return (
                            <Form
                              onSubmit={handleSubmit}
                              className={"col-md-15 pt-4"}
                            >
                              <FormGroup>
                                <div className="form-group forgot-email">
                                  <label className="form_text mr-2">
                                    Email
                                  </label>
                                  {errors.email && touched.email && (
                                    <span className="input-feedback text-danger">
                                      {errors.email}
                                    </span>
                                  )}
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-envelope"></i>
                                      </span>
                                    </div>
                                    <Field
                                      name="email"
                                      type="text"
                                      values={values.email}
                                      placeholder="Enter a registered Email Address"
                                      autoComplete="off"
                                      className={
                                        errors.email && touched.email
                                          ? "form-control error"
                                          : "form-control"
                                      }
                                    />
                                  </div>
                                </div>
                              </FormGroup>
                              <div className="ml-1 forgot_reset">
                                <button
                                  className="btn btn-block purple_btn mx-auto w-75 forgot_reset_btn"
                                  type="submit"
                                  disabled={!isValid || isSubmitting}
                                >
                                  Reset
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
            <div className="forgot-footer-message ml-auto mr-auto text-center mt-5 mx col-md-8">
              <h4 className="desc">
                Has your email changed?{" "}
                <a className="signUp" href="/contact-us">
                  Contact Us
                </a>
              </h4>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
ForgotPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),

  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
};
export default ForgotPassword;
