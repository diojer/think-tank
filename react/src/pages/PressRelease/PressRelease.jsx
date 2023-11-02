import React from "react";
import "./PressRelease.css";
import { TitleBox } from "../../components/TitleBox";

function PressRelease() {
  return (
    <>
      <TitleBox
        image="/images/titleboxes/press-release.jpg"
        type="bottom"
        color="#2e2d2b"
        font="white"
      >
        Press Releases<span className="hilite">.</span>
      </TitleBox>
      <div className="WIP-wrapper">
        <div className="WIP-message">
          <p className="WIP-message-title">
            We have no press release information at the moment.
          </p>
          <p className="WIP-message-text">
            Please check again later! If you are interested in writing about us,
            please see our contact details at the bottom of the page and let us
            know.
          </p>
        </div>
      </div>
    </>
  );
}

export default PressRelease;
