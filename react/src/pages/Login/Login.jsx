import React from "react";
import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axiosClient from "../../utility/axios-client";
import { Link } from "react-router-dom";
import { UseStateContext } from "../../contexts/ContextProvider";

//component imports
import { Button } from "../../components/Button";

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("*A valid email is required")
    .required("*An email is required"),
  password: Yup.string().required("*A password is required"),
  remember: Yup.boolean(),
});

function Login() {
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const { user, token, setUser, setToken, setAdmin } = UseStateContext();

  const login = (data, helpers) => {
    setErrors({});
    axiosClient
      .post("/login", data)
      .then(({ data }) => {
        helpers.resetForm(initialValues);
        setUser(data.user);
        setToken(data.token);
        setAdmin(data.admin);
        setLoginStatus(true);
      })
      .catch(({ response }) => {
        //response.status===422 //422 is a validation error
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
          setLoginStatus(false);
        }
      });
  };

  const logout = () => {
    axiosClient
      .post("/logout")
      .then(({ data }) => {
        setToken();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO: Fill out requesting link
  const requestLink = () => {
    axiosClient
    .post()
  };

  return (
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${
          import.meta.env.VITE_API_PUBLIC_URL
        }/images/leeds-clocktower.jpg)`,
      }}
    >
      <div className="login-form-box">
        {token ? (
          <>
            <p className="login-title">You are logged in!</p>
            <div className="logout-wrapper">
              {user.profileId ? (
                <>
                  {(user.profileId >= 0) ? (
                    <>
                      <Button
                        onClick={(e) => {
                          // TODO: Implement editing of profile
                          // This is just a placeholder
                          logout();
                        }}
                        buttonStyle="btn--fourth"
                      >
                        Unlink Account
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="linking-title">Waiting for admin to link account</p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Button
                  onClick={(e) => {
                    requestLink();
                  }}
                  buttonStyle="btn--fourth"
                  >
                    Link Account
                  </Button>
                </>
              )}
              <Button
                onClick={(e) => {
                  logout();
                }}
                buttonStyle="btn--fourth"
              >
                Logout
              </Button>
            </div>
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
                  <label className="email-label login-label">Email:</label>
                  <Field
                    className="email-input login-input"
                    name="email"
                    placeholder="Type your email..."
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
                  <div className="error-messages-wrapper">
                    <ErrorMessage name="email" component="p" />
                    <ErrorMessage name="password" component="p" />
                    {Object.keys(errors).map((key) => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
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
