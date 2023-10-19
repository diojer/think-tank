import React from "react";
import "./TitleBox.css";

export const TitleBox = ({ children, image, color, font, type, textType }) => {
  const TYPES = ["top", "center", "bottom"];
  const TEXT_TYPES = ["left", "center", "right"];
  const checkType = TYPES.includes(type) ? type : TYPES[0];
  const checkText = TEXT_TYPES.includes(textType) ? textType : TEXT_TYPES[0];
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
            className={`title-box-title`}
            style={{
              color: `${font}`,
              textAlign: `${checkText}`,
            }}
          >
            {children}
          </p>
        </div>
      </div>
    </>
  );
};
