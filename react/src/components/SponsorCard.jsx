import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SponsorCard.css";
import LazyBackgroundImage from "../utility/LazyBackgroundImage";

export const SponsorCard = ({
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
    <div className="sponsor-card-whole">
      <div className="sponsor-card">
        <p className="sponsor-subject">{subject}</p>
        <LazyBackgroundImage
          className="sponsor-thumbnail"
          img={`${thumbnail}`}
        ></LazyBackgroundImage>
        {path ? (
          <Link to={path} className="sponsor-card-title" {...linkProps}>
            <p className="sponsor-card-headlines">{title}</p>
          </Link> //Modelled after the Carnegie Endowment webite, only the text is a hyperlink, image, etc. isn't clickable
        ) : (
          <p className="sponsor-card-title">{title}</p>
        )}
        <p className="sponsor-author">{author}</p>
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
