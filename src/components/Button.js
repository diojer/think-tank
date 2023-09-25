import React, { useEffect } from "react";
import "./Button.css";
import { Link, useNavigate } from "react-router-dom";

const STYLES = ["btn--primary", "btn--secondary", "btn--third"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({ children, type, path, buttonStyle, buttonSize }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <>
      {path ? (
        <Link to={path}>
          <button className={`btn ${checkButtonStyle} ${checkButtonSize} `}>
            {children}
          </button>
        </Link>
      ) : (
        <button
          type={type}
          className={`btn ${checkButtonStyle} ${checkButtonSize} `}
        >
          {children}
        </button>
      )}
    </>
  );
};
