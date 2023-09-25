import React from "react";
import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

//utility imports
import { URLS } from "../../../utility/URLS";
const VPS = URLS.VPS;

const initialValues = {
  username: "",
  password: "",
  remember: false,
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
  remember: Yup.boolean(),
});

function Login() {
  const [uploadMessage, setUploadMessage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [permissions, setPermissions] = useState();
  useEffect(() => {
    axios.get(`${VPS}/users/permissions`).then((response) => {
      setPermissions(response.data.admin);
    });
  }, []);
  const login = (data, helpers) => {
    axios.post(`${VPS}/users/login`, data).then((response) => {
      setUploadMessage(response.data.message);
      setUploadStatus(response.data.valid);
      if (response.data.valid) {
        window.open("leedsthinktank.org.uk");
      }
    });
  };
  return (
    <div className="background-image">
      <div className="login-form-box">
        {permissions ? (
          <>
            <p className="login-title">You are logged in!</p>
          </>
        ) : (
          <>
            <p className="login-title">Login to your account</p>
            <div className="login-form-wrapper">
              <Formik
                initialValues={initialValues}
                onSubmit={login}
                validationSchema={validationSchema}
              >
                <Form className="login-form">
                  <label className="username-label login-label">
                    Username:
                  </label>
                  <Field
                    className="username-input login-input"
                    name="username"
                    placeholder="Type your Username"
                  />
                  <label className="password-label login-label">
                    Password:
                  </label>
                  <Field
                    className="password-input login-input"
                    name="password"
                    type="password"
                    placeholder="Type your Password"
                  />
                  <Link className="forgot-password">Forgot your password?</Link>
                  <label className="remember-me">
                    <Field type="checkbox" name="remember" /> Remember me (stay
                    logged in for 30 days)
                  </label>
                  <Button
                    type="submit"
                    buttonStyle="btn--primary"
                    buttonSize="btn--medium"
                  >
                    Login
                  </Button>
                  <Link className="register" to="/register">
                    If you don't have an account, click here to signup.
                  </Link>
                  {uploadMessage ? (
                    <p className={`upload-message ${uploadStatus}`}>
                      {uploadMessage}
                    </p>
                  ) : (
                    ""
                  )}
                </Form>
              </Formik>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
