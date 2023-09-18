import React from "react";
import "./Home.css";
import { ImageCarousel } from "../../ImageCarousel";
import { Button } from "../../Button";
import { ImageButtons } from "../../ImageButtons";
import { ArticleCard } from "../../ArticleCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { EmailForm } from "./components/EmailForm";

function HomeSection() {
  const [listOfArticles, setListOfArticles] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/articles").then((response) => {
      setListOfArticles(response.data.reverse());
    });
  }, []);
  const carouselOptions = {
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
      <ImageCarousel
        articles={listOfArticles.slice(0, 3)}
        options={carouselOptions}
      />
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
          images={["/images/img-6.jpg", "/images/img-22.jpeg"]}
          shape="imgb--rect"
          color="#4d5c4e"
          paths={["/reports", "/articles"]}
        />
      </div>
      <div className="image-buttons-second-row">
        <ImageButtons
          text={["Latest News", "Join Us", "Contact Us"]}
          images={[
            "/images/img-6.jpg",
            "/images/img-21.jpeg",
            "/images/img-5.jpg",
          ]}
          shape="imgb--thin"
          color="#706731"
          paths={["/events", "/aboutus", "/aboutus"]}
        />
      </div>
      <div
        className="fixed-scroll-image"
        style={{
          backgroundImage: "url(/images/mailbox-field.jpg)",
          backgroundColor: `rgb(121, 103, 52)`,
        }}
      >
        <div className="email-signup">
          <p className="email-input-label">
            Join our popular weekly newsletter, read by millions:
          </p>
          <EmailForm />
        </div>
      </div>
      <div className="article-cards-wrapper">
        {listOfArticles.slice(0, 3).map((value, key) => {
          return (
            <ArticleCard
              key={key}
              subject={value.subject}
              thumbnail={value.cardImage}
              title={value.title}
              type="Article"
              author={value.authors}
            />
          );
        })}
      </div>
      <div
        className="fixed-scroll-image"
        style={{
          backgroundImage: "url(/images/leeds-bridge.jpg)",
          backgroundColor: "rgb(121, 103, 52)",
        }}
      >
        <div className="quote-wrapper">
          <p className="quote">
            "The Leeds Student Think Tank is really... really cool."
          </p>
          <p className="quotee">-Mr. Cheese, Da Press</p>
        </div>
      </div>
    </>
  );
}

export default HomeSection;
