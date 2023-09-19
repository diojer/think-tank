import React from "react";
import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("*A username is required"),
  password: Yup.string().required("*A password is required"),
  email: Yup.string()
    .email("*A valid email is required")
    .required("*An email is required"),
});

const register = () => {};

function Register() {
  return (
    <div className="background-image">
      <div className="register-form-box">
        <p className="register-title">Register a new Account</p>
        <div className="register-form-wrapper">
          <Formik
            initialValues={initialValues}
            onSubmit={register}
            validationSchema={validationSchema}
          >
            <Form className="register-form">
              <label className="username-label register-label">Username:</label>
              <Field
                className="username-input register-input"
                name="username"
                placeholder="Type your Username"
              />
              <label className="password-label register-label">Password:</label>
              <Field
                className="password-input register-input"
                name="password"
                type="password"
                placeholder="Type your Password"
              />
              <label className="email-label register-label">Email:</label>
              <Field
                className="email-input register-input"
                name="email"
                placeholder="Type your Email"
              />
              <div className="error-messages-wrapper">
                <ErrorMessage name="username" component="p" />
                <ErrorMessage name="password" component="p" />
                <ErrorMessage name="email" component="p" />
              </div>
              <Button
                type="submit"
                buttonStyle="btn--primary"
                buttonSize="btn--medium"
              >
                Register
              </Button>
              <Link className="register" to="/register">
                If you are part of the committee and don't have an account,
                click here to signup.
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
