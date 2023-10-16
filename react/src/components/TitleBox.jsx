import React from "react";
import "./TitleBox.css";

export const TitleBox = ({ children, image, color, font, type }) => {
  const TYPES = ["top", "center", "bottom"];
  const checkType = TYPES.includes(type) ? type : TYPES[0];
  return (
    <>
      <div className="title-box-wrapper">
        <div
          className="title-box"
          style={{
            backgroundImage: `url("${image}")`,
            backgroundColor: `${color}`,
            backgroundPosition: `${checkType}`,
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
