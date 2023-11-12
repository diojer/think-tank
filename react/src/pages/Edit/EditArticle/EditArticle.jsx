import React from "react";
import "./EditArticle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Button";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import axiosClient from "../../../utility/axios-client";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditArticle() {
  const [selectedArticle, setSelectedArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const { article } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getArticle(article);
  }, []);

  const getArticle = (key) => {
    setLoading(true);
    axiosClient.get(`/articles/${key}`).then(({ data }) => {
      setSelectedArticle(data.data);
      setLoading(false);
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    author: Yup.string().required(),
    subject: Yup.string().required(),
    tags: Yup.string(),
    content: Yup.string().required(),
    cardImage: Yup.mixed(),
    bannerImage: Yup.mixed(),
  });

  const initialValues = {
    title: selectedArticle.title,
    author: selectedArticle.author,
    subject: selectedArticle.subject,
    tags: selectedArticle.tags,
    byline: selectedArticle.byline,
    content: selectedArticle.content,
  };

  const onUpload = (data) => {
    let formData = new FormData();

    //if we append as "null", stringifying the JSON turns it into 'null',
    //best to just not attach anything, back-end can deal with it.
    if (data.bannerImage) {
      formData.append("bannerImage", data.bannerImage);
    }
    if (data.cardImage) {
      formData.append("cardImage", data.cardImage);
    }

    let payload = JSON.stringify({
      title: data.title,
      author: data.author,
      subject: data.subject,
      tags: data.tags,
      byline: data.byline,
      content: data.content,
    });

    formData.append("payload", payload);
    formData.append("_method", "PUT"); //put doesn't work with HTML forms, needs to be added manually.

    axiosClient
      .post(`/articles/${selectedArticle.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Article edited successfully!");
        navigate(`/articles/${selectedArticle.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UploadImage = (blobInfo, resolve, reject) => {
    const blob = blobInfo.blob();
    const image = new FormData();
    image.append("image", blob);
    axiosClient
      .post("/article/image", image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(
          `${import.meta.env.VITE_API_PUBLIC_URL}${response.data.location}`
        );
      })
      .catch((error) => {
        reject("failed!");
      });
  };

  return (
    <div className="upload-article-form-wrapper upload-subwrapper">
      <div className="back-button-wrapper">
        <Button
          buttonStyle="btn--blue"
          onClick={(e) => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
      </div>
      <p className="article-table-heading upload-subheader">
        Edit Article {selectedArticle.id}
      </p>
      {loading ? (
        <p className="article-edit-loading">Loading article...</p>
      ) : (
        <>
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
                Tags (seperated by comma){" "}
                <span className="red">(Optional)</span>:
              </label>
              <Field name="tags" />
              <label>
                {" "}
                Banner Image
                <a
                  onClick={(e) => {
                    alert(
                      "Landscape images are best suited for this. This will be displayed when your article is at the top of the homescreen."
                    );
                  }}
                  className="tooltip"
                >
                  (?)
                </a>
              </label>
              <Field name="bannerImage">
                {({ form }) => {
                  const { setFieldValue } = form;
                  return (
                    <input
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          "bannerImage",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  );
                }}
              </Field>
              <label>
                Card Image
                <a
                  onClick={(e) => {
                    alert(
                      "Square images are best suited for this. This will be displayed on the article page and at the bottom of the homescreen."
                    );
                  }}
                  className="tooltip"
                >
                  (?)
                </a>
              </label>
              <Field name="cardImage">
                {({ form }) => {
                  const { setFieldValue } = form;
                  return (
                    <input
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          "cardImage",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  );
                }}
              </Field>
              <label>
                Byline/Subheading <span className="red">(Optional)</span>:
              </label>
              <Field name="byline" />
              <label>
                Article Content (If you can't see the rich-text editor you
                should disable extensions/adblocker):
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
                            "anchor image autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount",
                          toolbar:
                            "undo redo | blocks fontfamily fontsize | forecolor backcolor bold italic underline | link image table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                          images_upload_handler: (blobInfo) =>
                            new Promise((resolve, reject) => {
                              UploadImage(blobInfo, resolve, reject);
                            }),
                          automatic_uploads: true,
                        }}
                        onEditorChange={(content) => {
                          setFieldValue("content", content);
                        }}
                      />
                    </>
                  );
                }}
              </Field>
              <Button type="submit">Edit Article</Button>
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
        </>
      )}
    </div>
  );
}

export default EditArticle;
