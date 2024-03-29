import React from "react";
import "./ImageCarousel.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./splide-default.min.css";
import { Button } from "./Button";
import LazyBackgroundImage from "../utility/LazyBackgroundImage";

export const ImageCarousel = ({ articles, options }) => {
  return (
    <div className="image-carousel-wrapper">
      <Splide options={options}>
        {articles.map((value, key) => {
          return (
            <SplideSlide key={key}>
              {/* <img
                src={`${import.meta.env.VITE_API_PUBLIC_URL}${
                  value.bannerImage
                }`}
                data-splide-lazy={`${import.meta.env.VITE_API_PUBLIC_URL}${
                  value.bannerImage
                }`}
                alt=""
              /> */}
              <LazyBackgroundImage
                img={`${import.meta.env.VITE_API_PUBLIC_URL}${value.bannerImage
                  }`}
                style={{
                  height: "450px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
                className="carousel-background-image"
              >
                <div className="carousel-aligner">
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
                </div>
              </LazyBackgroundImage>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
