import React, { useEffect, useState } from "react";
import "./ShowArticle.css";
import { useParams } from "react-router-dom";
import axiosClient from "../../../utility/axios-client";
import { TitleBox } from "../../../components/TitleBox";
import parse, { attributesToProps } from "html-react-parser";

function ShowArticle() {
  const { article } = useParams();
  const [selectedArticle, _setSelectedArticle] = useState(null);
  const [time, setTime] = useState(null);
  useEffect(() => {
    getArticle(article);
  }, []);
  const getArticle = (key) => {
    axiosClient.get(`/articles/${key}`).then(({ data }) => {
      setSelectedArticle(data.data);
    });
  };
  function setSelectedArticle(article) {
    _setSelectedArticle(article);
    getTime(article.created_at);
  }
  const getTime = (publishing_date) => {
    let articleDate = new Date(publishing_date);
    let today = new Date();
    //next, get time difference in seconds
    let timeDifference = Math.floor(Math.abs(articleDate - today) / 36e5);
    console.log(articleDate, today);
    if (timeDifference < 24) {
      //less than 24 hours ago
      setTime(`${timeDifference} hours ago.`);
      return;
    }
    //days ago
    timeDifference = Math.round(timeDifference / 24);
    if (timeDifference < 30) {
      setTime(`${timeDifference} days ago.`);
      return;
    }
    //months ago
    timeDifference = Math.round(timeDifference / 30);
    if (timeDifference < 12) {
      setTime(`${timeDifference} months ago`);
      return;
    }
    //years ago
    timeDifference = math.round(timeDifference / 12);
    setTime(`${timeDifference} years ago.`);
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
            type="center"
            textType="center"
          />
          <div className="selected-article-wrapper">
            <p className="selected-article-title">{selectedArticle.title}</p>
            <p className="selected-article-author">
              Published by <a>{selectedArticle.author}</a> {time}
            </p>
            <div className="selected-article-content">
              {selectedArticle &&
                parse(selectedArticle.content, {
                  //parsing to html and adding target="_blank" to all <a> tags
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
          <div className="article-disclosure">
            <p className="article-disclosure-text">
              All articles and opinions posted give the views of the author(s)
              and do not necessarily reflect the views of the Leeds Think Tank,
              the Leeds University Union, or the University of Leeds.
            </p>
          </div>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </>
  );
}

export default ShowArticle;
