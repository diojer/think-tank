import React from "react";
import "./ShowProfile.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../../../utility/axios-client";

function ShowProfile() {
  const { id } = useParams();
  const [selectedProfile, setSelectedProfile] = useState(null);
  useEffect(() => {
    getProfile(id);
  }, []);

  const getProfile = (key) => {
    axiosClient.get(`/profiles/${key}`).then(({ data }) => {
      setSelectedProfile(data.data);
    });
  };

  return (
    <>
      {selectedProfile ? (
        <>  
          <div className="show-profile-wrapper">
            <div className="show-profile-primary">
              <div className="show-profile-image"
                style={{
                  backgroundImage: `url(/images/team/rubyB.jpg)`,
                }}
              ></div>
              <div className="show-profile-text">
                <p className="show-profile-name">{data.name}</p>
                <p className="show-profile-role">{data.role}</p>
                <hr className="show-profile-text-break" />
                <p className="show-profile-course">{data.course}</p>
                <p className="show-profile-year_of_study">{data.course}</p>
                <p className="show-profile-linkedin-logo">
                  <a href={``} target="_blank">
                    <FontAwesomeIcon icon="fab fa-linkedin" />
                  </a>
                </p>
              </div>
            </div>
            <div className="show-profile-secondary">
                <p className="show-profile-aboutme">{data.bio}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </>
  );
}

export default ShowProfile;
