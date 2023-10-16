import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../../components/Button";
import * as Yup from "yup";
import "./EmailForm.css";
import axiosClient from "../../../utility/axios-client";

const addToMailingList = (data, helpers) => {
  axiosClient
    .post("/mailinglist", data)
    .then(({ data }) => {
      helpers.resetForm(initialValues);
    })
    .catch((err) => {
      console.log(err);
    });
};

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export const EmailForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={addToMailingList}
      validationSchema={validationSchema}
    >
      <Form className="email-signup-form">
        <div className="email-form-second-row">
          <Field
            name="email"
            className="email-input-textbox email-email"
            placeholder="Email"
          />
          <Button
            type="submit"
            buttonStyle="btn--secondary"
            buttonSize="btn--medium"
          >
            GO
          </Button>
        </div>
        <div className="email-form-errors">
          <ErrorMessage name="forename" component="p" />
          <ErrorMessage name="surname" component="p" />
          <ErrorMessage name="email" component="p" />
        </div>
      </Form>
    </Formik>
  );
};
