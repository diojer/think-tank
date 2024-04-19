import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../../utility/axios-client";
import { Button } from "../../../components/Button";
import "./ViewUser.css";
import "../View.css";
import { Link } from "react-router-dom";

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

  function unlink(user) {
    axiosClient
      .put(`/users/${user.id}`, { profileId: -2 })
      .then((response) => {
        alert(`Account unlinked`);
        getUsers();
      });

    axiosClient.delete(`/profiles/${user.profileId}`);

    // Update author to be null
    axiosClient.put()
  }

  async function link(user) {
    // Get matching author ID
    let authorId = 0;
    let authorResponse;

    await axiosClient
      .get(`/authors`)
      .then((response) => {
        authorResponse = response.data.data;
      });

    let found = false;
    authorResponse.map((author) => {
      if (author["name"] == user.name) {
        found = true;
        authorId = author["id"];
      }
    });

    if (found == false) {
      alert(`No author with name "${user.name}" found`);
      return;
    }

    let profileData = new FormData();
    let payload = JSON.stringify({
      year: null,
      course: null,
      bio: null,
      profilePic: null,
      linkedIn: null,
    });
    profileData.append("payload", payload);
  
    axiosClient
      .post("/profiles", profileData, {
        headers: {"Content-Type": "multipart/form-data"},
      })
      .then(function (response)  {
        axiosClient
          .put(`/users/${user.id}`, { profileId: response.data.data.id })
          .then((response) => {
            alert(`User account linked`);
            getUsers();
          });
        axiosClient
          .put(`/authors/${authorId}`, { profileId: response.data.data.id })
          .then((response) => {
            alert(`Author linked`);
          })
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          alert(response.data.errors);
        }
      })
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

                      {u.profileId ? ((u.profileId >= 0) ? (
                        <>
                          <Button
                            onClick={(e) => {
                              unlink(u);
                            }}
                            buttonStyle="btn--red"
                          >
                            Unlink Account
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={(e) => {
                              link(u);
                            }}
                            buttonStyle="btn--red"
                          >
                            Link Account
                          </Button>
                        </>
                      )) : (<></>)}

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
