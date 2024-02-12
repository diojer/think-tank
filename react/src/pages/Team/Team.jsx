import React from "react";
import "./Team.css";

//component imports
import { Profile } from "../../components/Profile";
import { TitleBox } from "../../components/TitleBox";

const team = {
    aboutme: [
      "I'm Nicolas, a second year PPE student from Brazil. I'm particularly interested in the link between education and social policy. I also have a small collection of model planes.",
      "My name is Ruby Bell and I’m a second year PPE student here at the University of Leeds. Through my various roles within the Think Tank, I engage in my area of interest: macro-economic policy research. I am also interested in the interconnectivity between economic and social policies.",
      "I'm Diogo Ferreira, a 2nd Year PPE student. I was born in Portugal, but I grew up in South East London. I really enjoy writing and editing articles for our think tank. In my spare time I like programming simple games and websites - like this one!",
      "Hi, I’m Natasha a 2nd year PPE student. I am honoured to be treasurer this year. I have a particular interest in environmental policy- you can read my article on ULEZ for more!",
      "I am an Economics student at the University of Leeds and Head of Research at the Leeds Think Tank society where I deploy the skills I learned during my IEA internship. In my spare time, I also run an economics education company, The Backseat Economist, and write on monetary & fiscal policy, international trade, labour market and environmental issues for different publications. ",
      "I'm Archie, a second year Economics and Politics student. With a left-wing political background, my primary interest is wealth inequality. ",
      "I'm Rhoda, and I am a second year English literature student from South-east London. I have a passion for language and love helping writers to find the most effective and unique ways to get their message across.",
      "My name is Joseph Clark, I’m currently in my second year of a BSc in Economics, and enjoying it greatly. I have an interest in novel policy proposals and how markets can be influenced indirectly. I also have two (very cute) dogs back home 👍.",
    ],
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
            position={["Secretary", "Head of Technology"]}
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
            image="/images/team/rhoda.jpeg"
            name="Rhoda Wilson"
            position="Head of Editing"
            degree="BA English Literature"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/rhoda-wilson-708a712a2/"
          >
            {team.aboutme[6]}
          </Profile>
          <Profile
            image="/images/team/josephC.jpg"
            name="Joseph Clark"
            position="Head of Public Affairs"
            degree="Bsc Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/josephsamuelclark/"
          >
            {team.aboutme[7]}
          </Profile>
        </div>
      </div>
    </>
  );
}

export default Team;
