import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ArticleCard.css";
import LazyBackgroundImage from "../utility/LazyBackgroundImage";

export const ArticleCard = ({
  subject,
  thumbnail,
  title,
  type,
  author,
  path,
  linkProps,
}) => {
  //We need to develop a function that searches the database for similar articles and pushes them to a suggestList variable
  return (
    <div className="article-card-whole">
      <div className="article-card">
        <p className="article-subject">{subject}</p>
        <LazyBackgroundImage
          className="article-thumbnail"
          img={`${thumbnail}`}
        ></LazyBackgroundImage>
        {path ? (
          <Link to={path} className="article-card-title" {...linkProps}>
            <p className="article-card-headlines">{title}</p>
          </Link> //Modelled after the Carnegie Endowment webite, only the text is a hyperlink, image, etc. isn't clickable
        ) : (
          <p className="article-card-title">{title}</p>
        )}
        <p className="article-author">{author}</p>
        {/* <p className="article-type">{type}</p> */}
      </div>
      <div className="suggested">
        {/* <p className="suggested-subject">More on {subject}...</p> */}
        {/* <hr /> */}
        {/* <div className="suggested-list">{suggestList}</div> */}
      </div>
    </div>
  );
};
