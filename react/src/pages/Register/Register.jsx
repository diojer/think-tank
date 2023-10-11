import React from "react";
import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
};

const validationSchema = Yup.object().shape({
    username: Yup.string().required("*A username is required"),
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
    const [uploadMessage, setUploadMessage] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const registration = (data, helpers) => {
        // axios.post(`${VPS}/users`, data).then((response) => {
        //   setUploadMessage(response.data.message);
        //   setUploadStatus(response.data.valid);
        //   if (response.data.valid == true) {
        //     helpers.resetForm(initialValues);
        //   }
        // });
    };
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
                            <label className="username-label register-label">
                                Username:
                            </label>
                            <Field
                                className="username-input register-input"
                                name="username"
                                placeholder="Type your Username"
                            />
                            <label className="password-label register-label">
                                Password:
                            </label>
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
                            <label className="email-label register-label">
                                Email:
                            </label>
                            <Field
                                className="email-input register-input"
                                name="email"
                                placeholder="Type your Email"
                            />
                            <div className="error-messages-wrapper">
                                <ErrorMessage name="username" component="p" />
                                <ErrorMessage name="password" component="p" />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="p"
                                />
                                <ErrorMessage name="email" component="p" />
                            </div>
                            <Button
                                type="submit"
                                buttonStyle="btn--primary"
                                buttonSize="btn--medium"
                            >
                                Register
                            </Button>
                            {uploadMessage ? (
                                <p className={`upload-message ${uploadStatus}`}>
                                    {uploadMessage}
                                </p>
                            ) : (
                                ""
                            )}
                            {uploadStatus ? (
                                <Link className="redirect-message" to="/login">
                                    Click here to go to the Login page
                                </Link>
                            ) : (
                                ""
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Register;
