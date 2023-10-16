import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../../utility/axios-client";

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
        console.log(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <table>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
        </tr>
        {articles.map((a, key) => {
          return (
            <>
              <tr>
                {Object.keys(a).map((value, key) => {
                  return (
                    <>
                      <td>{value.id}</td>
                    </>
                  );
                })}
              </tr>
            </>
          );
        })}
      </table>
    </>
  );
}

export default ViewArticles;
