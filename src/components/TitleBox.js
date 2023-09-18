import React from "react";
import "./TitleBox.css";

export const TitleBox = ({ children, image, color, font }) => {
  return (
    <>
      <div className="title-box-wrapper">
        <div
          className="title-box"
          style={{
            backgroundImage: `url(${image})`,
            backgroundColor: `${color}`,
          }}
        >
          <p
            className="title-box-title"
            style={{
              color: `${font}`,
            }}
          >
            {children}
          </p>
        </div>
      </div>
    </>
  );
};
