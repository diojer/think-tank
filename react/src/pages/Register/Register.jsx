import React from "react";
import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axiosClient from "../../utility/axios-client";
import { Button } from "../../components/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UseStateContext } from "../../contexts/ContextProvider";

const initialValues = {
  name: "",
  password: "",
  confirmPassword: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Your name is required"),
  password: Yup.string().required("*A password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  email: Yup.string()
    .email("*A valid email is required")
    .required("*An email is required"),
});

function Register() {
  const [regMessage, setRegMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [regStatus, setRegStatus] = useState(false);

  const registration = (data, helpers) => {
    setErrors({});
    axiosClient
      .post("/signup", data)
      .then(({ data }) => {
        setRegMessage({ message: data.message });
        setRegStatus(true);
        helpers.resetForm(initialValues);
      })
      .catch(({ response }) => {
        //response.status===422 //422 is a validation error
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          setRegStatus(false);
        }
      });
  };

  //Can't register a new account if still logged in
  const { token } = UseStateContext();
  if (token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="background-image">
      <div className="register-form-box">
        <p className="register-title">Register a new Account</p>
        <div className="register-form-wrapper">
          <Formik
            initialValues={initialValues}
            onSubmit={registration}
            validationSchema={validationSchema}
          >
            <Form className="register-form">
              <label className="username-label register-label">Name:</label>
              <Field
                className="username-input register-input"
                name="name"
                placeholder="Type your name"
              />
              <label className="email-label register-label">Email:</label>
              <Field
                className="email-input register-input"
                name="email"
                placeholder="Type your Email"
                onKeyUp={(e) => {
                  setErrors({});
                }}
              />
              <label className="password-label register-label">Password:</label>
              <Field
                className="password-input register-input"
                name="password"
                type="password"
                placeholder="Type your Password"
              />
              <label className="password-label register-label">
                Confirm Password:
              </label>
              <Field
                className="confirm-password-input register-input"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your Password"
              />
              <div className="error-messages-wrapper">
                <ErrorMessage name="name" component="p" />
                <ErrorMessage name="password" component="p" />
                <ErrorMessage name="confirmPassword" component="p" />
                <ErrorMessage name="email" component="p" />
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
              <Button
                type="submit"
                buttonStyle="btn--primary"
                buttonSize="btn--medium"
              >
                Register
              </Button>
              {regStatus && (
                <>
                  <p className={`upload-message ${regStatus}`}>
                    {regMessage.message}
                  </p>
                  <Link className="redirect-message" to="/login">
                    Click here to go to the Login page
                  </Link>
                </>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
