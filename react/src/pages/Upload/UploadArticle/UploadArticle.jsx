import React from "react";
import "./UploadArticle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Button";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";
import axiosClient from "../../../utility/axios-client";

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
    title: "",
    author: "",
    subject: "",
    tags: "",
    content: "",
};

/*
const onUpload = (data) => {
    console.log("Test");
    const images = new FormData();
    const filePath = "/images/articles/";
    images.append("bannerImage", data.bannerImage);
    images.append("cardImage", data.cardImage);
    data.bannerImage = `${filePath}${data.bannerImage.name}`;
    data.cardImage = `${filePath}${data.cardImage.name}`;
    //upload image here
    axios
        .post(`${VPS}/articles/images`, images, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            if (response.data.uploaded) {
                axios
                    .post(`${VPS}/articles`, data, {
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                    .then((reply) => {
                        if (reply.data.uploaded) {
                            alert(`${reply.data.message}`);
                        } else {
                            alert(`Failed to upload to database.`);
                        }
                    });
            } else {
                alert(
                    `${response.data.message}: Error Code ${response.data.err}. Are you sure you're logged in? `
                );
            }
        });
};
*/

const onUpload = (data) => {
    console.log({ 
        fileName: data.cardImage.name, 
        type: data.cardImage.type,
        size: `${data.cardImage.size} bytes`
    })
    axiosClient
        .post("/articleupload", data)
        .then()
        .catch((err) => {
            const response = err.response;
            //response.status===422 //422 is a validation error
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        });
};

function UploadArticle() {
    return (
        <div className="upload-article-form-wrapper">
            <Formik
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
                        Policy Area (e.g., Education, Energy and Environment,
                        etc.):
                    </label>
                    <Field name="subject" />
                    <label>
                        Tags (seperated by comma){" "}
                        <span className="red">(Optional)</span>:
                    </label>
                    <Field name="tags" />
                    <label>
                        Banner Image (landscape images are best suited)
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
                    <label>Card Image (square images are best suited)</label>
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
                        Article Content (If you can't see the rich-text editor
                        you should disable extensions/adblocker):
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

export default UploadArticle;
