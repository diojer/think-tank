import React, { useEffect, useState } from "react";
import "./ShowArticle.css";
import { useParams } from "react-router-dom";
import axiosClient from "../../../utility/axios-client";
import { TitleBox } from "../../../components/TitleBox";
import parse from "html-react-parser";

function ShowArticle() {
  const { article } = useParams();
  const [selectedArticle, setSelectedArticle] = useState(null);
  useEffect(() => {
    getArticle(article);
  }, []);
  const getArticle = (key) => {
    axiosClient.get(`/articles/${key}`).then(({ data }) => {
      setSelectedArticle(data.data);
    });
  };
  return (
    <>
      {selectedArticle ? (
        <>
          <TitleBox
            image={`${import.meta.env.VITE_API_PUBLIC_URL}${
              selectedArticle.bannerImage
            }`}
            color="#2e2d2b"
            font="white"
            type="bottom"
          >
            {selectedArticle.title}
          </TitleBox>
          <div className="selected-article-wrapper">
            <p className="selected-article-author">{selectedArticle.author}</p>
            <div className="selected-article-content">
              {selectedArticle && parse(selectedArticle.content)}
            </div>
          </div>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </>
  );
}

export default ShowArticle;
