import React from "react";
import "./CreateMember.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Button";
import axiosClient from "../../../utility/axios-client";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  role: Yup.string().required(),
});

const initialValues = {
  name: "",
  role: "",
};

function CreateMember() {
  const createAuthor = (data) => {
    axiosClient
      .post("/authors", {
        profileId: null,
        name: data.name,
        role: data.role,
      })
      .then(({ data }) => {
        alert("Author created successfully!");
      })
      .catch((err) => {
        const response = err.response;
          if (response && response.status === 422) {
            alert(response.data.errors);
          }
      });
    };

  return (
    <div className="create-member-form-wrapper upload-subwrapper">
      <p className="member-table-heading upload-subheader">Create Member</p>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={createAuthor}
      >
        <Form className="create-member-form">
          <label>Name:</label>
          <Field name="name" />
          <label>Role:</label>
          <Field name="role" />
          <Button type="submit">Create member</Button>
          <div className="error-messages-wrapper">
            <ErrorMessage name="name" component="p" />
            <ErrorMessage name="role" component="p" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateMember;
