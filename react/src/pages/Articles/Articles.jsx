import React from "react";
import "./Articles.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";

//component imports
import { ArticleCard } from "../../components/ArticleCard";
import { TitleBox } from "../../components/TitleBox";

function Articles() {
    const { id } = useParams();
    const [listOfArticles, setListOfArticles] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState("");
    //   useEffect(() => {
    //     if (!id) {
    //       axios.get(`${VPS}/articles`).then((response) => {
    //         setListOfArticles(response.data.reverse());
    //       });
    //     } else {
    //       axios.get(`${VPS}/articles`, { params: { id: id } }).then((response) => {
    //         setSelectedArticle(response.data);
    //       });
    //     }
    //   }, [id]);
    const selectArticlePage = (
        <>
            <TitleBox image="/images/img-28.jpg" color="#2e2d2b" font="white">
                Articles<span className="orange">.</span>
            </TitleBox>
            <div className="articles-wrapper">
                {listOfArticles[1] ? ( //starts rendering articles when the API responds
                    listOfArticles.map((value, key) => {
                        return (
                            <ArticleCard
                                key={key}
                                subject={value.subject}
                                thumbnail={value.cardImage}
                                title={value.title}
                                type="Article"
                                author={value.author}
                                path={`${value.id}`}
                            />
                        );
                    })
                ) : (
                    <div className="articles-WIP-message">
                        <p className="articles-WIP-message-title">
                            Sorry, no articles have been published yet.
                        </p>
                        <p className="articles-WIP-message-text">
                            Please check again later!
                        </p>
                    </div>
                )}
            </div>
        </>
    );
    const selectedArticlePage = (
        <>
            <TitleBox
                image={`${selectedArticle.bannerImage}`}
                color="#2e2d2b"
                font="white"
                type="bottom"
            >
                {selectedArticle.title}
            </TitleBox>
            <div className="selected-article-wrapper">
                <p className="selected-article-author">
                    {selectedArticle.author}
                </p>
                <div className="selected-article-content">
                    {selectedArticle && parse(selectedArticle.content)}
                </div>
            </div>
        </>
    );
    return <>{id ? selectedArticlePage : selectArticlePage}</>;
}

export default Articles;
