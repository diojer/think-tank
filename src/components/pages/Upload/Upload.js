import React from "react";
import { Button } from "../../Button";
import "./Upload.css";
import { TitleBox } from "../../TitleBox";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//Routes
import UploadArticle from "./UploadArticle/UploadArticle.js";

function Upload() {
  const [selectedPage, setSelectedPage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    switch (id) {
      case "article":
        alert(`Hello, welcome to the article upload page! I spent a lot of time on this, but there are still a lot of bugs (please do not make fun of me). Because of this, here are a few guidelines which I'll set out. Once these bugs are fixed, I'll remove this pop-up:
            First, make sure you only upload images!
            Second, make sure you DO upload images. Your article won't be submitted if you don't, but there may be unintended consequences (which I don't know about.)
            Finally, the banner image is for displaying the article at the top of the homepage. The card image is for displaying next to the article, it's used further down the homepage and in the article page.`);
        setSelectedPage(<UploadArticle />);
        break;
      default:
        setSelectedPage(<div>page not found</div>);
    }
  }, [id]);

  const selectionPage = (
    <>
      <div className="uploadWrapper">
        <div className="upload-buttons">
          <Button path="article">Upload a new article</Button>
          <Button>Upload new a report</Button>
          <Button>Add new press report</Button>
          <Button>Add a new media appearance</Button>
          <Button>Add new job</Button>
          <Button>Add a new team member</Button>
        </div>
        <div className="view-buttons">
          <Button>View mailing list</Button>
          <Button>View sponsor details</Button>
        </div>
      </div>
    </>
  );
  return <>{id ? selectedPage : selectionPage}</>;
}

export default Upload;
