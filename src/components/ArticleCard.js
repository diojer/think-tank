import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ArticleCard.css";

export const ArticleCard = ({
  subject,
  thumbnail,
  title,
  type,
  author,
  path,
}) => {
  // const suggestList = [
  //   <p className="suggested-article-title">test article...</p>,
  // ];
  // const placeHolderForFunction = 0;
  // for (let i = 0; i < placeHolderForFunction; i++) {
  //   suggestList.push(<p className="suggested-article-title"></p>);
  // }
  return (
    <div className="article-card-whole">
      <div className="article-card">
        <p className="article-subject">{subject}</p>
        <div
          className="article-thumbnail"
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        ></div>
        {path ? (
          <Link to={path} className="article-card-title">
            <p className="article-card-headlines">{title}</p>
          </Link>
        ) : (
          <p className="article-card-title">{title}</p>
        )}
        <p className="article-author">{author}</p>
        <p className="article-type">{type}</p>
      </div>
      <div className="suggested">
        {/* <p className="suggested-subject">More on {subject}...</p> */}
        <hr />
        {/* <div className="suggested-list">{suggestList}</div> */}
      </div>
    </div>
  );
};
