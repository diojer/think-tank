import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../../utility/axios-client";
import { Button } from "../../../components/Button";
import "./ViewArticles.css";
import { Link } from "react-router-dom";

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

  return (
    <>
      <div className="article-view-wrapper upload-subwrapper">
        <p className="article-view-heading upload-subheader">
          View/Edit Articles
        </p>
        <table className="article-table">
          <tr className="article-table-headings">
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Created on</th>
            <th>Actions</th>
          </tr>
          {loading && (
            <tr className="article-row-loading">
              <p>Loading...</p>
            </tr>
          )}
          {articles.map((a, key) => {
            return (
              <>
                <tr className={`article-table-rows ${a.id}`}>
                  <td className="article-row-id">{a.id}</td>
                  <td className="article-row-title">
                    <Link to={`/articles/${a.id}`}>{a.title}</Link>
                  </td>
                  <td className="article-row-author">{a.author}</td>
                  <td className="article-row-subject">{a.subject}</td>
                  <td className="article-row-date">{a.created_at}</td>
                  <td>
                    <div className="article-row-buttons">
                      <Button
                        onClick={() => {
                          alert("hi");
                        }}
                      >
                        Edit
                      </Button>
                      <Button buttonStyle="btn--red">Delete</Button>
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
