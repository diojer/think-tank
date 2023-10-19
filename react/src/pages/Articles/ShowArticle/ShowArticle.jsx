import React, { useEffect, useState } from "react";
import "./ShowArticle.css";
import { useParams } from "react-router-dom";
import axiosClient from "../../../utility/axios-client";
import { TitleBox } from "../../../components/TitleBox";
import parse, { attributesToProps } from "html-react-parser";

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
              {selectedArticle &&
                parse(selectedArticle.content, {
                  transform: (element, DOM, index) => {
                    if (DOM.attribs && DOM.attribs.href) {
                      DOM.attribs.target = "_blank";
                      const props = attributesToProps(DOM.attribs);
                      return (
                        <a {...props}>
                          {element.props.children.props.children}
                        </a> //what the fuck is this syntax man
                      );
                    }
                    return <>{element}</>;
                  },
                })}
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
