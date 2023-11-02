import React from "react";
import "./Team.css";

//component imports
import { Profile } from "../../components/Profile";
import { TitleBox } from "../../components/TitleBox";

const team = {
  // aboutme: [
  //     "I'm Nicolas, a second year PPE student from Brazil. I'm particularly interested in the link between education and social policy. I also have a small collection of model planes.",
  //     "",
  //     "",
  //     "",
  //     "I am an Economics student at the University of Leeds and Head of Research at the Leeds Think Tank society where I deploy the skills I learned during my IEA internship. In my spare time, I also run an economics education company, The Backseat Economist, and write on monetary & fiscal policy, international trade, labour market and environmental issues for different publications. ",
  //     "I'm Archie, a second year Economics and Politics student. With a left-wing political background, my primary interest is wealth inequality. ",
  //     "",
  // ],
  aboutme: ["", "", "", "", "", "", ""], //we'll add bios back when we all have one
};

function Team() {
  return (
    <>
      <TitleBox
        image="/images/titleboxes/team.jpg"
        color="#2e2d2b"
        font="white"
        type="center"
      >
        LTT Committee 2023/24<span className="hilite">:</span>
      </TitleBox>
      <div className="profiles-wrapper">
        <div className="profiles-row profiles-row-1">
          <Profile
            image="/images/team/img-27.jpeg"
            name="Nicolas Padula"
            position="President"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/nicolas-padula-pinho-luu-ltt-lcc/"
          >
            {team.aboutme[0]}
          </Profile>
          <Profile
            image="/images/team/rubyB.jpg"
            name="Ruby Bell"
            position="Vice-President"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/ruby-bell-580540252/"
          >
            {team.aboutme[1]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-2">
          <Profile
            image="/images/team/DiogoFerreira.jpeg"
            name="Diogo Ferreira"
            position="Secretary"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/diogo-ferreira-025458210/"
          >
            {team.aboutme[2]}
          </Profile>
          <Profile
            image="/images/team/img-26.jpeg"
            name="Natasha Dawson"
            position="Treasurer"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/natasha-dawson-441560237/"
          >
            {team.aboutme[3]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-3">
          <Profile
            image="/images/team/hubertK.jpg"
            name="Hubert Kucharski"
            position="Head of Research"
            degree="Bsc Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/hubertkucharski/"
          >
            {team.aboutme[4]}
          </Profile>
          <Profile
            image="/images/team/img-23.jpeg"
            name="Archie Ryan"
            position="Social Media Secretary"
            degree="BA Economics and Politics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/archie-ryan-b81897282/"
          >
            {team.aboutme[5]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-4">
          <Profile
            image="/images/team/josephC.jpg"
            name="Joseph Clark"
            position="Head of Public Affairs"
            degree="Bsc Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/josephsamuelclark/"
          >
            {team.aboutme[6]}
          </Profile>
        </div>
      </div>
    </>
  );
}

export default Team;
