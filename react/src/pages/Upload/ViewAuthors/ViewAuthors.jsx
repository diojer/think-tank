import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../../utility/axios-client";
import { Button } from "../../../components/Button";
import "./ViewAuthors.css";
import "../View.css";
import { Link } from "react-router-dom";

function ViewAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = () => {
    setLoading(true);
    axiosClient
      .get("/authors")
      .then(({ data }) => {
        setAuthors(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  function authorDelete(author) {
    if (!window.confirm("Are you sure you want to delete this author?")) {
      return;
    } else {
      axiosClient
        .delete(`/authors/${author.id}`)
        .then((response) => {
          alert("Author Deleted!")
          getAuthors();
        });
      axiosClient
        .delete(`/profiles/${author.profileId}`)
        .then((response) => {
          alert("Profile Deleted!")
        });
    }
  }

  return (
    <>
      <div className="author-view-wrapper upload-subwrapper">
        <p className="author-view-heading upload-subheader">View/Edit Authors</p>
        <table className="default-table">
          <thead>
          <tr className="default-table-headings">
            <th>ID</th>
            <th>ProfileID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Created on</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {loading && (
            <tr className="default-row-loading">
              <td>Loading...</td>
            </tr>
          )}
          {authors.map((u, key) => {
            return (
              <>
                <tr className={`default-table-rows ${u.id}`} key={u.id}>
                  <td className="default-row-id">{u.id}</td>
                  <td className="default-row-profile-id">{u.profileId}</td>
                  <td className="default-row-name"><Link to={`/authors/${u.id}`}>{u.name}</Link></td>
                  <td className="default-row-role">{u.role}</td>
                  <td className="default-row-date">{u.created_at}</td>
                  <td className="user-row-buttons default-row-buttons">
                    <div className="default-buttons-container">
                      <Button
                        buttonStyle="btn--red"
                        onClick={(e) => {
                          authorDelete(u);
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
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewAuthors;
