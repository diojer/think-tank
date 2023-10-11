import React from "react";
export const NewTabLink = ({ children, link }) => {
  return (
    <a href={link} target="_blank">
      {children}
    </a>
  );
};
