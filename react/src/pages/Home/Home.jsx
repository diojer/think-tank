import React from "react";
import "./Home.css";
import { ImageCarousel } from "../../components/ImageCarousel";
import { Button } from "../../components/Button";
import { ImageButtons } from "../../components/ImageButtons";
import { ArticleCard } from "../../components/ArticleCard";
import { useEffect, useState } from "react";
import axiosClient from "../../utility/axios-client";
import { EmailForm } from "./components/EmailForm";

function HomeSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const numOfArticles = 4;
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
  const carouselOptions = {
    //Options, for more information see https://splidejs.com/guides/options/
    speed: 1750,
    autoplay: true,
    pause: false,
    interval: 4000,
    rewind: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    rewindByDrag: true,
    cover: true,
    height: "450px",
    resetProgress: true,
  };
  return (
    <>
      {articles[1] && ( //If the Splide carousel renders before the API has responded, autoplay doesn't work
        <ImageCarousel
          articles={articles.slice(0, numOfArticles)}
          options={carouselOptions}
        />
      )}

      <div className="tagline-wrapper">
        <p className="tagline-primary">
          Research for <span className="underline">Everyone</span>
        </p>
        <p className="tagline-secondary">
          Committed to high quality, open-source analysis.
        </p>
      </div>
      <div className="image-buttons-first-row">
        <ImageButtons
          text={["Reports", "Articles"]}
          images={[
            `${import.meta.env.VITE_API_PUBLIC_URL}/images/img-6.jpg`,
            `${import.meta.env.VITE_API_PUBLIC_URL}/images/img-22.jpeg`,
          ]}
          shape="imgb--rect"
          color="#4d5c4e"
          paths={["/reports", "/articles"]}
          newTabs={[false, false]}
        />
      </div>
      <div className="image-buttons-second-row">
        <ImageButtons
          text={["Latest Events", "Join Us", "Contact Us"]}
          images={[
            `${import.meta.env.VITE_API_PUBLIC_URL}/images/img-6.jpg`,
            `${import.meta.env.VITE_API_PUBLIC_URL}/images/img-21.jpeg`,
            `${import.meta.env.VITE_API_PUBLIC_URL}/images/img-5.jpg`,
          ]}
          shape="imgb--thin"
          color="#706731"
          paths={[
            "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/events",
            "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/memberships",
            "/aboutus",
          ]}
          newTabs={[true, true, false]}
        />
      </div>
      <div
        className="fixed-scroll-image"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_API_PUBLIC_URL
          }/images/mailbox-field.jpg)`,
          backgroundColor: `rgb(121, 103, 52)`,
        }}
      >
        <div className="email-signup">
          <p className="email-input-label">Join our mailing list:</p>
          <EmailForm />
        </div>
      </div>
      <div className="article-cards-wrapper">
        {articles.slice(0, numOfArticles).map((value, key) => {
          return (
            <ArticleCard
              key={key}
              subject={value.subject}
              thumbnail={`http://localhost:8000/storage${value.cardImage}`}
              title={value.title}
              type="Article"
              author={value.author}
              path={`articles/${value.id}`}
            />
          );
        })}
      </div>
    </>
  );
}

export default HomeSection;
