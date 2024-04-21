import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../../utility/axios-client";
import "./MediaAppearances.css";
import { TitleBox } from "../../components/TitleBox";
import { Outlet, useParams } from "react-router-dom";

function MediaAppearances() {
  const { mediaApp } = useParams();
  const [mediaApps, setMediaApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMediaApps();
  }, []);

  const getMediaApps = () => {
    setLoading(true);
    axiosClient
      .get("media/appearances")
      .then(({ data }) => {
        setMediaApps(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {mediaApp ? (
        <Outlet />
      ) : (
        <>
          <TitleBox
            image="/images/titleboxes/media-appearances.jpg"
            type="bottom"
            color="#2e2d2b"
            font="white"
          >
            Media Appearances<span className="hilite">.</span>
          </TitleBox>
          {mediaApps[0] ? (
            <>
              {mediaApps.map((m, key) => {
                <ArticleCard
                  key={key}
                  subject={m.subject}
                  thumbnail={`${import.meta.env.VITE_API_PUBLIC_URL}${
                    m.cardImage
                  }`}
                  title={m.title}
                  type="Article"
                  author={m.author}
                  path={`${m.id}`}
                />;
              })}
            </>
          ) : (
            <div className="mediaAp-wrapper WIP-wrapper">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MediaAppearances;
