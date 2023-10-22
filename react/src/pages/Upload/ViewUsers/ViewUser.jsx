import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../../utility/axios-client";
import { Button } from "../../../components/Button";
import "./ViewUser.css";
import "../View.css";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setUsers(data.data);
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

  function userDelete(user) {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    } else {
      axiosClient.delete(`/users/${user.id}`).then((response) => {
        alert("User Deleted!");
        getUsers();
      });
    }
  }

  function userAdmin(user, admin) {
    if (
      admin
        ? !window.confirm(`Are you sure you want to make this user an admin?`)
        : !window.confirm(
            `Are you sure you want to revoke this user's admin privileges?`
          )
    ) {
      return;
    } else {
      axiosClient
        .put(`/users/${user.id}`, { role: "admin" })
        .then((response) => {
          alert(`Privileges ${admin ? `granted` : `revoked`}!`);
          getUsers();
        });
    }
  }

  return (
    <>
      <div className="user-view-wrapper upload-subwrapper">
        <p className="user-view-heading upload-subheader">View/Edit Users</p>
        <table className="default-table">
          <tr className="default-table-headings">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created on</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
          {loading && (
            <tr className="default-row-loading">
              <p>Loading...</p>
            </tr>
          )}
          {users.map((u, key) => {
            return (
              <>
                <tr className={`default-table-rows ${u.id}`} key={key}>
                  <td className="default-row-id">{u.id}</td>
                  <td className="default-row-name">
                    <Link to={`/profiles/${u.id}`}>{u.name}</Link>
                  </td>
                  <td className="default-row-email">{u.email}</td>
                  <td className="default-row-date">{u.created_at}</td>
                  <td className={`user-row-admin ${u.admin.toString()}`}>
                    {u.admin.toString().toUpperCase()}
                  </td>
                  <td className="user-row-buttons default-row-buttons">
                    <div className="default-buttons-container">
                      {u.admin ? (
                        <Button
                          onClick={(e) => {
                            userAdmin(u, false);
                          }}
                          buttonStyle="btn--red"
                        >
                          Revoke Admin
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            userAdmin(u, true);
                          }}
                        >
                          Make Admin
                        </Button>
                      )}

                      <Button
                        buttonStyle="btn--red"
                        onClick={(e) => {
                          userDelete(u);
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

export default ViewUser;
