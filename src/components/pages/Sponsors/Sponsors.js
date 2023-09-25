import React from "react";
import "./Sponsors.css";
import { TitleBox } from "../../TitleBox";

function Sponsors() {
  return (
    <div>
      <TitleBox
        image="/images/sponsors.jpg"
        color="#2e2d2b"
        font="white"
        type="bottom"
      >
        Sponsors<span className="orange">.</span>
      </TitleBox>
      <div className="sponsors-wrapper">
        <div className="sponsors-WIP-message">
          <p className="sponsors-WIP-message-title">
            We have no confirmed sponsors at the moment. We hope to be working
            with the IEA soon, and welcome any new potential sponsors.
          </p>
          <p className="sponsors-WIP-message-text">
            Please check again later! If you are interested in sponsoring us,
            please see our contact details at the bottom of the page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
