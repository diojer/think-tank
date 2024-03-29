import React, { useState, useEffect, useRef } from "react";
import "./Articles.css";
import { Outlet, useParams } from "react-router-dom";
import axiosClient from "../../utility/axios-client";
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
                    <TitleBox
                        image="/images/titleboxes/articles.jpg"
                        color="#2e2d2b"
                        font="white"
                    >
                        Articles<span className="hilite">.</span>
                    </TitleBox>
                    <div className="articles-aligner">
                        <div className="articles-column">
                            <div className="articles-wrapper">
                                {articles[0] ? (
                                    articles.map((value, key) => (
                                        <ArticleCard
                                            key={key}
                                            subject={value.subject}
                                            thumbnail={`${import.meta.env.VITE_API_PUBLIC_URL
                                                }${value.cardImage}`}
                                            title={value.title}
                                            type="Article"
                                            author={value.author}
                                            path={`${value.id}`}
                                        />
                                    ))
                                ) : (
                                    <div className="articles-WIP-message">
                                        <div className="lds-ellipsis">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Articles;
