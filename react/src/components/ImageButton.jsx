import React from "react";
import "./ImageButton.css";
import { Link } from "react-router-dom";
import LazyBackgroundImage from "../utility/LazyBackgroundImage";

const SHAPES = ["imgb--rect", "imgb--square", "imgb--thin"]; //Array of possible shapes

export const ImageButton = ({
  children,
  image,
  shape,
  color,
  path,
  newTab,
}) => {
  const checkShape = SHAPES.includes(shape) ? shape : SHAPES[0]; //Defaults to first shape if I mistype/don't specify
  return (
    <>
      {newTab ? ( //Rendering a new tab uses <a>
        <a
          href={path}
          target="_blank"
          className={`image-button-link ${checkShape}`}
        >
          <LazyBackgroundImage
            img={`${image}`}
            className={`image-button ${checkShape}`}
            style={{
              backgroundColor: `${color}`,
            }}
          >
            <p className="image-button-text">{children}</p>
          </LazyBackgroundImage>
        </a>
      ) : (
        //If it's not opening a new page, I use <Link>.
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
