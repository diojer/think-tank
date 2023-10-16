import React from "react";
import "./ImageCarousel.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./splide-default.min.css";
import { Button } from "./Button";

export const ImageCarousel = ({ articles, options }) => {
  return (
    <div className="image-carousel-wrapper">
      <Splide options={options}>
        {articles.map((value, key) => {
          return (
            <SplideSlide key={key}>
              <img
                src={`${import.meta.env.VITE_API_PUBLIC_URL}${
                  value.bannerImage
                }`}
                alt=""
              />
              <div className="text-wrapper">
                <p className="carousel-article-title">{value.title}</p>
                <p className="carousel-article-author">{`By ${value.author}`}</p>
                <div className="button-wrapper">
                  <Button
                    path={`articles/${value.id}`}
                    buttonSize="btn--medium"
                    buttonStyle="btn--primary"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
