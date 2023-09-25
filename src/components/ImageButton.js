import React from "react";
import "./ImageButton.css";
import { Link } from "react-router-dom";

const SHAPES = ["imgb--rect", "imgb--square", "imgb--thin"];

export const ImageButton = ({
  children,
  image,
  shape,
  color,
  path,
  newTab,
}) => {
  const checkShape = SHAPES.includes(shape) ? shape : SHAPES[0];
  return (
    <>
      {newTab ? (
        <a
          href={path}
          target="_blank"
          className={`image-button-link ${checkShape}`}
        >
          <div
            className={`image-button ${checkShape}`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundColor: `${color}`,
            }}
          >
            <p className="image-button-text">{children}</p>
          </div>
        </a>
      ) : (
        <Link to={path} className={`image-button-link ${checkShape}`}>
          <div
            className={`image-button ${checkShape}`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundColor: `${color}`,
            }}
          >
            <p className="image-button-text">{children}</p>
          </div>
        </Link>
      )}
    </>
  );
};
