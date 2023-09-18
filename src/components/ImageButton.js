import React from "react";
import "./ImageButton.css";
import { Link } from "react-router-dom";

const SHAPES = ["imgb--rect", "imgb--square", "imgb--thin"];

export const ImageButton = ({ children, image, shape, color, path }) => {
  const checkShape = SHAPES.includes(shape) ? shape : SHAPES[0];
  return (
    <div
      className={`image-button ${checkShape}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundColor: `${color}`,
      }}
    >
      <Link rel="stylesheet" to={path} className="image-button-link">
        <p className="image-button-text">{children}</p>
      </Link>
    </div>
  );
};
