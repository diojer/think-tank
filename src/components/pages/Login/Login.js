import React from "react";
import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../../Button";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const login = () => {};

function Login() {
  return (
    <div className="background-image">
      <div className="login-form-box">
        <p className="login-title">Login to your account</p>
        <div className="login-form-wrapper">
          <Formik
            initialValues={initialValues}
            onSubmit={login}
            validationSchema={validationSchema}
          >
            <Form className="login-form">
              <label className="username-label login-label">Username:</label>
              <Field
                className="username-input login-input"
                name="username"
                placeholder="Type your Username"
              />
              <label className="password-label login-label">Password:</label>
              <Field
                className="password-input login-input"
                name="password"
                type="password"
                placeholder="Type your Password"
              />
              <Button
                type="submit"
                buttonStyle="btn--primary"
                buttonSize="btn--medium"
              >
                Login
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
