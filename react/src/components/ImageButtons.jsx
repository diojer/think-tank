import React from "react";
import { ImageButton } from "./ImageButton";
import "./ImageButton.css";

export const ImageButtons = ({
  text,
  images,
  shape,
  color,
  paths,
  newTabs,
}) => {
  return (
    <div className="image-button-wrapper">
      {images.map((value, key) => {
        return (
          <ImageButton
            image={value}
            color={color}
            shape={shape}
            path={paths[key]}
            key={key}
            newTab={newTabs[key]}
          >
            {text[key]}
          </ImageButton>
        );
      })}
    </div>
  );
};
