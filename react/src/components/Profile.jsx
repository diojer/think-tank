import React from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Profile = ({
  children,
  image,
  name,
  position,
  degree,
  year_of_study,
  linkedin,
}) => {
  return (
    <div className="profile-wrapper">
      <div className="profile-primary">
        <div
          className="profile-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="profile-text">
          <p className="profile-name">{name}</p>
          <p className="profile-position">{position}</p>
          <hr className="profile-text-break" />
          <p className="profile-degree">{degree}</p>
          <p className="profile-year_of_study">{year_of_study}</p>
          <p className="profile-linkedin-logo">
            <a href={`${linkedin}`} target="_blank">
              <FontAwesomeIcon icon="fab fa-linkedin" />
            </a>
          </p>
        </div>
      </div>
      <div className="profile-secondary">
        <p className="profile-aboutme">{children}</p>
      </div>
    </div>
  );
};
