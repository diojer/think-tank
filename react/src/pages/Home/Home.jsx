import React from "react";
import "./Home.css";
import { ImageCarousel } from "../../components/ImageCarousel";
import { Button } from "../../components/Button";
import { ImageButtons } from "../../components/ImageButtons";
import { ArticleCard } from "../../components/ArticleCard";
import { useEffect, useState } from "react";
import axiosClient from "../../utility/axios-client";
import { EmailForm } from "./components/EmailForm";
import { Helmet } from "react-helmet";
import { TitleBox } from "../../components/TitleBox";
import LazyBackgroundImage from "../../utility/LazyBackgroundImage";

function HomeSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const numOfArticles = 6;
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
    rewind: true,
    pause: false,
    interval: 4000,
    type: "fade",
    pauseOnHover: false,
    pauseOnFocus: true,
    slideFocus: true,
    rewindByDrag: true,
    // cover: true,
    height: "450px",
    resetProgress: true,
    dragMinThreshold: 10,
    lazyLoad: "nearby",
  };
  return (
    <>
      <Helmet>
        <title>Leeds Think Tank</title>
      </Helmet>
      {articles[1] ? ( //If the Splide carousel renders before the API has responded, autoplay doesn't work
        <ImageCarousel
          articles={articles.slice(0, numOfArticles)}
          options={carouselOptions}
        />
      ) : (
        <TitleBox image="images/articles/greenbox.png" height="425px">
          <div className="center">
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </TitleBox>
      )}
      <div className="home-column-wrapper">
        <div className="home-column">
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
              images={[`/images/img-6.jpg`, `/images/img-22.jpeg`]}
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
                `/images/img-6.jpg`,
                `/images/img-21.jpeg`,
                `/images/img-5.jpg`,
              ]}
              shape="imgb--thin"
              color="#706731"
              paths={[
                "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/events",
                "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/memberships",
                "mailto:thinktank@luu.group",
              ]}
              newTabs={[true, true, true]}
            />
          </div>
        </div>
      </div>
      <LazyBackgroundImage
        img="/images/mailbox-field.jpg"
        className="fixed-scroll-image"
      >
        <div className="email-signup">
          <p className="email-input-label">Join our mailing list:</p>
          <EmailForm />
        </div>
      </LazyBackgroundImage>
      <div className="home-column-wrapper">
        <div className="home-column">
          {articles[1] && (
            <div className="article-cards-wrapper">
              {articles.slice(0, numOfArticles).map((value, key) => {
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
                    path={`articles/${value.id}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeSection;
