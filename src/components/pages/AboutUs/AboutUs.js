import React from "react";
import { TitleBox } from "../../TitleBox";
import "./AboutUs.css";

const aboutus = {
  aims: `We are a UK-based student-led Think Tank affiliated with Leeds University Union
  (a registered UK charity), dedicated to undertaking empirically-driven and nonpartisan policy research that centres on challenges disproportionately impacting
  the North of England.`,
};

function Aboutus() {
  return (
    <>
      <TitleBox
        image="/images/img-30.jpg"
        color="#2e2d2b"
        font="white"
        type="center"
      >
        About Us
        <span className="orange">.</span>
      </TitleBox>
      <div className="aboutus-text-wrapper">
        <div className="aboutus-aims">
          <p className="aboutus-title">
            Our Aims<span className="primary">:</span>
          </p>
          <p className="aboutus-text">{aboutus.aims}</p>
        </div>
        <div className="aboutus-background">
          <p className="aboutus-title">
            Our Background<span className="primary">:</span>
          </p>
          <p
            className="aboutus-text"
            style={{
              marginBottom: 0,
            }}
          >
            Our 8 Policy areas are:
          </p>
          <div className="aboutus-list-wrapper">
            <ul className="aboutus-text first-row">
              <li>Macro Policy</li>
              <li>Energy and Environment</li>
              <li>Urban Planning and Transport</li>
              <li>Public Health</li>
            </ul>
            <ul className="aboutus-text second-row">
              <li>Education</li>
              <li>Social Policy</li>
              <li>Market Interventions</li>
              <li>Financial Regulations</li>
            </ul>
          </div>
          <div className="aboutus-background-text">
            <p className="aboutus-text">
              Established in April 2023, the Leeds Think Tank (LTT) endeavours
              to facilitate the engagement of young individuals in ongoing
              policy dialogues, thereby amplifying the voices of the
              underrepresented Northern communities. Through initiatives
              encompassing funding for informative speaker engagements,
              publication of student-authored articles in influential
              newspapers, and collaborative delivery of skill-enhancing
              workshops in conjunction with the university, LTT seeks to empower
              its student members and contribute to the betterment society.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
