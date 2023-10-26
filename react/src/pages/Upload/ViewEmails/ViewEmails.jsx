import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../../utility/axios-client";
import { Button } from "../../../components/Button";
import "./ViewEmails.css";
import "../View.css";
import { Link } from "react-router-dom";

function ViewEmails() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEmails();
  }, []);

  const getEmails = () => {
    setLoading(true);
    axiosClient
      .get("/mailinglist")
      .then(({ data }) => {
        setEmails(data);
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

  function emailDelete(email) {
    if (
      !window.confirm(
        "Are you sure you want to remove this email from the list?"
      )
    ) {
      return;
    } else {
      axiosClient.delete(`/mailinglist/${email.id}`).then((response) => {
        alert("Email Removed!");
        getEmails();
      });
    }
  }

  function copyEmail(email) {
    navigator.clipboard.writeText(email);
  }
  function copyAllEmails() {
    let mailinglist = "";
    let delimiter = "\n";
    for (let i = 0; i < emails.length - 1; i++) {
      mailinglist = mailinglist + emails[i].email + delimiter;
    }
    mailinglist = mailinglist + emails[emails.length - 1].email;
    navigator.clipboard.writeText(mailinglist);
    // let mailinglist = [];
    // emails.map((email, key) =>{

    // })
  }

  return (
    <>
      <div className="email-view-wrapper upload-subwrapper">
        <p className="email-view-heading upload-subheader">
          View/Edit Mailing List
        </p>
        {loading ? (
          ""
        ) : (
          <div className="email-copy-all">
            <Button
              buttonStyle="btn--blue"
              onClick={(e) => {
                copyAllEmails();
              }}
            >
              Copy all emails
            </Button>
          </div>
        )}

        <table className="default-table">
          <tr className="default-table-headings">
            <th>ID</th>
            <th>Email</th>
            <th>Created on</th>
            <th>Actions</th>
          </tr>
          {loading && (
            <tr className="default-row-loading">
              <p>Loading...</p>
            </tr>
          )}
          {emails.map((email, key) => {
            return (
              <>
                <tr className={`default-table-rows ${email.id}`} key={key}>
                  <td className="default-row-id">{email.id}</td>
                  <td className="default-row-email">{email.email}</td>
                  <td className="default-row-date">{email.created_at}</td>
                  <td className="email-row-buttons default-row-buttons">
                    <div className="default-buttons-container">
                      <Button
                        onClick={(e) => {
                          copyEmail(email.email);
                        }}
                        buttonStyle="btn--blue"
                      >
                        Copy
                      </Button>
                      <Button
                        buttonStyle="btn--red"
                        onClick={(e) => {
                          emailDelete(email);
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

export default ViewEmails;
