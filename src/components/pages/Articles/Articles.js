import React from "react";
import { TitleBox } from "../../TitleBox";
import "./Articles.css";

function Articles() {
  return (
    <>
      <TitleBox image="/images/img-28.jpg" color="#2e2d2b" font="white">
        Articles<span className="orange">:</span>
      </TitleBox>
      <div className="articles-wrapper">
        <div className="articles-WIP-message">
          <p className="articles-WIP-message-title">
            Sorry, no articles have been published yet.
          </p>
          <p className="articles-WIP-message-text">Please check again later!</p>
        </div>
      </div>
    </>
  );
}

export default Articles;
