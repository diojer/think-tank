import React from "react";
import "./Articles.css";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../../utility/axios-client";

//component imports
import { ArticleCard } from "../../components/ArticleCard";
import { TitleBox } from "../../components/TitleBox";

function Articles() {
  const { article } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    setLoading(true);
    axiosClient
      .get("articles")
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
      {article ? (
        <Outlet />
      ) : (
        <>
          <TitleBox image="/images/img-28.jpg" color="#2e2d2b" font="white">
            Articles<span className="orange">.</span>
          </TitleBox>
          <div className="articles-wrapper">
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
                <p className="articles-WIP-message-title">Loading...</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Articles;
