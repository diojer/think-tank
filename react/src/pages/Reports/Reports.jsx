import React from "react";
import "./Reports.css";

//component imports
import { TitleBox } from "../../components/TitleBox";

function Reports() {
  return (
    <>
      <TitleBox
        image="/images/titleboxes/reports.jpg"
        color="#2e2d2b"
        font="white"
      >
        Reports<span className="hilite">.</span>
      </TitleBox>
      <div className="reports-wrapper">
        <div className="reports-WIP-message">
          <p className="reports-WIP-message-title">
            Sorry, no reports have been published yet.
          </p>
          <p className="reports-WIP-message-text">
            Please check again in April, 2024!
          </p>
        </div>
      </div>
    </>
  );
}

export default Reports;
