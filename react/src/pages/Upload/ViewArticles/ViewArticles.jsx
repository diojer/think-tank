import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../../utility/axios-client";
import { Button } from "../../../components/Button";
import "./ViewArticles.css";
import "../View.css";
import { Link } from "react-router-dom";
import { NewTabLink } from "../../../components/NewTabLink";

function ViewArticles() {
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

  function sortByKey(array, key) {
    return array.sort((a, b) => {
      var x = a[key];
      var y = b[key];
      //if x<y, return -1
      //if x>y, return 1
      //if x=y, return 0
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  function articleDelete(article) {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    } else {
      axiosClient.delete(`/articles/${article.id}`).then((response) => {
        alert("Article Deleted!");
        getArticles();
      });
    }
  }

  return (
    <>
      <div className="article-view-wrapper upload-subwrapper">
        <p className="article-view-heading upload-subheader">
          View/Edit Articles
        </p>
        <table className="default-table">
          <tr className="default-table-headings">
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Banner Image</th>
            <th>Card Image</th>
            <th>Created on</th>
            <th>Actions</th>
          </tr>
          {loading && (
            <tr className="default-row-loading">
              <p>Loading...</p>
            </tr>
          )}
          {articles.map((a, key) => {
            return (
              <>
                <tr className={`default-table-rows ${a.id}`} key={key}>
                  <td className="default-row-id">{a.id}</td>
                  <td className="default-row-title">
                    <Link to={`/articles/${a.id}`}>{a.title}</Link>
                  </td>
                  <td className="default-row-author">{a.author}</td>
                  <td className="default-row-subject">{a.subject}</td>
                  <td className="article-row-bImg">
                    <a
                      href={`${import.meta.env.VITE_API_PUBLIC_URL}${
                        a.bannerImage
                      }`}
                      target="_blank"
                    >
                      Link
                    </a>
                  </td>
                  <td className="article-row-cImg">
                    <a
                      href={`${import.meta.env.VITE_API_PUBLIC_URL}${
                        a.cardImage
                      }`}
                      target="_blank"
                    >
                      Link
                    </a>
                  </td>
                  <td className="default-row-date">{a.created_at}</td>
                  <td>
                    <div className="default-buttons-container">
                      <Button path={`/portal/edit/article/${a.id}`}>
                        Edit
                      </Button>
                      <Button
                        buttonStyle="btn--red"
                        onClick={(e) => {
                          articleDelete(a);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default ViewArticles;
