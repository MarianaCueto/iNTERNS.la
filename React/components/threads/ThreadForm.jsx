import React from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import * as threadsService from "../../services/threadsService";
import PropTypes from "prop-types";
import "./Thread.css";
import swal from "sweetalert";

class ThreadForm extends React.Component {
  state = {
    id: this.props.match.params.id,
    formData: {
      subject: "",
      isActive: true,
    },
    update: true,
  };

  componentDidMount() {
    if (!this.state.id) {
      this.setState(() => {
        return { update: false };
      });
    } else if (!this.props.location.state) {
      threadsService.getById(this.state.id).then(this.onGetByIdSuccess);
    } else {
      this.setState(() => {
        const editCard = this.props.location.state;
        return { formData: editCard };
      });
    }
  }
  onGetByIdSuccess = (data) => {
    _logger(data);
    const update = data.item;
    this.setState(() => {
      return {
        formData: {
          id: update.id,
          threadId: update.threadId,
          subject: update.subject,
          isActive: update.isActive,
        },
      };
    });
  };

  handleSubmit = (values, { resetForm }) => {
    _logger("submit");
    const thread = {
      id: this.state.formData.id,
      subject: values.subject,
      isActive: values.isActive,
    };

    if (!this.state.update) {
      threadsService.add(values).then(this.threadAddSuccess);
      resetForm(this.state.formData);
    } else {
      threadsService.update(values).then(this.threadUpdateSuccess);
    }
    this.setState(() => {
      return { formData: thread };
    });
  };

  threadUpdateSuccess = (data) => {
    _logger(data);
    swal("Congrats!", "Thread updated.", "success");
    this.setState(() => {
      return { update: false };
    });
    setTimeout(() => {
      this.props.history.push("/threads");
    }, 1500);
  };

  threadAddSuccess = (data) => {
    _logger(data);
    swal("Congrats!", "New thread created.", "success");
    this.props.history.push("/threads");
  };

  onChange = (event) => {
    const target = event.target;

    const value = target.value;
    const name = target.name;

    this.setState(() => {
      return { [name]: value };
    });
  };
  onSave = (formValues) => {
    _logger(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <div className="mt-4 ml-auto col-8 container card formcard " />
        <h1 className="text-center page-heading">
          {this.state.formData && this.props.match.params.id ? (
            <p className="text-center">Edit Thread</p>
          ) : (
            <p className="text-center">Create Thread</p>
          )}
        </h1>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            subject: Yup.string()
              .min(5, "Your subject is too short")
              .max(250, "Too Long!")
              .required("Please enter a subject"),
            isActive: Yup.boolean().required("Please check the box"),
          })}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting,
            } = props;

            return (
              <Form
                onSubmit={handleSubmit}
                className="thread-form  justify-content-center mx-auto col-sm-5 shadow-lg"
              >
                <FormGroup>
                  <div className="form-group1 justify-content-center row dashed">
                    <div className="col-sm-8">
                      <div className="position-relative row form-group1">
                        <label className="col-md-2 col-form-label">
                          Subject
                        </label>
                        <div className="col-md-10">
                          <Field
                            name="subject"
                            type="text"
                            values={values.subject}
                            placeholder="Subject"
                            autoComplete="off"
                            className={
                              errors.subject && touched.subject
                                ? "form-control error"
                                : "form-control"
                            }
                          />
                          {errors.subject && touched.subject && (
                            <span className="input-feedback">
                              {errors.subject}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  {this.state.formData && this.props.match.params.id ? (
                    <div className="form-group justify-content-center row dashed">
                      <div className="col-sm-8">
                        <div className="position-relative  row form-group1">
                          <label className="col-md-2 col-form-labe">
                            Active
                          </label>
                          <div className="col-md-1">
                            <Field
                              name="isActive"
                              type="checkbox"
                              checked={values.isActive}
                              className={
                                "checkbox" +
                                (errors.isActive && touched.isActive
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {errors.isActive && touched.isActive && (
                              <span className="input-feedback">
                                {errors.isActive}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </FormGroup>

                <Button
                  type="submit"
                  className="btn btn-submit"
                  disabled={!isValid || isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}
ThreadForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  threads: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      subject: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    }),
  }),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
};

export default ThreadForm;
