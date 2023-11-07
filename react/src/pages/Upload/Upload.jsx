import React from "react";
import { Button } from "../../components/Button";
import "./Upload.css";
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//Routes
import UploadArticle from "./UploadArticle/UploadArticle";

function Upload() {
  return (
    <>
      <div className="upload-wrapper">
        <p className="upload-buttons-header upload-header">Add a new...</p>
        <div className="upload-buttons">
          <Button path="article">Article</Button>
          <Button>Report</Button>
          <Button>Press Report</Button>
          <Button>Media Appearance</Button>
          <Button>Job/Position</Button>
          <Button path="author">Team Member</Button>
          <Button>Sponsor</Button>
        </div>
        <p className="view-buttons-header upload-header">View/edit...</p>
        <div className="view-buttons">
          <Button path="articles">Articles</Button>
          <Button>Mailing List</Button>
          <Button>Sponsors</Button>
          <Button path="users">Registered Users</Button>
          <Button path="authors">Authors</Button>
        </div>
      </div>
      <hr></hr>
      <Outlet />
    </>
  );
}

export default Upload;
