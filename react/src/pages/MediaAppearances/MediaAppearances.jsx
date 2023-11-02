import React from "react";
import "./MediaAppearances.css";
import { TitleBox } from "../../components/TitleBox";

function MediaAppearances() {
  return (
    <>
      <TitleBox
        image="/images/titleboxes/media-appearances.jpg"
        type="bottom"
        color="#2e2d2b"
        font="white"
      >
        Media Appearances<span className="hilite">.</span>
      </TitleBox>
      <div className="mediaAp-wrapper WIP-wrapper">
        <div className="WIP-message">
          <p className="WIP-message-title">
            We have no media appearances at the moment.
          </p>
          <p className="WIP-message-text">
            Please check again later! If you are interested in publishing one of
            our articles, please see our contact details at the bottom of the
            page.
          </p>
        </div>
      </div>
    </>
  );
}

export default MediaAppearances;
