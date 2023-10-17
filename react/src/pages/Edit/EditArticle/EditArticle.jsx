import React from "react";
import "./EditArticle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Button";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import axiosClient from "../../../utility/axios-client";
import { useNavigate, useParams } from "react-router-dom";

function EditArticle() {
  const [selectedArticle, setSelectedArticle] = useState({});
  const { article } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getArticle(article);
  }, []);

  const getArticle = (key) => {
    axiosClient.get(`/articles/${key}`).then(({ data }) => {
      setSelectedArticle(data.data);
      console.log(selectedArticle);
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    author: Yup.string().required(),
    subject: Yup.string().required(),
    tags: Yup.string(),
    content: Yup.string().required(),
    cardImage: Yup.mixed().required(),
    bannerImage: Yup.mixed().required(),
  });

  const initialValues = {
    title: selectedArticle.title,
    author: selectedArticle.author,
    subject: selectedArticle.subject,
    tags: selectedArticle.tags,
    content: selectedArticle.content,
  };

  const onUpload = (data) => {
    let formData = new FormData();

    formData.append("bannerImage", data.bannerImage);
    formData.append("cardImage", data.cardImage);

    let payload = JSON.stringify({
      title: data.title,
      author: data.author,
      subject: data.subject,
      tags: data.tags,
      content: data.content,
    });

    formData.append("payload", payload);

    axiosClient
      .put(`/articles/${selectedArticle.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        alert("Article edited successfully!");
        navigate(`/articles/${selectedArticle.id}`);
      })
      .catch((err) => {
        const response = err.response;
        //response.status===422 //422 is a validation error
        if (response && response.status === 422) {
          alert(response.data.errors);
        }
      });
  };

  return (
    <div className="upload-article-form-wrapper upload-subwrapper">
      <p className="article-table-heading upload-subheader">Upload Article</p>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onUpload}
      >
        <Form className="upload-article-form">
          <label>Title:</label>
          <Field name="title" />
          <label>Author:</label>
          <Field name="author" />
          <label>
            Policy Area (e.g., Education, Energy and Environment, etc.):
          </label>
          <Field name="subject" />
          <label>
            Tags (seperated by comma) <span className="red">(Optional)</span>:
          </label>
          <Field name="tags" />
          <label>Banner Image (landscape images are best suited)</label>
          <Field name="bannerImage">
            {({ form }) => {
              const { setFieldValue } = form;
              return (
                <input
                  type="file"
                  onChange={(event) => {
                    setFieldValue("bannerImage", event.currentTarget.files[0]);
                  }}
                />
              );
            }}
          </Field>
          <label>Card Image (square images are best suited)</label>
          <Field name="cardImage">
            {({ form }) => {
              const { setFieldValue } = form;
              return (
                <input
                  type="file"
                  onChange={(event) => {
                    setFieldValue("cardImage", event.currentTarget.files[0]);
                  }}
                />
              );
            }}
          </Field>
          <label>
            Article Content (If you can't see the rich-text editor you should
            disable extensions/adblocker):
          </label>
          <Field name="content">
            {({ form }) => {
              const { setFieldValue } = form;
              return (
                <>
                  <Editor
                    apiKey="4b6mrveofakq5g9eza49d9ve4hoc8y59winphb8mnjs9t6eh"
                    value={form.values.content}
                    init={{
                      height: 750,
                      menubar: true,
                      plugins:
                        "anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | forecolor backcolor bold italic underline | link table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                    }}
                    onEditorChange={(content) => {
                      setFieldValue("content", content);
                    }}
                  />
                </>
              );
            }}
          </Field>
          <Button type="submit">Upload Article</Button>
          <div className="error-messages-wrapper">
            <ErrorMessage name="title" component="p" />
            <ErrorMessage name="author" component="p" />
            <ErrorMessage name="subject" component="p" />
            <ErrorMessage name="bannerImage" component="p" />
            <ErrorMessage name="cardImage" component="p" />
            <ErrorMessage name="content" component="p" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EditArticle;