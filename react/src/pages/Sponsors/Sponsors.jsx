import React from "react";

import { TitleBox } from "../../components/TitleBox";
import { SponsorCard } from "../../components/SponsorCard";
import "./Sponsors.css";

function Sponsors() {
  return (
    <div>
      <TitleBox
        image="/images/titleboxes/sponsors.jpg"
        color="#2e2d2b"
        font="white"
        type="bottom"
      >
        Sponsors & Partners<span className="hilite">.</span>
      </TitleBox>
      <div className="sponsors-aligner">
        <p className="sponsors-disclaimer">
          All funds are unrestricted, non-controlling contributions.
        </p>
        <div className="sponsors-column">
          <div className="sponsors-wrapper">
            <SponsorCard
              subject="Sponsor"
              thumbnail="/images/sponsors/iea.png"
              title="Institute of Economic Affairs"
              author="The IEA is an educational charity and the UK's original free market think tank, founded in 1955. Their mission is to analyse and expound the role of markets in solving economic problems."
              path="https://www.iea.org.uk"
              linkProps={{ target: "_blank" }}
            />
            <SponsorCard
              subject="Partner"
              thumbnail="/images/sponsors/macrobond.svg"
              title="Macrobond"
              author="Macrobond is the world's largest macroeconomic and financial analytic database, serving some of the biggest banks, asset managers, government institutions and research houses."
              path="https://www.macrobond.com/"
              linkProps={{ target: "_blank" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
