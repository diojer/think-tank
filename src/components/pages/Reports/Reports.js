import React from "react";
import { TitleBox } from "../../TitleBox";
import "./Reports.css";

function Reports() {
  return (
    <>
      <TitleBox image="/images/img-29.jpg" color="#2e2d2b" font="white">
        Reports<span className="orange">:</span>
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
