import "./ShowProfile.css";
import { ArticleCard } from "../../components/ArticleCard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../../utility/axios-client";

function ShowProfile() {
  const { profile } = useParams();
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    getProfile(profile);
    getArticles(selectedProfile.profileId);
  }, []);

  const getProfile = (key) => {
    axiosClient.get(`/profile/${key}`).then(({ data }) => {
      setSelectedProfile(data.data);
    });
  };

  const getArticles = (key) => {
    setLoading(true);
    axiosClient
      .get(`articles/author/${key}`)
      .then(({ data }) => {
        setArticles(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
                  backgroundImage: `url(/images/team/josephC.jpg)`,
                }}
              ></div>
              <div className="show-profile-text">
                <p className="show-profile-name">{selectedProfile.name}</p>
                <p className="show-profile-role">{selectedProfile.role}</p>
                <p className="show-profile-policy">{selectedProfile.policyArea}</p>
                <hr className="show-profile-text-break" />
                <p className="show-profile-course">{selectedProfile.course}</p>
                <p className="show-profile-year_of_study">{selectedProfile.year + " Year"}</p>
                <p className="show-profile-linkedin-logo">
                  <a href={selectedProfile.linkedIn} target="_blank">
                    <FontAwesomeIcon icon="fab fa-linkedin" />
                  </a>
                </p>
              </div>
            </div>
            <div className="show-profile-secondary">
              <p className="show-profile-aboutme">{selectedProfile.bio}</p>
            </div>
            <div className="show-profile-articles">
              {articles[1] ? ( //starts rendering articles when the API responds
                articles.map((value, key) => {
                  return (
                    <ArticleCard
                      key={key}
                      subject={value.subject}
                      thumbnail={`${import.meta.env.VITE_API_PUBLIC_URL}${
                        value.cardImage
                      }`}
                      title={value.title}
                      type="Article"
                      author={value.author}
                      path={`${value.id}`}
                    />
                  );
                })
              ) : (
                <div className="articles-WIP-message">
                  <p className="articles-WIP-message-title">This author hasn't written any articles yet</p>
                </div>
              )}
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
